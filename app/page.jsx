"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import LiveBidTicker from "@/components/LiveBidTicker";
import products, { categories } from "@/data/products";
import SectionHeader from "@/components/SectionHeader";
import ProductGrid from "@/components/ProductGrid";

// Lightweight skeleton used while below-fold chunks hydrate.
// Keeps scroll depth stable so the page doesn't jump when a section arrives.
const SectionFallback = ({ h = 320 }) => (
  <div
    aria-hidden
    className="mx-auto my-6 max-w-7xl animate-pulse rounded-3xl border border-white/[0.04] bg-white/[0.02]"
    style={{ height: h }}
  />
);

// Below-the-fold: dynamic-import so their JS streams in after the hero.
const BrandTicker       = dynamic(() => import("@/components/BrandTicker"),       { ssr: false, loading: () => <SectionFallback h={80} /> });
const TrustStrip        = dynamic(() => import("@/components/TrustStrip"),        { ssr: false, loading: () => <SectionFallback h={180} /> });
const DealBanner        = dynamic(() => import("@/components/DealBanner"),        { ssr: false, loading: () => <SectionFallback h={240} /> });
const EditorialSpotlight= dynamic(() => import("@/components/EditorialSpotlight"),{ ssr: false, loading: () => <SectionFallback h={400} /> });
const CategoryCards     = dynamic(() => import("@/components/CategoryCards"),     { ssr: false, loading: () => <SectionFallback h={520} /> });
const HowItWorks        = dynamic(() => import("@/components/HowItWorks"),        { ssr: false, loading: () => <SectionFallback h={480} /> });
const StatsSection      = dynamic(() => import("@/components/StatsSection"),      { ssr: false, loading: () => <SectionFallback h={420} /> });
const SellCTA           = dynamic(() => import("@/components/SellCTA"),           { ssr: false, loading: () => <SectionFallback h={480} /> });
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"), { ssr: false, loading: () => <SectionFallback h={480} /> });
const FAQSection        = dynamic(() => import("@/components/FAQSection"),        { ssr: false, loading: () => <SectionFallback h={520} /> });
const NewsletterSection = dynamic(() => import("@/components/NewsletterSection"), { ssr: false, loading: () => <SectionFallback h={360} /> });

export default function HomePage() {
  const featured = products.filter((p) => !p.auction).slice(0, 4);
  const featuredIds = new Set(featured.map((p) => p.id));
  const auctions = products.filter((p) => p.auction).slice(0, 3);

  const editorial = products.find((p) => p.id === "5"); // Canon EOS R6
  const flashDeal = products.find((p) => p.id === "7"); // Keychron Q1 Pro (Hot)

  const excludeIds = new Set([
    ...featuredIds,
    flashDeal?.id,
    editorial?.id
  ].filter(Boolean));
  const trending = products
    .filter(
      (p) =>
        !p.auction &&
        (p.badge === "Hot" || p.badge === "Sale") &&
        !excludeIds.has(p.id)
    )
    .slice(0, 4);

  return (
    <>
      {/* ── Above the fold — ships in the main chunk ── */}
      <Hero />
      <LiveBidTicker auctions={products.filter((p) => p.auction)} />
      <BrandTicker />
      <TrustStrip />

      {/* Featured Collection */}
      <section className="obsidian-depth relative mx-auto max-w-7xl px-6 py-24 md:py-32 md:px-8">
        <SectionHeader
          eyebrow="Curated"
          eyebrowColor="text-champagne-400"
          headline="Featured"
          accentWord="collection."
          accentGradient="from-champagne-100 via-champagne-400 to-champagne-600"
          description="Premium products hand-selected for their quality, design, and craftsmanship. From audio gear to fashion essentials."
          ctaLabel="Browse all products"
          ctaHref="/shop"
          thumbnails={featured}
          stats={[
            { value: "24", label: "Products" },
            { value: "6", label: "Categories" },
            { value: "4.8", label: "Avg Rating" }
          ]}
        />
        <ProductGrid products={featured} asymmetric />
      </section>

      {/* ── Below the fold — lazy-chunked ── */}
      <DealBanner product={flashDeal} />
      <EditorialSpotlight product={editorial} />

      {auctions.length > 0 && (
        <section className="obsidian-depth relative mx-auto max-w-7xl px-6 py-24 md:py-32 md:px-8">
          <SectionHeader
            eyebrow="Live · Ending Soon"
            eyebrowColor="text-champagne-400"
            headline="Bid on the"
            accentWord="extraordinary."
            accentGradient="from-champagne-200 via-champagne-400 to-champagne-600"
            description="Rare collectibles and one-of-a-kind items from verified sellers. Live bidding, transparent pricing, real-time updates."
            ctaLabel="See all live auctions"
            ctaHref="/auctions"
            thumbnails={products.filter((p) => p.auction)}
            stats={[
              { value: auctions.length + "", label: "Live" },
              { value: "$222k", label: "Top Bid" },
              { value: "109", label: "Total Bids" }
            ]}
          />
          <ProductGrid products={auctions} layout="bento-3" />
        </section>
      )}

      <CategoryCards categories={categories} />
      <HowItWorks />
      <StatsSection />

      <section className="obsidian-depth relative mx-auto max-w-7xl px-6 py-24 md:py-32 md:px-8">
        <SectionHeader
          eyebrow="Trending"
          eyebrowColor="text-champagne-400"
          headline="Hot right"
          accentWord="now."
          accentGradient="from-champagne-100 via-champagne-400 to-champagne-600"
          description="The most-viewed and most-bought items this week. Limited stock on sale items — move fast."
          ctaLabel="All trending items"
          ctaHref="/shop"
          thumbnails={trending}
          stats={[
            { value: "-30%", label: "Top Deal" },
            { value: "24h", label: "Ship Time" },
            { value: "Free", label: "Returns" }
          ]}
        />
        <ProductGrid products={trending} layout="bento-4" />
      </section>

      <SellCTA />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}
