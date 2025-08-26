// src/controllers/auth.controller.ts
import type { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/utils/jwt.js";


const prisma = new PrismaClient();
const REFRESH_COOKIE = "refreshToken";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

interface AuthRequest extends Request {
  user?: { id: string };
}

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, role: true }
    });

    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    res.json({ success: true, user: user });
  } catch (err) {
    next(err);
  }
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email: email, password: hashed, name: name, role: "USER" },
    });

    res.status(201).json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: "USER" } });
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ success: false, error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, error: "Invalid credentials" });

    // create refresh token record
    const tokenId = crypto.randomUUID();
    const refreshToken = signRefreshToken(user.id, tokenId);
    await prisma.refreshToken.create({
      data: {
        token: tokenId,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // create access token
    const accessToken = signAccessToken(user.id);

    // set cookie
    res.cookie(REFRESH_COOKIE, refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ success: true, accessToken, user: { id: user.id, email: user.email, name: user.name, role: "USER" } });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[REFRESH_COOKIE];
    if (!token) return res.status(401).json({ success: false, error: "No refresh token" });

    const decoded = verifyRefreshToken(token);
    const stored = await prisma.refreshToken.findUnique({ where: { token: decoded.jti } });
    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
      return res.status(401).json({ success: false, error: "Invalid refresh token" });
    }

    // issue new access token
    const accessToken = signAccessToken(decoded.sub);

    res.json({ success: true, accessToken });
  } catch (err) {
    next(err);
  }
};

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[REFRESH_COOKIE];
    if (token) {
      try {
        const decoded = verifyRefreshToken(token);
        await prisma.refreshToken.updateMany({
          where: { token: decoded.jti, userId: decoded.sub, revoked: false },
          data: { revoked: true },
        });
      } catch {
        // ignore invalid token
      }
    }

    res.clearCookie(REFRESH_COOKIE, { path: "/" });
    res.json({ success: true, message: "successfully logout" });
  } catch (err) {
    next(err);
  }
};
