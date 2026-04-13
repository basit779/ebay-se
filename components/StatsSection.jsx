"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Package, Users, Award, Globe } from "lucide-react";
import { RevealText, FadeUp } from "@/components/TextReveal";

function AnimatedCounter({ target, suffix = "", duration = 2 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const end = start + duration * 1000;

    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / (end - start), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    tick();
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 190, suffix: "M+", label: "Active Buyers", icon: Users, color: "text-cyan-400" },
  { value: 12, suffix: "M+", label: "Items Sold", icon: Package, color: "text-purple-400" },
  { value: 190, suffix: "+", label: "Countries", icon: Globe, color: "text-blue-400" },
  { value: 99, suffix: "%", label: "Satisfaction", icon: Award, color: "text-emerald-400" }
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <FadeUp>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
              By the numbers
            </p>
          </FadeUp>
          <RevealText delay={0.1}>
            <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tighter md:text-6xl lg:text-7xl">
              Trusted
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                globally.
              </span>
            </h2>
          </RevealText>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition-colors hover:border-white/[0.12] md:p-8"
              >
                {/* Icon */}
                <div className={`mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] ${stat.color}`}>
                  <Icon size={18} />
                </div>

                {/* Number */}
                <div className="text-4xl font-black tracking-tighter text-white md:text-5xl lg:text-6xl">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="mt-2 text-sm text-white/40">{stat.label}</p>

                {/* Decorative corner gradient */}
                <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                  stat.color === "text-cyan-400" ? "bg-cyan-500" :
                  stat.color === "text-purple-400" ? "bg-purple-500" :
                  stat.color === "text-blue-400" ? "bg-blue-500" :
                  "bg-emerald-500"
                }`} style={{ opacity: 0.1 }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
