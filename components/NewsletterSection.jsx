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
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-champagne-500/[0.05] via-champagne-700/[0.03] to-transparent p-10 md:p-20"
        >
          {/* Decorative champagne orbs */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-champagne-400/12 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-champagne-600/12 blur-[100px]" />

          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <FadeUp>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/80">
                  Newsletter
                </p>
              </FadeUp>
              <RevealText delay={0.1}>
                <h2 className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
                  Never miss
                  <br />
                  <span className="italic text-champagne-300">a drop.</span>
                </h2>
              </RevealText>
              <FadeUp delay={0.3}>
                <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-white/45">
                  Get first access to rare auctions, exclusive drops, and
                  insider pricing. No spam. Unsubscribe anytime.
                </p>
              </FadeUp>
            </div>

            <div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-4 rounded-2xl border border-champagne-400/30 bg-champagne-400/[0.06] p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne-400/40 bg-champagne-400/12">
                    <Check size={20} className="text-champagne-300" />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-semibold text-champagne-200">
                      You&rsquo;re on the list
                    </p>
                    <p className="mt-1 text-[13px] text-champagne-300/60">
                      Check your inbox for a welcome note
                    </p>
                  </div>
                </motion.div>
              ) : (
                <FadeUp delay={0.4}>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="luxe-input w-full !py-5 text-base"
                    />
                    <button type="submit" className="btn-luxe shine-sweep group w-full">
                      Subscribe
                      <ArrowRight size={16} className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
                    </button>
                    <p className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                      280,000+ subscribers &middot; 100% free &middot; No spam
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
