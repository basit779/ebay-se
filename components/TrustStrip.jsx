"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    label: "Verified Sellers",
    desc: "Every seller authenticated"
  },
  {
    icon: Truck,
    label: "Insured Shipping",
    desc: "Covered up to $10,000"
  },
  {
    icon: RotateCcw,
    label: "Free Returns",
    desc: "30-day no-questions-asked"
  },
  {
    icon: Headphones,
    label: "24/7 Concierge",
    desc: "Real humans, instant chat"
  }
];

export default function TrustStrip() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-8">
      {/* Soft ambient champagne glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse, rgba(212,175,55,0.16), transparent 70%)",
          filter: "blur(60px)"
        }}
      />

      <div className="relative grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="liquid-glass conic-border group relative flex items-center gap-4 rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1"
              style={{
                animation: `float-card ${7 + i * 0.6}s ease-in-out infinite ${i * 0.4}s`,
                willChange: "transform"
              }}
            >
              {/* Icon tile */}
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-champagne-400/30 bg-gradient-to-br from-champagne-400/15 to-champagne-600/5">
                <div className="absolute inset-0 rounded-xl bg-champagne-400/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                <Icon size={20} className="relative text-champagne-300" />
              </div>

              <div className="min-w-0">
                <p className="font-serif text-[15px] font-semibold tracking-tight text-white md:text-base">
                  {item.label}
                </p>
                <p className="mt-1 truncate text-[11px] text-white/45 md:text-xs">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
