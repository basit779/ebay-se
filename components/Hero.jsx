"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";

const words = ["move", "feel", "look", "sound"];

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
      <AnimatedBackground />

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-night" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 px-4 py-1.5 text-xs font-medium text-neon-purple"
        >
          <Sparkles size={12} />
          Next-Gen Premium Commerce
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-8xl"
        >
          Discover products
          <br />
          that{" "}
          <span className="relative inline-block">
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5 }}
              className="text-gradient inline-block"
            >
              {words[wordIndex]}
            </motion.span>
          </span>
          <br />
          <span className="text-white/90">like the future</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-white/50 md:text-xl"
        >
          A cinematic storefront with immersive motion, elevated visuals,
          and frictionless shopping — all in one place.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/shop"
            className="btn-glow group flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue px-8 py-4 text-sm font-semibold text-black transition-all hover:shadow-glow-lg"
          >
            Explore Shop
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/shop?category=Tech"
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 text-sm font-medium text-white/80 backdrop-blur transition-all hover:border-white/25 hover:bg-white/[0.06]"
          >
            Browse Categories
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mx-auto mt-20 flex max-w-lg justify-center divide-x divide-white/10"
        >
          {[
            { value: "12K+", label: "Products Sold" },
            { value: "4.9", label: "Avg Rating" },
            { value: "24/7", label: "Support" }
          ].map((stat) => (
            <div key={stat.label} className="px-8 text-center">
              <p className="text-2xl font-bold text-gradient-static">{stat.value}</p>
              <p className="mt-1 text-xs text-white/40">{stat.label}</p>
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
