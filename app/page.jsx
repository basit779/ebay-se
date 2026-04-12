"use client";

import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CategoryCards from "@/components/CategoryCards";
import BrandTicker from "@/components/BrandTicker";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import SectionHeader from "@/components/SectionHeader";
import EditorialSpotlight from "@/components/EditorialSpotlight";
import HowItWorks from "@/components/HowItWorks";
import FAQSection from "@/components/FAQSection";
import SellCTA from "@/components/SellCTA";
import DealBanner from "@/components/DealBanner";
import products, { categories } from "@/data/products";

export default function HomePage() {
  const featured = products.filter((p) => !p.auction).slice(0, 4);
  const auctions = products.filter((p) => p.auction).slice(0, 3);
  const trending = products
    .filter((p) => !p.auction && (p.badge === "Hot" || p.badge === "Sale"))
    .slice(0, 4);

  // Pick specific products for spotlights
  const editorial = products.find((p) => p.id === "5"); // Canon EOS R6
  const flashDeal = products.find((p) => p.id === "3"); // Nike Air Max (on sale)

  return (
    <>
      <Hero />
      <BrandTicker />

      {/* Featured Collection */}
      <section className="relative mx-auto max-w-7xl px-6 py-32 md:px-8">
        <SectionHeader
          eyebrow="Curated"
          eyebrowColor="text-cyan-400"
          headline="Featured"
          accentWord="collection."
          accentGradient="from-cyan-400 via-blue-400 to-purple-400"
          description="Premium products hand-selected for their quality, design, and craftsmanship. From audio gear to fashion essentials."
          ctaLabel="Browse all products"
          ctaHref="/shop"
          stats={[
            { value: "24", label: "Products" },
            { value: "6", label: "Categories" },
            { value: "4.8", label: "Avg Rating" }
          ]}
        />
        <ProductGrid products={featured} />
      </section>

      {/* Flash Deal Banner */}
      <DealBanner product={flashDeal} />

      {/* Editorial Spotlight */}
      <EditorialSpotlight product={editorial} />

      {/* Live Auctions */}
      {auctions.length > 0 && (
        <section className="relative mx-auto max-w-7xl px-6 py-32 md:px-8">
          <SectionHeader
            eyebrow="Live · Ending Soon"
            eyebrowColor="text-red-400"
            headline="Bid on the"
            accentWord="extraordinary."
            accentGradient="from-red-400 via-rose-400 to-orange-400"
            description="Rare collectibles and one-of-a-kind items from verified sellers. Live bidding, transparent pricing, real-time updates."
            ctaLabel="See all live auctions"
            ctaHref="/auctions"
            stats={[
              { value: auctions.length + "", label: "Live" },
              { value: "$222k", label: "Top Bid" },
              { value: "109", label: "Total Bids" }
            ]}
          />
          <ProductGrid products={auctions} columns={3} />
        </section>
      )}

      {/* Categories Bento */}
      <CategoryCards categories={categories} />

      {/* How It Works */}
      <HowItWorks />

      {/* Stats */}
      <StatsSection />

      {/* Trending */}
      <section className="relative mx-auto max-w-7xl px-6 py-32 md:px-8">
        <SectionHeader
          eyebrow="Trending"
          eyebrowColor="text-purple-400"
          headline="Hot right"
          accentWord="now."
          accentGradient="from-purple-400 via-pink-400 to-rose-400"
          description="The most-viewed and most-bought items this week. Limited stock on sale items — move fast."
          ctaLabel="All trending items"
          ctaHref="/shop"
          stats={[
            { value: "-30%", label: "Top Deal" },
            { value: "24h", label: "Ship Time" },
            { value: "Free", label: "Returns" }
          ]}
        />
        <ProductGrid products={trending} />
      </section>

      {/* Sell CTA */}
      <SellCTA />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
}
