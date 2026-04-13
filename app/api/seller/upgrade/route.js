import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/seller-guard";
import { upgradeToSeller } from "@/lib/db";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(request) {
  const { user, error } = await requireAuth();
  if (error) return error;

  if (user.accountType === "seller") {
    return NextResponse.json({ user, alreadySeller: true });
  }

  let body = {};
  try { body = await request.json(); } catch {}
  const storeName = (body.storeName || "").trim() || user.name;
  const storeBio = (body.storeBio || "").trim() || null;

  const updated = upgradeToSeller(user.id, { storeName, storeBio });
  // Refresh JWT so accountType claim reflects new role.
  const jwt = await signToken({
    id: updated.id,
    email: updated.email,
    name: updated.name,
    accountType: "seller"
  });
  await setAuthCookie(jwt);

  return NextResponse.json({
    user: {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      accountType: "seller",
      storeName: updated.storeName,
      storeBio: updated.storeBio
    }
  });
}
