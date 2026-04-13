"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { RevealText, FadeUp } from "@/components/TextReveal";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-cyan-500/[0.04] via-purple-500/[0.02] to-transparent p-10 md:p-20"
        >
          {/* Decorative orbs */}
          <motion.div
            animate={{
              x: [-20, 20, -20],
              y: [-10, 10, -10]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[100px]"
          />
          <motion.div
            animate={{
              x: [10, -20, 10],
              y: [15, -10, 15]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/20 blur-[100px]"
          />

          {/* Grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}
          />

          {/* Content */}
          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <FadeUp>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
                  Newsletter
                </p>
              </FadeUp>
              <RevealText delay={0.1}>
                <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tighter md:text-6xl lg:text-7xl">
                  Never miss
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    a drop.
                  </span>
                </h2>
              </RevealText>
              <FadeUp delay={0.3}>
                <p className="mt-6 max-w-md text-base text-white/40">
                  Get first access to rare auctions, exclusive drops, and
                  insider pricing. No spam. Unsubscribe anytime.
                </p>
              </FadeUp>
            </div>

            <div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.08] p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                    <Check size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-300">
                      You're on the list
                    </p>
                    <p className="mt-0.5 text-xs text-emerald-400/60">
                      Check your inbox for a welcome gift
                    </p>
                  </div>
                </motion.div>
              ) : (
                <FadeUp delay={0.4}>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="input-glow w-full rounded-2xl bg-white/[0.04] px-6 py-5 text-base text-white placeholder-white/25"
                      />
                    </div>
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-5 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:shadow-[0_10px_60px_-5px_rgba(255,255,255,0.5)]"
                    >
                      Subscribe
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    <p className="text-center text-[11px] text-white/30">
                      Join 280,000+ subscribers · 100% free · no spam
                    </p>
                  </form>
                </FadeUp>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
