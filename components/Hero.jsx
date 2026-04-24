"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingBag, Gavel, Zap, Star, Search } from "lucide-react";
import FluxBidLogo from "@/components/FluxBidLogo";
import MagneticButton from "@/components/MagneticButton";
import ProductImage from "@/components/ProductImage";
import AnimatedBackground from "@/components/AnimatedBackground";

// Defer the particle canvas until the page is interactive — it's pure
// decoration and not needed for FCP. Fallback is a transparent div so
// there's no layout shift.
const HeroParticles = dynamic(() => import("@/components/HeroParticles"), {
  ssr: false,
  loading: () => null
});

const heroProducts = [
  {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    name: "Sony WH-1000XM5",
    price: "$329",
    tag: "Best Seller"
  },
  {
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=500&q=80",
    name: "Vintage Rolex",
    price: "$8,500",
    tag: "Live Auction"
  },
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    name: "Nike Air Max 97",
    price: "$249",
    tag: "Sale"
  }
];

function ProductStack() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="relative h-[540px] w-full" style={{ perspective: "1200px" }}>
      {heroProducts.map((product, i) => {
        const positions = [
          { x: 0, y: 0, z: 0, rotate: -6, scale: 1 },
          { x: 90, y: 50, z: -80, rotate: 4, scale: 0.95 },
          { x: -70, y: 110, z: -160, rotate: -3, scale: 0.9 }
        ];
        const pos = positions[i];
        const isHovered = hovered === i;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: pos.y,
              x: pos.x,
              rotateZ: pos.rotate,
              scale: isHovered ? 1.05 : pos.scale
            }}
            transition={{
              delay: 0.5 + i * 0.15,
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              zIndex: isHovered ? 10 : heroProducts.length - i,
              transformStyle: "preserve-3d"
            }}
          >
            <div className="w-[320px] overflow-hidden rounded-3xl border border-white/10 bg-black/80 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.8)]">
              <div className="relative h-[380px] overflow-hidden">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Tag */}
                <div className="absolute left-4 top-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      product.tag === "Live Auction"
                        ? "bg-red-500/95 text-white"
                        : product.tag === "Sale"
                          ? "bg-rose-500/95 text-white"
                          : "bg-amber-400/95 text-black"
                    }`}
                  >
                    {product.tag === "Live Auction" && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute h-full w-full animate-ping rounded-full bg-white opacity-75" />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                    )}
                    {product.tag}
                  </span>
                </div>

                {/* Bottom info */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-sm font-medium text-white/60">{product.name}</p>
                  <p className="mt-1 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                    {product.price}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Premium gold halo behind product stack */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.30), rgba(217,119,6,0.12) 40%, transparent 70%)",
          filter: "blur(60px)"
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-amber-400/10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-amber-400/[0.05]" />
    </div>
  );
}

const SEARCH_SCOPES = ["All", "Auctions", "Shop"];
const POPULAR_QUERIES = ["Rolex", "Les Paul", "Canon R6", "Keychron"];

export default function Hero() {
  const sectionRef = useRef(null);
  const router = useRouter();
  const [scope, setScope] = useState("All");
  const [query, setQuery] = useState("");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);

  const runSearch = (term) => {
    const q = (term ?? query).trim();
    if (scope === "Auctions") {
      router.push("/auctions");
      return;
    }
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch();
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <AnimatedBackground />
      </motion.div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <HeroParticles density={40} />
      </div>

      {/* Main content wrapper */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:py-0"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Main content grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* Left: Text Content */}
        <div className="order-2 text-left lg:order-1">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="liquid-glass mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium text-white/70"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-champagne-400 opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-champagne-400" />
            </span>
            <span className="tracking-[0.15em] uppercase text-[10px]">Live marketplace · 48 active auctions</span>
          </motion.div>

          {/* Headline — editorial serif, cinematic cascade */}
          <h1 className="font-serif text-[44px] font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[96px] xl:text-[104px]">
            <motion.span
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block text-luxe"
            >
              Where
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="block text-luxe"
            >
              Luxury
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative inline-block pr-2"
            >
              <span className="italic font-semibold bg-gradient-to-r from-champagne-100 via-champagne-400 to-champagne-600 bg-clip-text text-transparent">
                Flows.
              </span>
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-lg text-base leading-relaxed text-white/55 md:text-lg"
          >
            The cinematic marketplace for premium goods.
            Bid on rare collectibles, score exclusive drops,
            checkout in a single click.
          </motion.p>

          {/* Search — marketplace pattern's primary CTA */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="mt-10 max-w-xl"
            role="search"
          >
            {/* Scope chips */}
            <div className="mb-3 flex items-center gap-1">
              {SEARCH_SCOPES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setScope(s)}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    scope === s
                      ? "bg-champagne-400/15 text-champagne-200 ring-1 ring-champagne-400/25"
                      : "text-white/40 hover:text-white/70"
                  }`}
                  aria-pressed={scope === s}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Search pill */}
            <div className="liquid-glass relative flex h-16 items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] pl-6 pr-2 backdrop-blur-xl transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:border-champagne-400/40">
              <Search size={18} className="shrink-0 text-white/40" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search "Rolex", "Canon R6", "Keychron"…'
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-champagne-300 via-champagne-400 to-champagne-500 px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black shadow-[0_8px_24px_-8px_rgba(212,175,55,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]"
              >
                Search
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Popular queries */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="font-mono uppercase tracking-[0.25em] text-white/25">Popular</span>
              {POPULAR_QUERIES.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => { setQuery(q); runSearch(q); }}
                  className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-white/55 transition-colors duration-300 hover:border-champagne-400/30 hover:text-champagne-200"
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.form>

          {/* Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href="/shop"
              className="btn-ghost group"
            >
              <ShoppingBag size={16} />
              Browse Shop
              <ArrowRight size={16} className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton
              href="/auctions"
              className="btn-ghost group"
            >
              <Gavel size={16} />
              Live Auctions
            </MagneticButton>
          </motion.div>

          {/* Stats inline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex items-center gap-8 border-t border-white/[0.08] pt-8"
          >
            {[
              { value: "2.4M+", label: "Buyers" },
              { value: "150K+", label: "Items Sold" },
              { value: "4.9", label: "Rating", star: true }
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-2xl font-bold tracking-tight text-white md:text-3xl">{s.value}</span>
                  {s.star && <Star size={14} className="star-filled" fill="currentColor" />}
                </div>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-white/30">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Logo + Product Stack (desktop only — nav logo covers mobile) */}
        <div className="order-1 hidden flex-col items-center lg:order-2 lg:flex">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 -mb-6 lg:-mb-10"
          >
            <FluxBidLogo size="xl" animate={true} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden h-[540px] w-full items-center justify-center lg:flex"
          >
            <ProductStack />
          </motion.div>
        </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-night to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
