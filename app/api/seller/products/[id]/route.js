import { NextResponse } from "next/server";
import { requireSeller } from "@/lib/seller-guard";
import {
  getSellerProductById,
  updateSellerProduct,
  deleteSellerProduct
} from "@/lib/db";

export async function GET(_req, { params }) {
  const { user, error } = await requireSeller();
  if (error) return error;
  const product = getSellerProductById(params.id);
  if (!product || product.sellerId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PATCH(request, { params }) {
  const { user, error } = await requireSeller();
  if (error) return error;
  let patch;
  try { patch = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const updated = updateSellerProduct(params.id, user.id, patch);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ product: updated });
}

export async function DELETE(_req, { params }) {
  const { user, error } = await requireSeller();
  if (error) return error;
  const ok = deleteSellerProduct(params.id, user.id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
