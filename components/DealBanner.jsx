"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";

export default function DealBanner({ product }) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    // Deal ends 24 hours from midnight
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

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="group relative overflow-hidden rounded-3xl border border-rose-500/20 bg-gradient-to-r from-rose-500/15 via-red-500/10 to-orange-500/15 p-6 md:p-8"
      >
        {/* Animated flame pattern */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-rose-500/20 blur-[100px]" />

        <div className="relative grid gap-6 md:grid-cols-[140px_1fr_auto] md:items-center md:gap-8">
          {/* Image */}
          <Link href={`/product/${product.id}`} className="block">
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl md:h-36 md:w-36">
              <ProductImage
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </Link>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                <Flame size={10} /> Flash Deal
              </span>
              <span className="text-[11px] text-rose-300/80">
                Ends in {String(timeLeft.h).padStart(2, "0")}:{String(timeLeft.m).padStart(2, "0")}:{String(timeLeft.s).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
              {product.name}
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-rose-300 md:text-3xl">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-white/30 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="rounded-md bg-rose-500 px-2 py-0.5 text-xs font-bold text-white">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/product/${product.id}`}
            className="group/btn flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 md:justify-self-end"
          >
            Grab Deal
            <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
