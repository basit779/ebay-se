"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ products, columns = 4 }) {
  const gridClass =
    columns === 3
      ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } }
      }}
      className={gridClass}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </motion.div>
  );
}
