"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-amber-400/30 bg-black/60 backdrop-blur-xl md:h-16 md:w-16">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-transparent to-amber-500/10" />
        <span className="font-display relative text-2xl font-bold text-gold md:text-3xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-amber-300/70">
        {label}
      </span>
    </div>
  );
}

export default function DealBanner({ product }) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const update = () => {
      const diff = endOfDay - Date.now();
      if (diff <= 0) {
        setTimeLeft({ h: 0, m: 0, s: 0 });
        return;
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
        className="conic-border group relative overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-br from-amber-950/40 via-[#1a1308] to-black p-6 shadow-[0_30px_80px_-20px_rgba(251,191,36,0.25)] md:p-10"
      >
        {/* Goldy ambient blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-amber-400/20 blur-[120px]" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-orange-500/15 blur-[120px]" />

        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,191,36,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <div className="relative grid gap-8 md:grid-cols-[180px_1fr_auto] md:items-center md:gap-10">
          {/* Image with gold border */}
          <Link href={`/product/${product.id}`} className="block">
            <div className="relative h-40 w-40 overflow-hidden rounded-2xl border border-amber-400/30 shadow-[0_0_40px_-10px_rgba(251,191,36,0.5)] md:h-44 md:w-44">
              <ProductImage
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </Link>

          {/* Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full px-3 py-1.5">
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500" />
                <span className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-400 opacity-0 blur-md transition-opacity group-hover:opacity-70" />
                <Flame size={11} className="relative text-black" />
                <span className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                  Flash Deal
                </span>
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-amber-300/80">
                Limited time · Today only
              </span>
            </div>

            <h3 className="font-display mt-3 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
              {product.name}
            </h3>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-white/30 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2.5 py-1 text-xs font-bold text-black shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                    -{discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Countdown */}
            <div className="mt-5 flex items-center gap-3">
              <TimeBlock value={timeLeft.h} label="Hrs" />
              <span className="font-display -mt-3 text-2xl font-bold text-amber-400/40">:</span>
              <TimeBlock value={timeLeft.m} label="Min" />
              <span className="font-display -mt-3 text-2xl font-bold text-amber-400/40">:</span>
              <TimeBlock value={timeLeft.s} label="Sec" />
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/product/${product.id}`}
            className="shine-sweep group/btn relative flex items-center gap-2 overflow-hidden rounded-full px-7 py-4 md:justify-self-end"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500" />
            <div className="absolute inset-0 opacity-0 blur-xl bg-gradient-to-r from-amber-300 to-orange-400 transition-opacity group-hover/btn:opacity-90" />
            <span className="relative text-sm font-bold uppercase tracking-wider text-black">
              Grab Deal
            </span>
            <ArrowRight size={16} className="relative text-black transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
