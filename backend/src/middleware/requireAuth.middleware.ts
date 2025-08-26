// src/middleware/requireAuth.ts
import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/utils/jwt.js";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  try {
    const token = auth.split(" ")[1] as string;
    const decoded = verifyAccessToken(token);
    req.user = { id: decoded.sub };
    next();
  } catch {
    return res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};

export default requireAuth
