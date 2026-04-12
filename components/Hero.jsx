"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingBag, Gavel, Shield, Zap, Sparkles } from "lucide-react";
import FluxBidLogo from "@/components/FluxBidLogo";
import MagneticButton from "@/components/MagneticButton";
import ProductImage from "@/components/ProductImage";
import AnimatedBackground from "@/components/AnimatedBackground";

const words = ["discover", "collect", "desire", "win"];

const auctionCards = [
  {
    name: "Vintage Rolex",
    bid: "$8,500",
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=400&q=80",
    bids: 23
  },
  {
    name: "Gibson Les Paul '59",
    bid: "$185,000",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80",
    bids: 12
  },
  {
    name: "Leica M6",
    bid: "$4,200",
    image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=400&q=80",
    bids: 19
  }
];

function FloatingCard({ card, index }) {
  const positions = [
    { x: "6%", y: "15%", rotate: -8 },
    { x: "78%", y: "18%", rotate: 6 },
    { x: "82%", y: "72%", rotate: -5 }
  ];
  const pos = positions[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
      transition={{ delay: 1 + index * 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="absolute hidden lg:block"
      style={{ left: pos.x, top: pos.y, perspective: "1000px" }}
    >
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotateZ: [pos.rotate, pos.rotate + 3, pos.rotate]
        }}
        transition={{ repeat: Infinity, duration: 6 + index, ease: "easeInOut" }}
        whileHover={{ scale: 1.05, rotateZ: 0, zIndex: 10 }}
        className="w-52 overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      >
        <div className="relative h-32 overflow-hidden">
          <ProductImage
            src={card.image}
            alt={card.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-red-500/95 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            LIVE
          </div>
        </div>
        <div className="p-3">
          <p className="text-[11px] font-medium text-white/80">{card.name}</p>
          <div className="mt-1 flex items-center justify-between">
            <p className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-sm font-bold text-transparent">
              {card.bid}
            </p>
            <p className="text-[10px] text-white/30">{card.bids} bids</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Premium animated background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <AnimatedBackground />
      </motion.div>

      {/* Floating auction cards */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {auctionCards.map((card, i) => (
          <FloatingCard key={i} card={card} index={i} />
        ))}
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-night to-transparent" />

      {/* Main Content */}
      <motion.div
        className="relative z-20 mx-auto max-w-6xl px-4 text-center"
        style={{ opacity: textOpacity, y: textY, scale: textScale }}
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.08] px-5 py-2 text-xs font-medium text-cyan-400 backdrop-blur-sm"
        >
          <Sparkles size={12} fill="currentColor" />
          <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Live Auctions · Instant Buy · Worldwide
          </span>
        </motion.div>

        {/* Logo with dramatic entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(30px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <FluxBidLogo size="hero" animate={true} />
        </motion.div>

        {/* Tagline with word cycle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl font-medium tracking-tight text-white/60 sm:text-2xl md:text-3xl"
        >
          Everything you{" "}
          <span className="relative inline-block min-w-[140px] text-left">
            <AnimatePresence mode="wait">
              {mounted && (
                <motion.span
                  key={wordIndex}
                  initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text font-bold text-transparent"
                  style={{ backgroundSize: "200% 100%" }}
                >
                  {words[wordIndex]}
                </motion.span>
              )}
              {!mounted && (
                <span className="inline-block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-bold text-transparent">
                  {words[0]}
                </span>
              )}
            </AnimatePresence>
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mx-auto mt-6 max-w-xl text-sm text-white/40 md:text-base"
        >
          The premium marketplace for buying, selling, and bidding.
          Real-time auctions, instant checkout, zero hassle.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton
            href="/shop"
            className="group relative flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(34,211,238,0.5)] transition-shadow hover:shadow-[0_10px_60px_-5px_rgba(34,211,238,0.6)]"
          >
            <ShoppingBag size={16} />
            Start Shopping
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </MagneticButton>

          <MagneticButton
            href="/auctions"
            className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-medium text-white/70 backdrop-blur-md transition-all hover:border-red-500/30 hover:bg-red-500/[0.06] hover:text-red-400"
          >
            <Gavel size={16} />
            Live Auctions
            <span className="relative ml-1 flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-red-500" />
            </span>
          </MagneticButton>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mx-auto mt-16 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {[
            { icon: ShoppingBag, text: "190M+ Active Buyers" },
            { icon: Shield, text: "Buyer Protection" },
            { icon: Zap, text: "Instant Checkout" }
          ].map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="flex items-center gap-2 text-xs text-white/30"
            >
              <Icon size={14} className="text-cyan-500/60" />
              <span>{text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
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
