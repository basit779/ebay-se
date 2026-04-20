"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import ShopFilters from "@/components/ShopFilters";
import ProductGrid from "@/components/ProductGrid";
import products, { categories } from "@/data/products";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialCategory = searchParams.get("category");
  const initialSort = searchParams.get("sort") || "default";
  const initialSearch = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "All"
  );
  const [search, setSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState(initialSort);

  // keep URL in sync with state
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== "All") params.set("category", selectedCategory);
    if (sortBy && sortBy !== "default") params.set("sort", sortBy);
    if (search) params.set("q", search);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [selectedCategory, sortBy, search, pathname, router]);

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

    const getPrice = (p) => p.price ?? p.currentBid ?? 0;
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => getPrice(a) - getPrice(b));
        break;
      case "price-desc":
        result.sort((a, b) => getPrice(b) - getPrice(a));
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
    <section className="relative min-h-screen overflow-hidden px-6 py-24 md:px-8 md:py-32">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/80">
            The Marketplace
          </p>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-serif text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
                Browse every <span className="italic text-champagne-300">object.</span>
              </h1>
              <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.25em] text-white/40">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                {selectedCategory !== "All" ? ` · ${selectedCategory}` : ""}
              </p>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <SlidersHorizontal size={13} className="text-white/35" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="luxe-input !py-2.5 text-xs"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price · Low → High</option>
                <option value="price-desc">Price · High → Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name · A→Z</option>
              </select>
            </div>
          </div>
        </motion.div>

        <div className="champagne-rule my-12" />

        <div>
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
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.02] py-24 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
                <SlidersHorizontal size={22} className="text-white/20" />
              </div>
              <p className="mt-8 font-serif text-2xl font-semibold text-white/70">Nothing matches</p>
              <p className="mt-3 text-[13px] text-white/35">Try a broader search or different category.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
