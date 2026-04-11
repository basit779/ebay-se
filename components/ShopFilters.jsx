"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function ShopFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
      {/* Search */}
      <div className="relative md:max-w-sm md:flex-1">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="input-glow w-full rounded-xl bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder-white/25"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
              selectedCategory === cat
                ? "bg-neon-cyan/15 text-neon-cyan ring-1 ring-neon-cyan/30"
                : "border border-white/[0.06] bg-white/[0.02] text-white/40 hover:border-white/15 hover:text-white/70"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
