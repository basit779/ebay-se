"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ products, columns = 4, asymmetric = false }) {
  const gridClass =
    columns === 3
      ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  // Editorial asymmetric layout: first card spans 2 cols, rest fill in.
  // Requires exactly 4 products for a clean feature row.
  if (asymmetric && products.length >= 4) {
    const [hero, ...rest] = products;
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
        }}
        className="grid gap-6 lg:grid-cols-3 lg:grid-rows-2"
      >
        <div className="lg:col-span-2 lg:row-span-2">
          <ProductCard product={hero} index={0} variant="hero" />
        </div>
        {rest.slice(0, 3).map((product, i) => (
          <ProductCard key={product.id} product={product} index={i + 1} />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
      }}
      className={gridClass}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </motion.div>
  );
}
