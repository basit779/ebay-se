import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { createOrder, getOrdersByUser, clearCart } from "@/lib/db";

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const orders = getOrdersByUser(user.id);
  return NextResponse.json({ orders });
}

export async function POST(request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { items, total, shipping } = await request.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const order = createOrder({
    userId: user.id,
    items,
    total,
    shipping: shipping || { name: user.name, address: "Not provided" }
  });

  clearCart(user.id);

  return NextResponse.json({ order });
}
