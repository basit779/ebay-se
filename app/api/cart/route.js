import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getCart, saveCart, clearCart } from "@/lib/db";

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ items: [] });
  const items = getCart(user.id);
  return NextResponse.json({ items });
}

export async function POST(request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { items } = await request.json();
  saveCart(user.id, items);
  return NextResponse.json({ items });
}

export async function DELETE() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  clearCart(user.id);
  return NextResponse.json({ items: [] });
}
