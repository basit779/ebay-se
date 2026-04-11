"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingBag, Gavel, Shield, Zap } from "lucide-react";
import FluxBidLogo from "@/components/FluxBidLogo";
import MagneticButton from "@/components/MagneticButton";
import ProductImage from "@/components/ProductImage";

const words = ["discover", "collect", "desire", "win"];

// 3D floating auction cards
const auctionCards = [
  {
    name: "Vintage Rolex",
    bid: "$8,500",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=400&q=80",
    bids: 23
  },
  {
    name: "Gibson Les Paul '59",
    bid: "$185,000",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80",
    bids: 12
  },
  {
    name: "Sealed iPhone 2007",
    bid: "$25,000",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=400&q=80",
    bids: 18
  }
];

function FloatingCard({ card, index }) {
  const yOffset = ["-5%", "8%", "-3%"][index];
  const xPos = ["5%", "38%", "72%"][index];
  const rotation = [-6, 3, -4][index];
  const delay = index * 0.3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: 30 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: 1 + delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute hidden lg:block"
      style={{ left: xPos, bottom: yOffset, perspective: "1000px" }}
    >
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotateZ: [rotation, rotation + 2, rotation]
        }}
        transition={{ repeat: Infinity, duration: 5 + index, ease: "easeInOut" }}
        className="w-48 overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-xl"
      >
        <div className="relative h-28 overflow-hidden">
          <ProductImage
            src={card.image}
            alt={card.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-red-500/90 px-2 py-0.5 text-[9px] font-bold text-white">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            LIVE
          </div>
        </div>
        <div className="p-3">
          <p className="text-[11px] font-medium text-white/70">{card.name}</p>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-sm font-bold text-cyan-400">{card.bid}</p>
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

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);

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
      {/* Animated grid background */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: bgY }}>
        {/* Perspective grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "center top",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 70%)"
          }}
        />

        {/* Animated orbs */}
        <motion.div
          animate={{ y: [-30, 30, -30], x: [-20, 20, -20], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute -left-40 top-1/4 h-[600px] w-[600px] rounded-full bg-cyan-500/[0.07] blur-[150px]"
        />
        <motion.div
          animate={{ y: [20, -40, 20], x: [15, -25, 15] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute -right-20 top-1/3 h-[500px] w-[500px] rounded-full bg-purple-500/[0.07] blur-[130px]"
        />
        <motion.div
          animate={{ y: [15, -20, 15] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/[0.06] blur-[120px]"
        />
        <div className="particles" />
      </motion.div>

      {/* Floating auction cards */}
      <div className="pointer-events-none absolute bottom-10 left-0 right-0 h-64">
        {auctionCards.map((card, i) => (
          <FloatingCard key={i} card={card} index={i} />
        ))}
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-4 text-center"
        style={{ opacity: textOpacity, y: textY }}
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.08] px-5 py-2 text-xs font-medium text-cyan-400"
        >
          <Zap size={12} fill="currentColor" />
          Live Auctions & Instant Buy
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <FluxBidLogo size="hero" animate={true} />
        </motion.div>

        {/* Tagline with word cycle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl font-medium tracking-tight text-white/50 sm:text-2xl md:text-3xl"
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
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-bold text-transparent"
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
          className="mx-auto mt-5 max-w-xl text-sm text-white/30 md:text-base"
        >
          The premium marketplace for buying, selling, and bidding.
          Real-time auctions, instant checkout, zero hassle.
        </motion.p>

        {/* CTA buttons with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton
            href="/shop"
            className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-sm font-semibold text-black transition-shadow hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]"
          >
            <ShoppingBag size={16} />
            Start Shopping
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </MagneticButton>

          <MagneticButton
            href="/auctions"
            className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-medium text-white/70 backdrop-blur transition-all hover:border-red-500/30 hover:bg-red-500/[0.06] hover:text-red-400"
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
          className="mx-auto mt-20 flex max-w-xl flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {[
            { icon: ShoppingBag, text: "190M+ Active Buyers" },
            { icon: Shield, text: "Buyer Protection" },
            { icon: Zap, text: "Instant Checkout" }
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-white/25">
              <Icon size={14} className="text-cyan-500/50" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
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
