import { NextResponse } from "next/server";
import staticProducts from "@/data/products";
import { getActiveSellerProducts } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sellerOnly = searchParams.get("source") === "seller";

  const sellerProducts = getActiveSellerProducts();
  let result = sellerOnly
    ? [...sellerProducts]
    : [...sellerProducts, ...staticProducts];

  if (category && category !== "All") {
    result = result.filter((p) => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
    );
  }

  return NextResponse.json(result);
}
