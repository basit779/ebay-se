"use client";

import { motion } from "framer-motion";
import { Search, MousePointerClick, Package } from "lucide-react";
import { RevealText, FadeUp } from "@/components/TextReveal";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Browse & Discover",
    desc: "Explore thousands of premium products and rare collectibles from verified sellers worldwide. Filter by category, bid status, and price.",
    color: "from-cyan-500/20 to-blue-500/5",
    accent: "text-cyan-400"
  },
  {
    number: "02",
    icon: MousePointerClick,
    title: "Buy or Bid",
    desc: "Snap up instant-buy items or join live auctions with real-time bidding. Our escrow system protects every transaction.",
    color: "from-purple-500/20 to-fuchsia-500/5",
    accent: "text-purple-400"
  },
  {
    number: "03",
    icon: Package,
    title: "Fast, Insured Delivery",
    desc: "Free shipping on orders over $50, full buyer protection, and 30-day returns. Your package is tracked end-to-end.",
    color: "from-emerald-500/20 to-green-500/5",
    accent: "text-emerald-400"
  }
];

export default function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-20 md:px-8">
      {/* Header */}
      <div className="mb-16 max-w-3xl">
        <FadeUp>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            How it works
          </p>
        </FadeUp>
        <RevealText delay={0.1}>
          <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tighter md:text-6xl lg:text-7xl">
            Three steps,
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              zero friction.
            </span>
          </h2>
        </RevealText>
        <FadeUp delay={0.2}>
          <p className="mt-6 max-w-xl text-base text-white/40">
            From browsing to delivery, every part of the experience is built
            for speed and trust. No hidden fees, no gotchas.
          </p>
        </FadeUp>
      </div>

      {/* Steps */}
      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br ${step.color} p-8 transition-all hover:border-white/[0.15]`}
            >
              {/* Big number watermark */}
              <div
                className="pointer-events-none absolute -right-4 -top-4 text-[180px] font-black leading-none text-white/[0.03]"
                aria-hidden
              >
                {step.number}
              </div>

              {/* Content */}
              <div className="relative">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] ${step.accent}`}>
                  <Icon size={22} />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                  Step {step.number}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
