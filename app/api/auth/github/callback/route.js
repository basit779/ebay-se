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
  const expectedState = cookieStore.get("gh_oauth_state")?.value;
  const next = cookieStore.get("gh_oauth_next")?.value || "/account";
  cookieStore.delete("gh_oauth_state");
  cookieStore.delete("gh_oauth_next");

  if (!code || !state || state !== expectedState) {
    return NextResponse.redirect(`${origin}/?auth=oauth_failed`);
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${origin}/?auth=oauth_unconfigured`);
  }

  try {
    // 1. Exchange code for access token
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${origin}/api/auth/github/callback`
      })
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) {
      return NextResponse.redirect(`${origin}/?auth=oauth_failed`);
    }

    // 2. Fetch user profile + emails in parallel
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "FluxBid"
    };
    const [profileRes, emailsRes] = await Promise.all([
      fetch("https://api.github.com/user", { headers }),
      fetch("https://api.github.com/user/emails", { headers })
    ]);
    const profile = await profileRes.json();
    const emails = await emailsRes.json().catch(() => []);

    const primary = Array.isArray(emails)
      ? emails.find((e) => e.primary && e.verified) || emails.find((e) => e.verified)
      : null;
    const email = normalizeEmail(primary?.email || profile.email || "");
    if (!email) {
      return NextResponse.redirect(`${origin}/?auth=oauth_no_email`);
    }

    const user = findOrCreateOAuthUser({
      provider: "github",
      providerId: String(profile.id),
      email,
      name: profile.name || profile.login || email.split("@")[0]
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
    console.error("[github oauth] error", err);
    return NextResponse.redirect(`${origin}/?auth=oauth_failed`);
  }
}
