import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findOrCreateOAuthUser } from "@/lib/db";
import { signToken, setAuthCookie } from "@/lib/auth";
import { normalizeEmail } from "@/lib/validation";

export async function GET(request) {
  const { origin, searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const cookieStore = await cookies();
  const expectedState = cookieStore.get("g_oauth_state")?.value;
  const next = cookieStore.get("g_oauth_next")?.value || "/account";
  cookieStore.delete("g_oauth_state");
  cookieStore.delete("g_oauth_next");

  if (!code || !state || state !== expectedState) {
    return NextResponse.redirect(`${origin}/?auth=oauth_failed`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${origin}/?auth=oauth_unconfigured`);
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${origin}/api/auth/google/callback`
      })
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) {
      return NextResponse.redirect(`${origin}/?auth=oauth_failed`);
    }

    const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const profile = await profileRes.json();
    const email = normalizeEmail(profile.email || "");
    if (!email || profile.email_verified === false) {
      return NextResponse.redirect(`${origin}/?auth=oauth_no_email`);
    }

    const user = findOrCreateOAuthUser({
      provider: "google",
      providerId: String(profile.sub),
      email,
      name: profile.name || profile.given_name || email.split("@")[0]
    });

    const jwt = await signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      accountType: user.accountType || "buyer"
    });
    await setAuthCookie(jwt);

    return NextResponse.redirect(`${origin}${next}`);
  } catch (err) {
    console.error("[google oauth] error", err);
    return NextResponse.redirect(`${origin}/?auth=oauth_failed`);
  }
}
