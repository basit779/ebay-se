"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Package, Users, Award, Globe } from "lucide-react";
import { RevealText, FadeUp } from "@/components/TextReveal";

function AnimatedCounter({ target, prefix = "", suffix = "", decimals = 0, duration = 2 }) {
  // Static fallback: the initial render shows the target value. This
  // guarantees the section never reads "0.0M" even when JS is slow,
  // disabled, or useInView never fires. Once the observer fires we
  // flip `animating` on and run a 0 -> target ease; otherwise the
  // target stays on screen.
  const [value, setValue] = useState(target);
  const [animating, setAnimating] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (!isInView) return;
    setAnimating(true);
    setValue(0);
    const start = performance.now();
    const end = start + duration * 1000;
    let raf;

    const tick = (t) => {
      const progress = Math.min((t - start) / (end - start), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);

    // Failsafe — if the RAF loop is ever interrupted, snap to the
    // final value after duration + a small buffer. Users never see
    // a half-finished or frozen number.
    const failsafe = setTimeout(() => setValue(target), duration * 1000 + 400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, [isInView, target, duration]);

  const display = animating ? value : target;
  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.floor(display).toLocaleString();

  return (
    <span ref={ref} className="font-mono tracking-tight tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 2.4, decimals: 1, suffix: "M+", label: "Active Buyers", icon: Users, color: "text-cyan-400" },
  { value: 150, suffix: "K+", label: "Items Sold", icon: Package, color: "text-purple-400" },
  { value: 45, suffix: "", label: "Countries", icon: Globe, color: "text-blue-400" },
  { value: 98, suffix: "%", label: "Satisfaction", icon: Award, color: "text-emerald-400" }
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <FadeUp>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-400">
              By the numbers
            </p>
          </FadeUp>
          <RevealText delay={0.1}>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              Trusted
              <br />
              <span className="italic bg-gradient-to-r from-champagne-100 via-champagne-300 to-champagne-500 bg-clip-text text-transparent">
                globally.
              </span>
            </h2>
          </RevealText>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-6">
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
                <div className="font-mono text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
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
