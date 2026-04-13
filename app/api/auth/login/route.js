import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/lib/db";
import { signToken, setAuthCookie } from "@/lib/auth";
import { isValidEmail, normalizeEmail } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(request) {
  try {
    const ip = clientIp(request);
    const rl = rateLimit(`login:${ip}`, 10, 60 * 1000);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many login attempts. Please slow down." },
        { status: 429 }
      );
    }

    const { email: rawEmail, password } = await request.json();
    const email = normalizeEmail(rawEmail);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const user = findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        {
          error: "Please verify your email before signing in.",
          requiresVerification: true,
          email: user.email
        },
        { status: 403 }
      );
    }

    const token = await signToken({ id: user.id, email: user.email, name: user.name });
    await setAuthCookie(token);

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("[login] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
