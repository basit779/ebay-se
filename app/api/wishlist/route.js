import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getWishlist, addToWishlist, removeFromWishlist } from "@/lib/db";

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ items: [] });
  const items = getWishlist(user.id);
  return NextResponse.json({ items });
}

export async function POST(request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { productId } = await request.json();
  const items = addToWishlist(user.id, productId);
  return NextResponse.json({ items });
}

export async function DELETE(request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { productId } = await request.json();
  const items = removeFromWishlist(user.id, productId);
  return NextResponse.json({ items });
}
