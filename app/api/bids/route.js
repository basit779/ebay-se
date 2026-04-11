import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getBids, placeBid } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  if (!productId) {
    return NextResponse.json({ error: "productId required" }, { status: 400 });
  }
  const bids = getBids(productId);
  return NextResponse.json({ bids });
}

export async function POST(request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in to place a bid" }, { status: 401 });
  }

  const { productId, amount } = await request.json();
  if (!productId || !amount) {
    return NextResponse.json({ error: "productId and amount required" }, { status: 400 });
  }

  const result = placeBid({
    productId,
    userId: user.id,
    userName: user.name,
    amount: Number(amount)
  });

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ bid: result.bid, currentBid: result.currentBid });
}
