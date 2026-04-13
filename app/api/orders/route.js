import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { createOrder, getOrdersByUser, clearCart, findUserById } from "@/lib/db";
import { validateCardPayload } from "@/lib/validation";
import { sendOrderConfirmationEmail } from "@/lib/email";

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

  const { items, total, shipping, payment } = await request.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  if (typeof total !== "number" || total <= 0) {
    return NextResponse.json({ error: "Invalid total" }, { status: 400 });
  }

  if (!shipping || !shipping.name || !shipping.address) {
    return NextResponse.json(
      { error: "Shipping name and address are required" },
      { status: 400 }
    );
  }

  if (!payment || typeof payment !== "object") {
    return NextResponse.json({ error: "Payment details required" }, { status: 400 });
  }

  // Validate the card server-side — client validation is bypassable.
  const check = validateCardPayload({
    cardNumber: payment.cardNumber,
    expiry: payment.expiry,
    cvc: payment.cvc
  });
  if (!check.valid) {
    return NextResponse.json(
      { error: "Invalid card details", fieldErrors: check.errors },
      { status: 400 }
    );
  }

  // NEVER persist raw card numbers. Only last-4 + detected brand.
  const order = createOrder({
    userId: user.id,
    items,
    total,
    shipping,
    payment: { brand: check.brand, last4: check.last4 }
  });

  clearCart(user.id);

  // Fire confirmation email (non-blocking — don't fail the order if mail breaks).
  const dbUser = findUserById(user.id);
  if (dbUser?.email) {
    sendOrderConfirmationEmail(dbUser.email, order).catch((err) =>
      console.error("[order-email] failed:", err)
    );
  }

  return NextResponse.json({ order });
}
