import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { findUserById } from "@/lib/db";

export async function requireSeller() {
  const session = await getAuthUser();
  if (!session) {
    return { error: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };
  }
  const user = findUserById(session.id);
  if (!user) {
    return { error: NextResponse.json({ error: "Account not found" }, { status: 401 }) };
  }
  if (user.accountType !== "seller") {
    return { error: NextResponse.json({ error: "Seller account required" }, { status: 403 }) };
  }
  return { user };
}

export async function requireAuth() {
  const session = await getAuthUser();
  if (!session) {
    return { error: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };
  }
  const user = findUserById(session.id);
  if (!user) {
    return { error: NextResponse.json({ error: "Account not found" }, { status: 401 }) };
  }
  return { user };
}
