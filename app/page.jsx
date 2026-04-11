"use client";

import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CategoryCards from "@/components/CategoryCards";
import Marquee from "@/components/Marquee";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import { RevealText, FadeUp } from "@/components/TextReveal";
import products, { categories } from "@/data/products";

export default function HomePage() {
  const featured = products.filter((p) => !p.auction && (p.badge === "Best Seller" || p.badge === "New")).slice(0, 4);
  const trending = products.filter((p) => !p.auction && (p.badge === "Hot" || p.badge === "Sale")).slice(0, 4);
  const auctions = products.filter((p) => p.auction).slice(0, 3);

  return (
    <>
      <Hero />
      <Marquee />

      {/* Featured Collection */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <div className="flex items-end justify-between">
          <div>
            <FadeUp>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
                Curated
              </p>
            </FadeUp>
            <RevealText>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Featured Collection</h2>
            </RevealText>
            <FadeUp delay={0.15}>
              <p className="mt-2 text-sm text-white/30">
                Hand-picked products with premium quality and stunning design.
              </p>
            </FadeUp>
          </div>
          <FadeUp>
            <a
              href="/shop"
              className="hidden text-sm font-medium text-white/30 transition hover:text-cyan-400 md:block"
            >
              View all →
            </a>
          </FadeUp>
        </div>
        <div className="mt-10">
          <ProductGrid products={featured} />
        </div>
      </section>

      {/* Live Auctions Preview */}
      {auctions.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
          <div className="flex items-end justify-between">
            <div>
              <FadeUp>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  Live Auctions
                </p>
              </FadeUp>
              <RevealText>
                <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                  Bid on the <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">extraordinary</span>
                </h2>
              </RevealText>
              <FadeUp delay={0.15}>
                <p className="mt-2 text-sm text-white/30">
                  Rare collectibles and one-of-a-kind items — bid before they're gone.
                </p>
              </FadeUp>
            </div>
            <FadeUp>
              <a
                href="/auctions"
                className="hidden text-sm font-medium text-white/30 transition hover:text-red-400 md:block"
              >
                All auctions →
              </a>
            </FadeUp>
          </div>
          <div className="mt-10">
            <ProductGrid products={auctions} columns={3} />
          </div>
        </section>
      )}

      {/* Category Cards */}
      <CategoryCards categories={categories} />

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <div className="flex items-end justify-between">
          <div>
            <FadeUp>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">
                Trending
              </p>
            </FadeUp>
            <RevealText>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Hot right <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">now</span>
              </h2>
            </RevealText>
            <FadeUp delay={0.15}>
              <p className="mt-2 text-sm text-white/30">
                Best deals and most popular picks this week.
              </p>
            </FadeUp>
          </div>
          <FadeUp>
            <a
              href="/shop"
              className="hidden text-sm font-medium text-white/30 transition hover:text-purple-400 md:block"
            >
              See more →
            </a>
          </FadeUp>
        </div>
        <div className="mt-10">
          <ProductGrid products={trending} />
        </div>
      </section>

      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
