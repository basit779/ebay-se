import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { findUserById } from "@/lib/db";

export async function GET() {
  const session = await getAuthUser();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  const fresh = findUserById(session.id);
  if (!fresh) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({
    user: {
      id: fresh.id,
      name: fresh.name,
      email: fresh.email,
      accountType: fresh.accountType || "buyer",
      storeName: fresh.storeName || null,
      storeBio: fresh.storeBio || null
    }
  });
}
