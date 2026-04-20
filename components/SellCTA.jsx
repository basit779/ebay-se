"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, DollarSign, Shield } from "lucide-react";
import { RevealText, FadeUp } from "@/components/TextReveal";

export default function SellCTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-champagne-500/[0.06] via-champagne-700/[0.03] to-transparent p-10 md:p-16 lg:p-20"
      >
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-champagne-400/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-champagne-600/10 blur-[120px]" />

        <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          {/* Left: Text */}
          <div>
            <FadeUp>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/80">
                For Sellers
              </p>
            </FadeUp>
            <RevealText delay={0.1}>
              <h2 className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
                Your closet
                <br />
                <span className="italic text-champagne-300">is a goldmine.</span>
              </h2>
            </RevealText>
            <FadeUp delay={0.2}>
              <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-white/55">
                List in under 5 minutes. Get paid the moment your item ships.
                No listing fees, no monthly charges &mdash; 0% commission during
                early access.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/sell" className="btn-luxe shine-sweep group">
                  Start Selling
                  <ArrowUpRight size={16} className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link href="/sell" className="btn-ghost">
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
                desc: "Snap, describe, publish. Our AI auto-tags and prices."
              },
              {
                icon: DollarSign,
                title: "0% commission · early access",
                desc: "No listing fees. No monthly charges. Keep every dollar."
              },
              {
                icon: Shield,
                title: "Seller protection",
                desc: "Insured shipping, chargeback protection, verified buyers."
              }
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group flex gap-4 rounded-2xl border border-white/10 bg-obsidian/60 p-6 backdrop-blur-[20px] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-champagne-400/30"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-champagne-400/30 bg-champagne-400/10 text-champagne-300 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-champagne-400/50 group-hover:bg-champagne-400/15">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-serif text-lg font-semibold tracking-tight text-white">{title}</p>
                  <p className="mt-1.5 text-[13px] leading-[1.7] text-white/50">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
