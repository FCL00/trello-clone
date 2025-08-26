import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

const accessSecret = process.env.JWT_ACCESS_SECRET as string;
const refreshSecret = process.env.JWT_REFRESH_SECRET as string;

export function signAccessToken(userId: string) {
  return jwt.sign(
    { sub: userId },
    accessSecret,
    { expiresIn: process.env.ACCESS_TOKEN_TTL || "15m" } as SignOptions
  );
}

export function signRefreshToken(userId: string, tokenId: string) {
  return jwt.sign(
    { sub: userId, jti: tokenId },
    refreshSecret,
    { expiresIn: process.env.REFRESH_TOKEN_TTL || "7d" } as SignOptions
  );
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, accessSecret) as { sub: string };
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, refreshSecret) as { sub: string; jti: string };
}
