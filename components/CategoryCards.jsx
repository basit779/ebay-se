"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Headphones, Watch, Shirt, Briefcase, Cpu, Home } from "lucide-react";

const categoryMeta = {
  Audio: { icon: Headphones, desc: "Immersive sound", gradient: "from-cyan-500/20 to-blue-600/20" },
  Wearables: { icon: Watch, desc: "Smarter every second", gradient: "from-purple-500/20 to-pink-600/20" },
  Fashion: { icon: Shirt, desc: "Performance meets style", gradient: "from-rose-500/20 to-orange-500/20" },
  Lifestyle: { icon: Briefcase, desc: "Refined essentials", gradient: "from-emerald-500/20 to-teal-600/20" },
  Tech: { icon: Cpu, desc: "Future-grade hardware", gradient: "from-blue-500/20 to-indigo-600/20" },
  Home: { icon: Home, desc: "Beautiful daily tools", gradient: "from-amber-500/20 to-yellow-600/20" }
};

export default function CategoryCards({ categories }) {
  const filtered = categories.filter((c) => c !== "All");

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon-cyan">Collections</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Shop by category</h2>
        <p className="mt-2 text-sm text-white/40">Explore our curated collections</p>
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cat, i) => {
          const meta = categoryMeta[cat] || { icon: Cpu, desc: "Premium picks", gradient: "from-white/10 to-white/5" };
          const Icon = meta.icon;

          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                href={`/shop?category=${encodeURIComponent(cat)}`}
                className={`group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-gradient-to-br ${meta.gradient} p-5 transition-all hover:border-white/[0.15] hover:shadow-lg`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03]">
                  <Icon size={22} className="text-white/60 transition group-hover:text-neon-cyan" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold">{cat}</h3>
                  <p className="mt-0.5 text-xs text-white/35">{meta.desc}</p>
                </div>
                <span className="text-sm text-white/20 transition group-hover:text-neon-cyan group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
