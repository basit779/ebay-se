"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { RevealText, FadeUp } from "@/components/TextReveal";
import ProductImage from "@/components/ProductImage";

export default function SectionHeader({
  eyebrow,
  eyebrowColor = "text-amber-400",
  headline,
  accentWord,
  accentGradient = "from-amber-200 via-amber-400 to-orange-500",
  description,
  ctaLabel,
  ctaHref,
  stats,
  thumbnails = []
}) {
  return (
    <div className="relative mb-10 overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] via-transparent to-transparent p-6 backdrop-blur-sm md:mb-14 md:p-10">
      {/* Ambient gold glow */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.22), transparent 70%)",
          filter: "blur(80px)"
        }}
      />
      <div
        className="pointer-events-none absolute -left-24 -bottom-24 h-[320px] w-[320px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(217,119,6,0.18), transparent 70%)",
          filter: "blur(80px)"
        }}
      />

      <div className="relative grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-12">
        {/* Left: eyebrow + headline */}
        <div>
          <FadeUp>
            <div className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 ${eyebrowColor} backdrop-blur-sm`}>
              <Sparkles size={12} />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                {eyebrow}
              </span>
            </div>
          </FadeUp>
          <RevealText delay={0.1}>
            <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-tighter md:text-6xl lg:text-7xl">
              <span className="text-luxe">{headline}</span>{" "}
              <span className={`font-display-italic font-bold bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>
                {accentWord}
              </span>
            </h2>
          </RevealText>

          {/* Mini thumbnail strip under headline */}
          {thumbnails.length > 0 && (
            <FadeUp delay={0.25}>
              <div className="mt-7 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {thumbnails.slice(0, 4).map((t, i) => (
                    <div
                      key={i}
                      className="relative h-12 w-12 overflow-hidden rounded-xl border-2 border-night ring-1 ring-amber-400/20 md:h-14 md:w-14"
                      style={{ zIndex: 4 - i }}
                    >
                      <ProductImage
                        src={t.image}
                        alt={t.name || ""}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="border-l border-white/10 pl-3">
                  <p className="font-display text-xl font-bold leading-none text-gold md:text-2xl">
                    {thumbnails.length}+
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
                    In stock
                  </p>
                </div>
              </div>
            </FadeUp>
          )}
        </div>

        {/* Right: glass panel with description, stats, CTA */}
        <FadeUp delay={0.2}>
          <div className="liquid-glass flex h-full flex-col justify-between gap-5 rounded-2xl p-6 md:p-7">
            {description && (
              <p className="text-sm leading-relaxed text-white/60 md:text-base">
                {description}
              </p>
            )}

            {stats && stats.length > 0 && (
              <div className="grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-5">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <p className="font-display text-2xl font-bold leading-none text-gold md:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-[10px] uppercase tracking-[0.15em] text-white/40">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className="shine-sweep group relative inline-flex items-center justify-between gap-2 overflow-hidden rounded-xl border border-amber-400/25 bg-gradient-to-r from-amber-400/10 to-orange-500/5 px-4 py-3.5 text-sm font-semibold text-amber-200 transition-all hover:border-amber-400/50 hover:from-amber-400/20 hover:to-orange-500/10"
              >
                <span>{ctaLabel}</span>
                <ArrowUpRight
                  size={16}
                  className="text-amber-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            )}
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
