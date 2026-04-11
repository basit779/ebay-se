"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-neon-purple/[0.08] via-transparent to-neon-cyan/[0.06] p-10 md:p-16"
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-purple/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-neon-cyan/10 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-neon-cyan/20 bg-neon-cyan/10">
            <Sparkles size={20} className="text-neon-cyan" />
          </div>
          <h2 className="text-3xl font-bold md:text-4xl">
            Stay in the <span className="text-gradient-static">loop</span>
          </h2>
          <p className="mt-3 text-sm text-white/40">
            Get early access to new drops, exclusive deals, and curated content.
            No spam — only the good stuff.
          </p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-sm font-medium text-neon-emerald"
            >
              Thanks for subscribing! Check your inbox for a welcome gift.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="input-glow flex-1 rounded-xl bg-white/[0.04] px-5 py-3.5 text-sm text-white placeholder-white/25"
              />
              <button
                type="submit"
                className="btn-glow flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue px-8 py-3.5 text-sm font-semibold text-black transition-all hover:shadow-glow-lg"
              >
                Subscribe
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
