"use client";

import { motion } from "framer-motion";
import { Gavel } from "lucide-react";

const bidders = [
  "alex_b", "vintage_lex", "watch_collector_88", "midas_24", "art_baron",
  "rare_finds", "lux_hunter", "bid_pro", "gold_eye", "first_dibs"
];

function pickBidder(i) {
  return bidders[i % bidders.length];
}

export default function LiveBidTicker({ auctions = [] }) {
  if (!auctions.length) return null;

  // Build entries: alternating shapes — bid placed, hot lot, time alert
  const entries = auctions.flatMap((a, i) => [
    {
      type: "bid",
      user: pickBidder(i),
      amount: a.currentBid,
      name: a.name,
      bids: a.bidCount
    },
    {
      type: "hot",
      name: a.name,
      bids: a.bidCount
    }
  ]);
  const doubled = [...entries, ...entries];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.04] py-4 backdrop-blur-md supports-[backdrop-filter]:bg-white/[0.04]">
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-night to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-night to-transparent" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-10 whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {doubled.map((e, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              {e.type === "bid" ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-red-500 opacity-80" />
                    <span className="relative h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-400">
                    Live
                  </span>
                  <span className="text-white/50">·</span>
                  <span className="font-mono text-[13px] font-medium text-white/70">@{e.user}</span>
                  <span className="text-white/40">bid</span>
                  <span className="font-mono bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text font-bold tracking-tight text-transparent">
                    ${e.amount.toLocaleString()}
                  </span>
                  <span className="text-white/40">on</span>
                  <span className="font-medium text-white">{e.name}</span>
                  <span className="font-mono text-white/30">· {e.bids} bids</span>
                </>
              ) : (
                <>
                  <Gavel size={13} className="text-amber-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300">
                    Hot Lot
                  </span>
                  <span className="text-white/50">·</span>
                  <span className="font-medium text-white">{e.name}</span>
                  <span className="text-white/30">— <span className="font-mono">{e.bids}</span> bidders watching</span>
                </>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
