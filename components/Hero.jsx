"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingBag, Gavel, Zap, Star } from "lucide-react";
import FluxBidLogo from "@/components/FluxBidLogo";
import MagneticButton from "@/components/MagneticButton";
import ProductImage from "@/components/ProductImage";
import AnimatedBackground from "@/components/AnimatedBackground";

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
            initial={{ opacity: 0, y: 100, rotateY: -30 }}
            animate={{
              opacity: 1,
              y: pos.y,
              x: pos.x,
              rotateZ: pos.rotate,
              rotateY: 0,
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
            <motion.div
              animate={{
                y: [-6, 6, -6]
              }}
              transition={{
                repeat: Infinity,
                duration: 4 + i,
                ease: "easeInOut"
              }}
              className="w-[320px] overflow-hidden rounded-3xl border border-white/10 bg-black/80 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            >
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
            </motion.div>
          </motion.div>
        );
      })}

      {/* Decorative orbital rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/5"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.03]"
      />
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <AnimatedBackground />
      </motion.div>

      {/* Main content wrapper */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:py-0"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* FluxBid Logo — Centered at top */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex justify-center lg:mb-16"
        >
          <FluxBidLogo size="2xl" animate={true} />
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* Left: Text Content */}
        <div className="order-2 text-left lg:order-1">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            <span>Live marketplace · 48 active auctions</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-black leading-[0.95] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-[84px]"
          >
            Where
            <br />
            everything
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                flows.
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-2 left-0 h-[6px] w-full origin-left rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-60 blur-sm"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 max-w-lg text-base text-white/50 md:text-lg"
          >
            The cinematic marketplace for premium goods.
            Bid on rare collectibles, score exclusive drops,
            checkout in a single click.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="/shop"
              className="group flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] transition-shadow hover:shadow-[0_10px_50px_-5px_rgba(255,255,255,0.4)]"
            >
              <ShoppingBag size={16} />
              Start Shopping
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton
              href="/auctions"
              className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur-md transition-all hover:border-red-500/30 hover:bg-red-500/[0.08] hover:text-red-400"
            >
              <Gavel size={16} />
              Live Auctions
            </MagneticButton>
          </motion.div>

          {/* Stats inline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-14 flex items-center gap-8 border-t border-white/[0.06] pt-8"
          >
            {[
              { value: "190M+", label: "Buyers" },
              { value: "24", label: "Products" },
              { value: "4.9", label: "Rating", star: true }
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white md:text-3xl">{s.value}</span>
                  {s.star && <Star size={14} className="star-filled" fill="currentColor" />}
                </div>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-white/30">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Product Stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 flex h-[540px] items-center justify-center lg:order-2"
        >
          <ProductStack />
        </motion.div>
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
