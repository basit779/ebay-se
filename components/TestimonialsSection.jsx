"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { RevealText, FadeUp } from "@/components/TextReveal";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    company: "Figma",
    text: "FluxBid's auction experience is unmatched. Won a vintage Rolex for $2k under market — the bidding interface feels like a game.",
    rating: 5,
    product: "Vintage Rolex"
  },
  {
    name: "Marcus Rivera",
    role: "Software Engineer",
    company: "Stripe",
    text: "The typing experience on my Keychron Q1 is unreal. Arrived in 2 days, perfectly packaged. This is how commerce should feel.",
    rating: 5,
    product: "Keychron Q1 Pro"
  },
  {
    name: "Emily Tanaka",
    role: "Photographer",
    company: "Freelance",
    text: "Sold my vintage Leica M6 in under 24 hours for 40% above asking. The seller tools are chef's kiss — zero friction.",
    rating: 5,
    product: "Leica M6"
  },
  {
    name: "David Park",
    role: "Creative Director",
    company: "Apple",
    text: "Bought the Herman Miller Aeron here and saved $400 vs retail. The buyer protection actually works — tested it on a return.",
    rating: 5,
    product: "Herman Miller Aeron"
  },
  {
    name: "Lila Ahmad",
    role: "Audio Engineer",
    company: "Spotify",
    text: "Found a sealed 2007 iPhone I'd been hunting for years. The collector community here is serious — every item is authenticated.",
    rating: 5,
    product: "iPhone Original"
  },
  {
    name: "Omar Hassan",
    role: "Investor",
    company: "Angel",
    text: "Picked up a 1959 Les Paul after a week of bidding. The escrow system made a $185k transaction feel completely safe.",
    rating: 5,
    product: "Gibson Les Paul '59"
  }
];

function TestimonialCard({ t, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="w-[380px] shrink-0 rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-7 backdrop-blur-sm transition-all hover:border-white/[0.12]"
    >
      <Quote size={24} className="text-white/10" />
      <p className="mt-5 text-[15px] leading-relaxed text-white/70">
        {t.text}
      </p>

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

      <div className="mt-6 flex items-center justify-between border-t border-white/[0.04] pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/30 to-purple-500/30 text-sm font-bold">
            {t.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{t.name}</p>
            <p className="text-xs text-white/40">
              {t.role} · {t.company}
            </p>
          </div>
        </div>
        <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/40">
          {t.product}
        </span>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="relative overflow-hidden py-32">
      {/* Header */}
      <div className="mx-auto mb-16 max-w-7xl px-6 md:px-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeUp>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">
                Community
              </p>
            </FadeUp>
            <RevealText delay={0.1}>
              <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tighter md:text-6xl lg:text-7xl">
                Loved by
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                  collectors.
                </span>
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.3}>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-night bg-gradient-to-br from-cyan-400/40 to-purple-500/40 text-xs font-bold"
                  >
                    {testimonials[i].name[0]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} className="star-filled" fill="currentColor" />
                  ))}
                </div>
                <p className="mt-0.5 text-xs text-white/50">
                  4.9 · 12,847 reviews
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-night to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-night to-transparent" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex gap-5"
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i % testimonials.length} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
