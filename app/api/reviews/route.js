import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getReviewsByProduct, createReview } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "productId required" }, { status: 400 });
  }

  const reviews = getReviewsByProduct(productId);
  return NextResponse.json({ reviews });
}

export async function POST(request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { productId, rating, comment } = await request.json();

  if (!productId || !rating) {
    return NextResponse.json({ error: "productId and rating required" }, { status: 400 });
  }

  const review = createReview({
    productId,
    userId: user.id,
    userName: user.name,
    rating: Math.min(5, Math.max(1, Number(rating))),
    comment: comment || ""
  });

  return NextResponse.json({ review });
}
