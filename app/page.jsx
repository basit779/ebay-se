"use client";

import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CategoryCards from "@/components/CategoryCards";
import BrandTicker from "@/components/BrandTicker";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import { RevealText, FadeUp } from "@/components/TextReveal";
import products, { categories } from "@/data/products";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  const featured = products.filter((p) => !p.auction).slice(0, 4);
  const auctions = products.filter((p) => p.auction).slice(0, 3);
  const trending = products.filter((p) => !p.auction && (p.badge === "Hot" || p.badge === "Sale")).slice(0, 4);

  return (
    <>
      <Hero />

      <BrandTicker />

      {/* Featured Collection */}
      <section className="relative mx-auto max-w-7xl px-6 py-32 md:px-8">
        <div className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeUp>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
                Curated
              </p>
            </FadeUp>
            <RevealText delay={0.1}>
              <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tighter md:text-6xl lg:text-7xl">
                Featured
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  collection.
                </span>
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.3}>
            <Link
              href="/shop"
              className="group flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-white"
            >
              <span>View all products</span>
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </FadeUp>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* Live Auctions */}
      {auctions.length > 0 && (
        <section className="relative mx-auto max-w-7xl px-6 py-32 md:px-8">
          <div className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <FadeUp>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-red-500" />
                  </span>
                  Live · Ending Soon
                </p>
              </FadeUp>
              <RevealText delay={0.1}>
                <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tighter md:text-6xl lg:text-7xl">
                  Bid on the
                  <br />
                  <span className="bg-gradient-to-r from-red-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                    extraordinary.
                  </span>
                </h2>
              </RevealText>
            </div>
            <FadeUp delay={0.3}>
              <Link
                href="/auctions"
                className="group flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-red-400"
              >
                <span>All live auctions</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </FadeUp>
          </div>
          <ProductGrid products={auctions} columns={3} />
        </section>
      )}

      <CategoryCards categories={categories} />

      <StatsSection />

      {/* Trending */}
      <section className="relative mx-auto max-w-7xl px-6 py-32 md:px-8">
        <div className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeUp>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">
                Trending
              </p>
            </FadeUp>
            <RevealText delay={0.1}>
              <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tighter md:text-6xl lg:text-7xl">
                Hot right
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                  now.
                </span>
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.3}>
            <Link
              href="/shop"
              className="group flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-purple-400"
            >
              <span>Browse all trending</span>
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </FadeUp>
        </div>
        <ProductGrid products={trending} />
      </section>

      <TestimonialsSection />

      <NewsletterSection />
    </>
  );
}
