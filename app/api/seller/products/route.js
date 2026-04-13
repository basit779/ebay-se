import { NextResponse } from "next/server";
import { requireSeller } from "@/lib/seller-guard";
import { createSellerProduct, getSellerProducts } from "@/lib/db";

export async function GET() {
  const { user, error } = await requireSeller();
  if (error) return error;
  const products = getSellerProducts(user.id);
  return NextResponse.json({ products });
}

export async function POST(request) {
  const { user, error } = await requireSeller();
  if (error) return error;
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { name, price, image, description, category } = body || {};
  if (!name || !String(name).trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  const priceNum = Number(price);
  if (!Number.isFinite(priceNum) || priceNum < 0) {
    return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
  }
  if (!image || !/^https:\/\//.test(String(image))) {
    return NextResponse.json({ error: "Image URL must start with https://" }, { status: 400 });
  }
  if (!description || !String(description).trim()) {
    return NextResponse.json({ error: "Description is required" }, { status: 400 });
  }
  if (!category) {
    return NextResponse.json({ error: "Category is required" }, { status: 400 });
  }

  if (body.auction) {
    const sb = Number(body.startingBid);
    if (!Number.isFinite(sb) || sb < 0) {
      return NextResponse.json({ error: "Auction needs a starting bid" }, { status: 400 });
    }
    if (!body.endTime) {
      return NextResponse.json({ error: "Auction needs an end date" }, { status: 400 });
    }
  }

  const product = createSellerProduct({
    sellerId: user.id,
    sellerName: user.storeName || user.name,
    data: body
  });
  return NextResponse.json({ product }, { status: 201 });
}
