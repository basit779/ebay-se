import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "@/lib/db";
import { isValidEmail, normalizeEmail } from "@/lib/validation";
import { sendVerificationEmail } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24h

export async function POST(request) {
  try {
    const ip = clientIp(request);
    const rl = rateLimit(`register:${ip}`, 5, 60 * 60 * 1000);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many signups from this IP. Try again later." },
        { status: 429 }
      );
    }

    const { name, email: rawEmail, password } = await request.json();
    const email = normalizeEmail(rawEmail);

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const existing = findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomUUID();
    const verificationTokenExpiry = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

    const user = createUser({
      name,
      email,
      passwordHash,
      isVerified: false,
      verificationToken,
      verificationTokenExpiry
    });

    const result = await sendVerificationEmail(email, verificationToken, name);

    // Don't auto-login. Force the user to click the verification link.
    return NextResponse.json(
      {
        requiresVerification: true,
        email,
        emailSent: !result?.skipped && !result?.error,
        message:
          "Check your inbox for a verification link. It expires in 24 hours."
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[register] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
