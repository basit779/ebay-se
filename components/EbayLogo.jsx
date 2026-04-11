"use client";

import { motion } from "framer-motion";

export default function EbayLogo({ size = "md", animated = true }) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
    hero: "text-7xl sm:text-8xl md:text-9xl"
  };

  const letters = [
    { char: "e", color: "#e53238" },
    { char: "b", color: "#0064d2" },
    { char: "a", color: "#f5af02" },
    { char: "y", color: "#86b817" }
  ];

  const Wrapper = animated ? motion.span : "span";

  return (
    <span className={`inline-flex items-baseline font-extrabold italic ${sizes[size]}`}>
      {letters.map((letter, i) => (
        <Wrapper
          key={i}
          {...(animated
            ? {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.08, duration: 0.4 }
              }
            : {})}
          style={{ color: letter.color }}
          className="inline-block"
        >
          {letter.char}
        </Wrapper>
      ))}
    </span>
  );
}
