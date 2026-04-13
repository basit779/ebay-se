import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const RAW_SECRET = process.env.JWT_SECRET;
if (!RAW_SECRET && process.env.NODE_ENV === "production") {
  // Log only — don't crash the build. Vercel injects env vars at runtime.
  console.warn("[auth] JWT_SECRET is not set — using insecure fallback. Set it in Vercel env vars.");
}
const SECRET = new TextEncoder().encode(
  RAW_SECRET || "fluxbid-dev-secret-do-not-use-in-production"
);

const COOKIE_NAME = "fluxbid-token";

export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function setAuthCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/"
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
