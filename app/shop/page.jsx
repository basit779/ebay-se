"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import ShopFilters from "@/components/ShopFilters";
import ProductGrid from "@/components/ProductGrid";
import products, { categories } from "@/data/products";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "All"
  );
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    let result =
      selectedCategory === "All"
        ? [...products]
        : products.filter((p) => p.category === selectedCategory);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [selectedCategory, search, sortBy]);

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-12 md:px-8">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon-cyan">
            Browse
          </p>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-bold md:text-5xl">Shop</h1>
              <p className="mt-2 text-sm text-white/40">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}{" "}
                {selectedCategory !== "All" ? `in ${selectedCategory}` : "available"}
              </p>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-white/30" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs text-white/60 outline-none"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </motion.div>

        <div className="mt-8">
          <ShopFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            search={search}
            setSearch={setSearch}
          />

          {filtered.length ? (
            <ProductGrid products={filtered} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] py-20 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <SlidersHorizontal size={24} className="text-white/15" />
              </div>
              <p className="mt-4 text-sm font-medium text-white/50">No products found</p>
              <p className="mt-1 text-xs text-white/25">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
