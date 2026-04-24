"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";

/**
 * layout options:
 *   - "default"       : uniform 3-4 col grid (cols controlled by `columns`)
 *   - "asymmetric"    : 1 hero (2col x 2row) + 3 standard   → 4 items
 *   - "bento-3"       : 1 hero (2col x 2row) + 2 stacked    → 3 items
 *   - "bento-4"       : 1 tall hero + 2 compact + 1 wide    → 4 items
 *
 * Bento layouts fall back to uniform if fewer items are passed.
 */
export default function ProductGrid({
  products,
  columns = 4,
  layout = "default",
  asymmetric = false
}) {
  // Back-compat: `asymmetric` prop maps to layout="asymmetric"
  const resolvedLayout = asymmetric ? "asymmetric" : layout;

  const gridClass =
    columns === 3
      ? "grid gap-[2px] sm:grid-cols-2 lg:grid-cols-3"
      : "grid gap-[2px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  // ── bento-3 : 1 hero + 2 stacked ────────────────────────────
  if (resolvedLayout === "bento-3" && products.length >= 3) {
    const [hero, second, third] = products;
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={staggerContainer}
        className="grid gap-[2px] lg:grid-cols-3 lg:grid-rows-2"
      >
        <div className="lg:col-span-2 lg:row-span-2">
          <ProductCard product={hero} index={0} variant="hero" />
        </div>
        <div className="lg:col-span-1 lg:row-span-1">
          <ProductCard product={second} index={1} />
        </div>
        <div className="lg:col-span-1 lg:row-span-1">
          <ProductCard product={third} index={2} />
        </div>
      </motion.div>
    );
  }

  // ── bento-4 : 1 tall hero + 2 compact + 1 wide ──────────────
  if (resolvedLayout === "bento-4" && products.length >= 4) {
    const [hero, second, third, fourth] = products;
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={staggerContainer}
        className="grid gap-[2px] lg:grid-cols-3 lg:grid-rows-2"
      >
        {/* A: tall hero, left column spanning both rows */}
        <div className="lg:col-span-1 lg:row-span-2">
          <ProductCard product={hero} index={0} variant="hero" />
        </div>
        {/* B + C: top-right pair */}
        <div className="lg:col-span-1">
          <ProductCard product={second} index={1} />
        </div>
        <div className="lg:col-span-1">
          <ProductCard product={third} index={2} />
        </div>
        {/* D: wide bottom-right spanning 2 cols */}
        <div className="lg:col-span-2">
          <ProductCard product={fourth} index={3} />
        </div>
      </motion.div>
    );
  }

  // ── asymmetric : 1 hero + 3 standard ────────────────────────
  if (resolvedLayout === "asymmetric" && products.length >= 4) {
    const [hero, ...rest] = products;
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={staggerContainer}
        className="grid gap-[2px] lg:grid-cols-3 lg:grid-rows-2"
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

  // ── default uniform grid ─────────────────────────────────────
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
