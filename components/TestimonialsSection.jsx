"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Designer",
    avatar: "SC",
    rating: 5,
    text: "The Aether headphones are incredible. The spatial audio makes every track feel like a live performance."
  },
  {
    name: "Marcus Rivera",
    role: "Developer",
    avatar: "MR",
    rating: 5,
    text: "Nova keyboard changed my typing experience entirely. The gasket mount feels absolutely premium."
  },
  {
    name: "Emily Tanaka",
    role: "Photographer",
    avatar: "ET",
    rating: 5,
    text: "Orion Pro Camera delivers stunning 8K footage. The AI autofocus is scary good — never going back."
  }
];

export default function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon-purple">Testimonials</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
          Loved by <span className="text-gradient-static">creators</span>
        </h2>
      </motion.div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/[0.12]"
          >
            <Quote size={28} className="mb-4 text-white/[0.06]" />
            <p className="text-sm leading-relaxed text-white/50">{t.text}</p>

            <div className="mt-5 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={12}
                  className={s <= t.rating ? "star-filled" : "text-white/10"}
                  fill={s <= t.rating ? "currentColor" : "none"}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 border-t border-white/[0.04] pt-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 text-xs font-bold">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-white/30">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
