import { notFound } from "next/navigation";
import products from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default function ProductPage({ params }) {
  const product = products.find((item) => item.id === params.id);
  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
