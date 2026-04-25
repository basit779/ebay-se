"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

/**
 * Filter pattern: category Chips (compact, multi-option, low weight)
 * and a Search input. Linear primary actions use .btn-luxe elsewhere —
 * there are no buttons here because filtering updates state live.
 */
export default function ShopFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch
}) {
  const hasActiveSearch = search.length > 0;

  return (
    <div className="mb-12 space-y-6">
      {/* Search bar */}
      <div className="relative mx-auto max-w-xl">
        <Search size={15} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          aria-label="Search marketplace"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search the marketplace…"
          className="luxe-input w-full !pl-12 !pr-12"
        />
        {hasActiveSearch && (
          <button
            type="button"
            onClick={() => setSearch("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white/45 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/[0.06] hover:text-champagne-200"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Category chip row */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <Chip
            key={cat}
            active={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative rounded-full px-4 py-2 text-[12px] font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        active
          ? "border border-champagne-400/45 bg-champagne-400/10 text-champagne-100 shadow-[0_8px_24px_-12px_rgba(212,175,55,0.45)]"
          : "border border-white/10 bg-white/[0.02] text-white/65 hover:border-white/20 hover:bg-white/[0.04] hover:text-white/85"
      }`}
    >
      {children}
      {active && (
        <motion.span
          layoutId="chip-active"
          className="absolute inset-0 -z-10 rounded-full ring-1 ring-champagne-400/30"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </motion.button>
  );
}
