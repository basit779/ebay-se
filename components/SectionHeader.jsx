"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RevealText, FadeUp } from "@/components/TextReveal";

export default function SectionHeader({
  eyebrow,
  eyebrowColor = "text-amber-400",
  headline,
  accentWord,
  accentGradient = "from-amber-200 via-amber-400 to-orange-500",
  description,
  ctaLabel,
  ctaHref,
  stats
}) {
  return (
    <div className="mb-16 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
      {/* Left: Headline */}
      <div>
        <FadeUp>
          <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${eyebrowColor}`}>
            {eyebrow}
          </p>
        </FadeUp>
        <RevealText delay={0.1}>
          <h2 className="mt-4 text-5xl font-black leading-[0.92] tracking-tighter md:text-6xl lg:text-7xl">
            <span className="text-luxe">{headline}</span>
            <br />
            <span className={`font-display-italic font-bold bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>
              {accentWord}
            </span>
          </h2>
        </RevealText>
      </div>

      {/* Right: Info panel with description, stats, and CTA */}
      <FadeUp delay={0.2}>
        <div className="flex flex-col gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm md:gap-6 md:p-7">
          {description && (
            <p className="text-sm leading-relaxed text-white/50 md:text-base">
              {description}
            </p>
          )}

          {stats && stats.length > 0 && (
            <div className="flex items-center gap-6 border-t border-white/[0.04] pt-5">
              {stats.map((stat, i) => (
                <div key={i} className="flex-1">
                  <p className="text-xl font-bold text-white md:text-2xl">{stat.value}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/30">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {ctaLabel && ctaHref && (
            <Link
              href={ctaHref}
              className="group inline-flex items-center justify-between gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/80 transition-all hover:border-white/20 hover:bg-white/[0.06]"
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight
                size={16}
                className="text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
              />
            </Link>
          )}
        </div>
      </FadeUp>
    </div>
  );
}
