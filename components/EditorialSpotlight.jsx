"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Star, Check } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { FadeUp, RevealText } from "@/components/TextReveal";

export default function EditorialSpotlight({ product }) {
  if (!product) return null;

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
      <FadeUp>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
          Editor's Pick
        </p>
      </FadeUp>
      <RevealText delay={0.1}>
        <h2 className="mt-4 max-w-3xl text-5xl font-black leading-[0.92] tracking-tighter md:text-6xl lg:text-7xl">
          <span className="text-luxe">The one you</span>
          <br />
          <span className="font-display-italic font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            won't regret.
          </span>
        </h2>
      </RevealText>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 grid gap-6 overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-6 md:grid-cols-2 md:p-10 lg:gap-12"
      >
        {/* Image */}
        <Link href={`/product/${product.id}`} className="block">
          <div className="group relative overflow-hidden rounded-2xl">
            <ProductImage
              src={product.image}
              alt={product.name}
              className="h-full min-h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {product.badge && (
              <span className="absolute left-5 top-5 rounded-full bg-amber-400/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                {product.badge}
              </span>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              {product.category}
            </p>
            <h3 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              {product.name}
            </h3>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className={s <= Math.round(product.rating) ? "star-filled" : "text-white/10"}
                    fill={s <= Math.round(product.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-sm text-white/50">
                {product.rating} · {product.reviewCount} reviews
              </span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-white/60">
              {product.description}
            </p>

            {product.features && (
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                    <Check size={14} className="shrink-0 text-emerald-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Price + CTA */}
          <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-6">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-white">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-white/30 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <Link
              href={`/product/${product.id}`}
              className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              Shop Now
              <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
