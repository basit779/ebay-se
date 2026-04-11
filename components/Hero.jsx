"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShoppingBag, Star, Shield } from "lucide-react";
import EbayLogo from "@/components/EbayLogo";

const words = ["discover", "collect", "desire", "deserve"];

// Floating product images for the background
const floatingItems = [
  { src: "https://picsum.photos/seed/float-headphones/200/200", x: "8%", y: "15%", size: 80, delay: 0 },
  { src: "https://picsum.photos/seed/float-watch/200/200", x: "85%", y: "20%", size: 70, delay: 0.5 },
  { src: "https://picsum.photos/seed/float-sneakers/200/200", x: "75%", y: "70%", size: 90, delay: 1 },
  { src: "https://picsum.photos/seed/float-keyboard/200/200", x: "12%", y: "72%", size: 75, delay: 1.5 },
  { src: "https://picsum.photos/seed/float-camera/200/200", x: "50%", y: "80%", size: 65, delay: 0.8 },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2500);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-4">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        {/* eBay brand colors as background blobs */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 15, -10] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute -left-20 top-10 h-[400px] w-[400px] rounded-full bg-[#e53238]/10 blur-[120px]"
        />
        <motion.div
          animate={{ y: [15, -25, 15], x: [10, -20, 10] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#0064d2]/10 blur-[130px]"
        />
        <motion.div
          animate={{ y: [20, -15, 20], x: [-15, 20, -15] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[#f5af02]/10 blur-[110px]"
        />
        <motion.div
          animate={{ y: [-10, 25, -10] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute right-1/4 top-10 h-[300px] w-[300px] rounded-full bg-[#86b817]/8 blur-[100px]"
        />
        <div className="particles" />
        <div className="aurora-bg" />
      </div>

      {/* Floating product images */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {floatingItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ delay: item.delay + 0.5, duration: 1 }}
            className="absolute"
            style={{ left: item.x, top: item.y }}
          >
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 5 + i, ease: "easeInOut" }}
            >
              <img
                src={item.src}
                alt=""
                className="rounded-2xl border border-white/10 object-cover shadow-2xl"
                style={{ width: item.size, height: item.size }}
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay to night */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-night" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f5af02]/30 bg-[#f5af02]/10 px-4 py-1.5 text-xs font-medium text-[#f5af02]"
        >
          <Sparkles size={12} />
          The World's Online Marketplace
        </motion.div>

        {/* eBay Logo — large floating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6"
        >
          <EbayLogo size="hero" animated={true} />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
        >
          Everything you{" "}
          <span className="relative inline-block min-w-[180px]">
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-gradient-to-r from-[#e53238] via-[#f5af02] to-[#86b817] bg-clip-text text-transparent"
            >
              {words[wordIndex]}
            </motion.span>
          </span>
          <br />
          <span className="text-white/80">all in one place</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-6 max-w-2xl text-base text-white/45 md:text-lg"
        >
          Buy and sell everything from electronics to fashion. Millions of items
          at unbeatable prices with buyer protection on every purchase.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/shop"
            className="btn-glow group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0064d2] to-[#0064d2]/80 px-8 py-4 text-sm font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(0,100,210,0.4)]"
          >
            <ShoppingBag size={16} />
            Shop Now
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/shop?category=Tech"
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 text-sm font-medium text-white/80 backdrop-blur transition-all hover:border-white/25 hover:bg-white/[0.06]"
          >
            Browse Categories
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mx-auto mt-16 flex max-w-2xl flex-wrap justify-center gap-8"
        >
          {[
            { icon: ShoppingBag, value: "190M+", label: "Active Buyers" },
            { icon: Star, value: "4.9", label: "Avg Rating" },
            { icon: Shield, value: "100%", label: "Buyer Protection" }
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03]">
                <stat.icon size={18} className="text-[#0064d2]" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-[11px] text-white/35">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-10 w-6 rounded-full border border-white/20 p-1"
        >
          <div className="mx-auto h-2 w-1 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
