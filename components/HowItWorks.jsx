"use client";

import { motion } from "framer-motion";
import { Search, Gavel, Package } from "lucide-react";
import { RevealText, FadeUp } from "@/components/TextReveal";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Browse & Discover",
    desc: "Explore thousands of premium products and rare collectibles from verified sellers worldwide. Filter by category, bid status, and price."
  },
  {
    number: "02",
    icon: Gavel,
    title: "Buy or Bid",
    desc: "Snap up instant-buy items or join live auctions with real-time bidding. Our escrow system protects every transaction."
  },
  {
    number: "03",
    icon: Package,
    title: "Fast, Insured Delivery",
    desc: "Free shipping on orders over $50, full buyer protection, and 30-day returns. Your package is tracked end-to-end."
  }
];

export default function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 md:py-32 md:px-8">
      {/* Header */}
      <div className="mb-16 max-w-3xl">
        <FadeUp>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/80">
            How it works
          </p>
        </FadeUp>
        <RevealText delay={0.1}>
          <h2 className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
            Three steps,
            <br />
            <span className="italic text-champagne-300">zero friction.</span>
          </h2>
        </RevealText>
        <FadeUp delay={0.2}>
          <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-white/45">
            From browsing to delivery, every part of the experience is built
            for speed and trust. No hidden fees, no gotchas.
          </p>
        </FadeUp>
      </div>

      {/* Steps */}
      <div className="grid gap-8 md:grid-cols-3 md:gap-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/40 p-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-champagne-400/25 hover:shadow-[0_20px_60px_-20px_rgba(212,175,55,0.2)]"
            >
              {/* Big serif number watermark */}
              <div
                className="font-serif pointer-events-none absolute -right-2 -top-4 text-[180px] font-semibold leading-none text-white/[0.025] transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-champagne-400/[0.06]"
                aria-hidden
              >
                {step.number}
              </div>

              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-champagne-400/30 bg-champagne-400/[0.06] text-champagne-300">
                  <Icon size={20} />
                </div>

                <p className="mt-7 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
                  Step {step.number}
                </p>
                <h3 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.8] text-white/50">
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
