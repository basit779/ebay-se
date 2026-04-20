"use client";

import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CategoryCards from "@/components/CategoryCards";
import BrandTicker from "@/components/BrandTicker";
import LiveBidTicker from "@/components/LiveBidTicker";
import TrustStrip from "@/components/TrustStrip";
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
        <ProductGrid products={featured} />
      </section>

      {/* Flash Deal Banner */}
      <DealBanner product={flashDeal} />

      {/* Editorial Spotlight */}
      <EditorialSpotlight product={editorial} />

      {/* Live Auctions */}
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
