import { notFound } from "next/navigation";
import products from "@/data/products";
import { getSellerProductById } from "@/lib/db";
import ProductDetailClient from "@/components/ProductDetailClient";

export const dynamicParams = true;

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default function ProductPage({ params }) {
  const seller = getSellerProductById(params.id);
  const product = seller || products.find((item) => item.id === params.id);
  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
