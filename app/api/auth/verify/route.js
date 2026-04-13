import { NextResponse } from "next/server";
import { findUserByVerificationToken, updateUser } from "@/lib/db";
import { signToken, setAuthCookie } from "@/lib/auth";
import { normalizeEmail } from "@/lib/validation";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const token = searchParams.get("token");
  const email = normalizeEmail(searchParams.get("email"));

  if (!token || !email) {
    return NextResponse.redirect(`${origin}/verify?status=invalid`);
  }

  const user = findUserByVerificationToken(token);
  if (!user || user.email !== email) {
    return NextResponse.redirect(`${origin}/verify?status=invalid`);
  }

  if (user.isVerified) {
    return NextResponse.redirect(`${origin}/account?verified=already`);
  }

  const expiry = user.verificationTokenExpiry
    ? new Date(user.verificationTokenExpiry).getTime()
    : 0;
  if (!expiry || expiry < Date.now()) {
    return NextResponse.redirect(
      `${origin}/verify?status=expired&email=${encodeURIComponent(email)}`
    );
  }

  updateUser(user.id, {
    isVerified: true,
    verificationToken: null,
    verificationTokenExpiry: null
  });

  const jwt = await signToken({ id: user.id, email: user.email, name: user.name });
  await setAuthCookie(jwt);

  return NextResponse.redirect(`${origin}/account?verified=1`);
}
