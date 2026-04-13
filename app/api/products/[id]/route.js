import { NextResponse } from "next/server";
import staticProducts from "@/data/products";
import { getSellerProductById } from "@/lib/db";

export async function GET(_request, { params }) {
  const seller = getSellerProductById(params.id);
  if (seller) return NextResponse.json(seller);
  const product = staticProducts.find((p) => p.id === params.id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}
