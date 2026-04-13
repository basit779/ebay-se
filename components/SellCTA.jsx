"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, DollarSign, Shield } from "lucide-react";
import { RevealText, FadeUp } from "@/components/TextReveal";

export default function SellCTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-20 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-amber-500/[0.08] via-orange-500/[0.04] to-transparent p-10 md:p-16 lg:p-20"
      >
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />

        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }}
        />

        <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          {/* Left: Text */}
          <div>
            <FadeUp>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                For Sellers
              </p>
            </FadeUp>
            <RevealText delay={0.1}>
              <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tighter md:text-6xl lg:text-7xl">
                Your closet
                <br />
                is a goldmine.
              </h2>
            </RevealText>
            <FadeUp delay={0.2}>
              <p className="mt-6 max-w-md text-base text-white/50">
                List in under 5 minutes. Get paid the moment your item ships.
                No listing fees, no monthly charges — we only earn when you do.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(245,158,11,0.4)] transition-transform hover:scale-105"
                >
                  Start Selling
                  <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/shop"
                  className="rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur transition-all hover:border-white/30 hover:bg-white/[0.06]"
                >
                  Learn more
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Right: Feature cards */}
          <div className="grid gap-4">
            {[
              {
                icon: Zap,
                title: "5-minute listing",
                desc: "Snap, describe, publish. Our AI auto-tags and prices.",
                accent: "text-amber-400"
              },
              {
                icon: DollarSign,
                title: "Only 10% commission",
                desc: "No hidden fees. Keep 90% of every sale.",
                accent: "text-emerald-400"
              },
              {
                icon: Shield,
                title: "Seller protection",
                desc: "Insured shipping, chargeback protection, verified buyers.",
                accent: "text-cyan-400"
              }
            ].map(({ icon: Icon, title, desc, accent }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex gap-4 rounded-2xl border border-white/[0.06] bg-black/40 p-5 backdrop-blur-sm"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ${accent}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm text-white/40">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
