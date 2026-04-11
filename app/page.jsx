"use client";

import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CategoryCards from "@/components/CategoryCards";
import Marquee from "@/components/Marquee";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import GsapReveal from "@/components/GsapReveal";
import products, { categories } from "@/data/products";
import { motion } from "framer-motion";

export default function HomePage() {
  const featured = products.filter((p) => p.badge === "Best Seller" || p.badge === "New").slice(0, 4);
  const trending = products.filter((p) => p.badge === "Hot" || p.badge === "Sale").slice(0, 4);

  return (
    <>
      <Hero />
      <Marquee />

      {/* Featured Collection */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <GsapReveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon-cyan">
                Curated
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Featured Collection</h2>
              <p className="mt-2 text-sm text-white/40">
                Hand-picked products with premium quality and stunning design.
              </p>
            </div>
            <a
              href="/shop"
              className="hidden text-sm font-medium text-white/40 transition hover:text-neon-cyan md:block"
            >
              View all →
            </a>
          </div>
        </GsapReveal>
        <div className="mt-10">
          <ProductGrid products={featured} />
        </div>
      </section>

      {/* Category Cards */}
      <CategoryCards categories={categories} />

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <GsapReveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon-purple">
                Trending
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Hot right <span className="text-gradient-static">now</span>
              </h2>
              <p className="mt-2 text-sm text-white/40">
                Best deals and most popular picks this week.
              </p>
            </div>
            <a
              href="/shop"
              className="hidden text-sm font-medium text-white/40 transition hover:text-neon-purple md:block"
            >
              See more →
            </a>
          </div>
        </GsapReveal>
        <div className="mt-10">
          <ProductGrid products={trending} />
        </div>
      </section>

      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
