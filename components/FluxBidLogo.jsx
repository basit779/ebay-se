"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";

const letterVariants = {
  hidden: { y: 40, opacity: 0, rotateX: -90 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const hoverWave = (i) => ({
  y: [0, -8, 0],
  transition: {
    delay: i * 0.04,
    duration: 0.4,
    ease: "easeOut"
  }
});

export default function FluxBidLogo({ size = "md", animate = true }) {
  const [isHovered, setIsHovered] = useState(false);

  const sizes = {
    sm: { text: "text-2xl", gap: "gap-0" },
    md: { text: "text-3xl", gap: "gap-0.5" },
    lg: { text: "text-5xl", gap: "gap-0.5" },
    xl: { text: "text-7xl", gap: "gap-1" },
    "2xl": { text: "text-6xl sm:text-7xl md:text-8xl lg:text-[110px]", gap: "gap-1" },
    hero: { text: "text-[80px] sm:text-[100px] md:text-[140px] lg:text-[180px]", gap: "gap-0" }
  };

  const s = sizes[size] || sizes.md;

  const flux = [
    { char: "F", offset: 0 },
    { char: "l", offset: 1 },
    { char: "u", offset: 2 },
    { char: "x", offset: 3 }
  ];

  const bid = [
    { char: "B", offset: 4 },
    { char: "i", offset: 5 },
    { char: "d", offset: 6 }
  ];

  return (
    <motion.div
      className={`relative inline-flex items-baseline font-black tracking-tighter ${s.text} ${s.gap} select-none`}
      style={{ perspective: "600px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="hidden"
      animate="visible"
    >
      {/* "Flux" — polished metallic gold with continuous flow */}
      <span className="relative inline-flex">
        {flux.map(({ char, offset }) => (
          <motion.span
            key={offset}
            custom={offset}
            variants={animate ? letterVariants : {}}
            animate={isHovered ? hoverWave(offset) : {}}
            className="logo-flux-metal inline-block"
          >
            {char}
          </motion.span>
        ))}
      </span>

      {/* "Bid" — white metallic with soft gold glow */}
      <span className="relative inline-flex">
        {bid.map(({ char, offset }) => (
          <motion.span
            key={offset}
            custom={offset}
            variants={animate ? letterVariants : {}}
            animate={isHovered ? hoverWave(offset) : {}}
            className="logo-bid-metal inline-block transition-all duration-300"
            style={{
              filter: isHovered
                ? "drop-shadow(0 0 20px rgba(251,191,36,0.6)) drop-shadow(0 0 40px rgba(251,191,36,0.3))"
                : undefined
            }}
          >
            {char}
          </motion.span>
        ))}

        {/* Live pulse dot */}
        {size !== "sm" && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative -top-[0.15em] ml-1"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
            </span>
          </motion.span>
        )}
      </span>
    </motion.div>
  );
}
