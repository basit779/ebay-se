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
      delay: i * 0.06,
      type: "spring",
      stiffness: 200,
      damping: 15
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
      className={`inline-flex items-baseline font-black tracking-tighter ${s.text} ${s.gap} select-none`}
      style={{ perspective: "600px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="hidden"
      animate="visible"
    >
      {/* "Flux" — flowing gradient */}
      <span className="relative inline-flex">
        {flux.map(({ char, offset }) => (
          <motion.span
            key={offset}
            custom={offset}
            variants={animate ? letterVariants : {}}
            animate={isHovered ? hoverWave(offset) : {}}
            className="inline-block bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent"
            style={{
              backgroundSize: "200% 100%",
              animation: "gradient-flow 3s ease infinite",
              animationDelay: `${offset * 0.15}s`
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>

      {/* "Bid" — solid white with glow on hover */}
      <span className="relative inline-flex">
        {bid.map(({ char, offset }) => (
          <motion.span
            key={offset}
            custom={offset}
            variants={animate ? letterVariants : {}}
            animate={isHovered ? hoverWave(offset) : {}}
            className="inline-block text-white transition-all duration-300"
            style={{
              textShadow: isHovered
                ? "0 0 20px rgba(251,191,36,0.55), 0 0 40px rgba(251,191,36,0.25)"
                : "none"
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
            transition={{ delay: 0.6, type: "spring" }}
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
