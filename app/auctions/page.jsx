"use client";

import { motion } from "framer-motion";
import { Gavel, Clock, Flame } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import AnimatedBackground from "@/components/AnimatedBackground";
import products from "@/data/products";

export default function AuctionsPage() {
  const auctions = products.filter((p) => p.auction);
  const endingSoon = [...auctions].sort(
    (a, b) => new Date(a.endTime) - new Date(b.endTime)
  );

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-12 md:px-8">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e53238]/15">
              <Gavel size={20} className="text-[#e53238]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold md:text-5xl">Live Auctions</h1>
              <p className="mt-1 text-sm text-white/40">
                {auctions.length} active auction{auctions.length !== 1 ? "s" : ""} — bid now before time runs out
              </p>
            </div>
          </div>
        </motion.div>

        {/* Ending Soon banner */}
        {endingSoon.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex items-center gap-3 rounded-2xl border border-[#f5af02]/20 bg-[#f5af02]/5 px-5 py-3"
          >
            <Flame size={18} className="text-[#f5af02]" />
            <p className="text-sm text-[#f5af02]">
              <span className="font-semibold">{endingSoon[0].name}</span> auction ends soon — don&apos;t miss out!
            </p>
            <Clock size={14} className="ml-auto text-[#f5af02]/60" />
          </motion.div>
        )}

        <div className="mt-10">
          {auctions.length > 0 ? (
            <ProductGrid products={auctions} columns={3} />
          ) : (
            <div className="flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] py-20 text-center">
              <Gavel size={32} className="text-white/10" />
              <p className="mt-4 text-sm text-white/50">No active auctions right now</p>
              <p className="mt-1 text-xs text-white/25">Check back soon for new listings</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
