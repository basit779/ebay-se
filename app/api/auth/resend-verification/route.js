import { NextResponse } from "next/server";
import crypto from "crypto";
import { findUserByEmail, updateUser } from "@/lib/db";
import { isValidEmail, normalizeEmail } from "@/lib/validation";
import { sendVerificationEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

export async function POST(request) {
  try {
    const { email: rawEmail } = await request.json();
    const email = normalizeEmail(rawEmail);

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const rl = rateLimit(`resend:${email}`, 1, 60 * 1000);
    if (!rl.ok) {
      return NextResponse.json(
        {
          error: "Please wait before requesting another email.",
          retryAfterMs: rl.retryAfterMs
        },
        { status: 429 }
      );
    }

    const user = findUserByEmail(email);
    // Always return 200 to avoid email enumeration.
    if (!user || user.isVerified) {
      return NextResponse.json({ ok: true });
    }

    const verificationToken = crypto.randomUUID();
    const verificationTokenExpiry = new Date(Date.now() + TOKEN_TTL_MS).toISOString();
    updateUser(user.id, { verificationToken, verificationTokenExpiry });

    await sendVerificationEmail(email, verificationToken, user.name);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[resend-verification] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
