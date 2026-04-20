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

  // Related products: same category, excluding self. Fall back to random.
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.category === product.category && !p.auction
  );
  const pool = sameCategory.length >= 4
    ? sameCategory
    : products.filter((p) => p.id !== product.id && !p.auction);
  const related = pool.slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}
