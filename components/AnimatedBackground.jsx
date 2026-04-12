"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AnimatedBackground({ variant = "mesh" }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { damping: 40, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 100 });

  const spotlightX = useTransform(springX, (v) => `${v * 100}%`);
  const spotlightY = useTransform(springY, (v) => `${v * 100}%`);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#05060a] to-black" />

      {/* Animated mesh gradient blobs */}
      <motion.div
        animate={{
          x: ["-20%", "30%", "-20%"],
          y: ["-10%", "20%", "-10%"],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-[10%] h-[600px] w-[600px] rounded-full bg-cyan-500/[0.15] blur-[100px]"
      />
      <motion.div
        animate={{
          x: ["30%", "-20%", "30%"],
          y: ["20%", "-10%", "20%"],
          scale: [1.2, 0.9, 1.2]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[10%] top-[30%] h-[700px] w-[700px] rounded-full bg-purple-500/[0.15] blur-[120px]"
      />
      <motion.div
        animate={{
          x: ["-10%", "20%", "-10%"],
          y: ["10%", "-20%", "10%"],
          scale: [0.9, 1.2, 0.9]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[30%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.12] blur-[110px]"
      />
      <motion.div
        animate={{
          x: ["20%", "-30%", "20%"],
          y: ["-20%", "20%", "-20%"]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[20%] bottom-[20%] h-[400px] w-[400px] rounded-full bg-pink-500/[0.1] blur-[100px]"
      />

      {/* Conic gradient aurora layer */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[150vw] w-[150vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.15]"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, #22d3ee 60deg, transparent 120deg, #a855f7 180deg, transparent 240deg, #3b82f6 300deg, transparent 360deg)"
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at center, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 70%)"
        }}
      />

      {/* Mouse spotlight */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x} ${y}, rgba(34,211,238,0.08), transparent 40%)`
          )
        }}
      />

      {/* Scan lines (very subtle) */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)"
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
    </div>
  );
}
