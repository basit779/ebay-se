"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";

const WINDOW_MS = 14 * 60 * 60 * 1000; // 14-hour rolling window

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-champagne-400/30 bg-black/60 backdrop-blur-xl md:h-16 md:w-16">
        <div className="absolute inset-0 bg-gradient-to-br from-champagne-500/15 via-transparent to-champagne-500/10" />
        <span className="font-mono relative text-2xl font-bold tracking-tight text-champagne md:text-3xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-champagne-300/70">
        {label}
      </span>
    </div>
  );
}

export default function DealBanner({ product }) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const targetRef = useRef(null);

  useEffect(() => {
    if (!targetRef.current) {
      targetRef.current = Date.now() + WINDOW_MS;
    }

    const update = () => {
      let diff = targetRef.current - Date.now();
      if (diff <= 0) {
        // Reset to a fresh 14-hour window
        targetRef.current = Date.now() + WINDOW_MS;
        diff = WINDOW_MS;
      }
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000)
      });
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="group relative overflow-hidden rounded-3xl border border-champagne-500/25 bg-gradient-to-br from-champagne-900/30 via-[#140f06] to-obsidian p-6 shadow-[0_30px_80px_-20px_rgba(212,175,55,0.25)] md:p-10"
      >
        {/* Ambient champagne blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-champagne-400/15 blur-[120px]" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-champagne-600/12 blur-[120px]" />

        <div className="relative grid gap-8 md:grid-cols-[180px_1fr_auto] md:items-center md:gap-10">
          {/* Image */}
          <Link href={`/product/${product.id}`} className="block">
            <div className="relative h-40 w-40 overflow-hidden rounded-2xl border border-champagne-400/30 bg-zinc-50 shadow-[0_0_40px_-10px_rgba(212,175,55,0.5)] md:h-44 md:w-44">
              <ProductImage
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
            </div>
          </Link>

          {/* Info */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full px-3 py-1.5">
                <span className="absolute inset-0 bg-gradient-to-r from-champagne-300 via-champagne-400 to-champagne-600" />
                <Flame size={11} className="relative text-black" />
                <span className="relative font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-black">
                  Flash Deal
                </span>
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-champagne-300/80">
                Limited · 14-hour window
              </span>
            </div>

            <h3 className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
              {product.name}
            </h3>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-mono bg-gradient-to-r from-champagne-100 via-champagne-300 to-champagne-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="font-mono text-lg text-white/30 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="rounded-full bg-gradient-to-r from-champagne-300 to-champagne-500 px-2.5 py-1 font-mono text-xs font-bold text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    -{discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Countdown */}
            <div className="mt-6 flex items-center gap-3">
              <TimeBlock value={timeLeft.h} label="Hrs" />
              <span className="font-mono -mt-3 text-2xl font-bold text-champagne-400/40">:</span>
              <TimeBlock value={timeLeft.m} label="Min" />
              <span className="font-mono -mt-3 text-2xl font-bold text-champagne-400/40">:</span>
              <TimeBlock value={timeLeft.s} label="Sec" />
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/product/${product.id}`}
            className="btn-luxe shine-sweep md:justify-self-end"
          >
            <span>Grab Deal</span>
            <ArrowRight size={16} className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
