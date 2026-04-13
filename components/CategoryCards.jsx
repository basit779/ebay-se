"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { RevealText, FadeUp } from "@/components/TextReveal";

const categoryData = {
  Tech: {
    desc: "Cutting-edge gadgets",
    size: "col-span-2 row-span-2",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80",
    count: "6 items",
    gradient: "from-amber-500/35 via-orange-500/15 to-transparent"
  },
  Audio: {
    desc: "Premium sound",
    size: "col-span-2 row-span-1",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    count: "4 items",
    gradient: "from-yellow-400/30 via-amber-500/10 to-transparent"
  },
  Wearables: {
    desc: "Smart watches",
    size: "col-span-1 row-span-1",
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80",
    count: "2 items",
    gradient: "from-purple-500/30 via-amber-500/10 to-transparent"
  },
  Fashion: {
    desc: "Statement pieces",
    size: "col-span-1 row-span-1",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    count: "4 items",
    gradient: "from-rose-500/25 via-amber-500/10 to-transparent"
  },
  Lifestyle: {
    desc: "Everyday essentials",
    size: "col-span-2 row-span-1",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
    count: "2 items",
    gradient: "from-amber-400/30 via-yellow-500/10 to-transparent"
  },
  Home: {
    desc: "Refined living",
    size: "col-span-2 row-span-1",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=1200&q=80",
    count: "3 items",
    gradient: "from-orange-500/30 via-amber-500/10 to-transparent"
  }
};

export default function CategoryCards({ categories }) {
  const filtered = categories.filter((c) => c !== "All");

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
      {/* Section header */}
      <div className="mb-10 flex flex-col items-start gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <FadeUp>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              Collections
            </p>
          </FadeUp>
          <RevealText delay={0.1}>
            <h2 className="mt-4 text-5xl font-black leading-[0.92] tracking-tighter md:text-6xl lg:text-7xl">
              <span className="text-luxe">Shop by</span>
              <br />
              <span className="font-display-italic font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                obsession.
              </span>
            </h2>
          </RevealText>
        </div>
        <FadeUp delay={0.3}>
          <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm md:w-auto">
            <p className="text-sm leading-relaxed text-white/50">
              Every category is a rabbit hole. Each collection curated
              by taste, not algorithm.
            </p>
            <div className="flex items-center gap-5 border-t border-white/[0.04] pt-4">
              <div>
                <p className="font-display text-xl font-bold text-gold">6</p>
                <p className="text-[10px] uppercase tracking-wider text-white/30">Collections</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-gold">24</p>
                <p className="text-[10px] uppercase tracking-wider text-white/30">Items</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-gold">4.8</p>
                <p className="text-[10px] uppercase tracking-wider text-white/30">Avg Rating</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Bento Grid */}
      <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {filtered.map((cat, i) => {
          const meta = categoryData[cat] || {
            desc: "Explore",
            size: "col-span-1 row-span-1",
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
            count: "Items",
            gradient: "from-white/10 via-white/5 to-transparent"
          };

          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={meta.size}
            >
              <Link
                href={`/shop?category=${encodeURIComponent(cat)}`}
                className="conic-border elevate-soft group relative block h-full overflow-hidden rounded-3xl border border-white/[0.06] bg-black/40"
              >
                {/* Background image */}
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductImage
                    src={meta.image}
                    alt={cat}
                    className="h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-80"
                  />
                </motion.div>

                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${meta.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Animated border on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-white/20" />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-between p-5">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                      {meta.count}
                    </span>
                    <motion.div
                      initial={{ opacity: 0, y: -5, x: 5 }}
                      whileHover={{ opacity: 1 }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-black opacity-0 shadow-[0_0_20px_rgba(251,191,36,0.6)] transition-all duration-300 group-hover:opacity-100"
                    >
                      <ArrowUpRight size={16} />
                    </motion.div>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-white transition-transform duration-500 ease-out group-hover:-translate-y-0.5 md:text-3xl">
                      {cat}
                    </h3>
                    <p className="mt-1 text-xs text-white/50 md:text-sm">{meta.desc}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
