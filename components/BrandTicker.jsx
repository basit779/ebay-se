"use client";

import { motion } from "framer-motion";

// Mock "as featured in" brand names
const brands = [
  "TECHCRUNCH",
  "THE VERGE",
  "WIRED",
  "FORBES",
  "VOGUE",
  "GQ",
  "FAST COMPANY",
  "BLOOMBERG"
];

export default function BrandTicker() {
  const doubled = [...brands, ...brands];

  return (
    <section className="relative overflow-hidden border-y border-white/[0.04] bg-white/[0.01] py-10">
      <div className="mx-auto mb-6 max-w-7xl px-6">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.3em] text-white/30">
          As featured in
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-night to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-night to-transparent" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-16 whitespace-nowrap"
        >
          {doubled.map((brand, i) => (
            <span
              key={i}
              className="text-2xl font-black tracking-[0.15em] text-white/20 transition-colors hover:text-white/60 md:text-3xl"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
