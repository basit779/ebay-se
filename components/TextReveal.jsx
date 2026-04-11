"use client";

import { motion } from "framer-motion";

export function RevealText({ children, className = "", delay = 0 }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function StaggerText({ text, className = "", letterClass = "" }) {
  const words = text.split(" ");

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="mr-[0.25em] inline-flex overflow-hidden">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    delay: (wi * word.length + ci) * 0.02,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }
              }}
              className={`inline-block ${letterClass}`}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}

export function CountUp({ target, duration = 2, suffix = "", className = "" }) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ textContent: 0 }}
        whileInView={{ textContent: target }}
        viewport={{ once: true }}
        transition={{ duration, ease: "easeOut" }}
        onUpdate={(latest) => {
          if (latest.textContent !== undefined) {
            // handled by framer-motion
          }
        }}
      >
        {target}{suffix}
      </motion.span>
    </motion.span>
  );
}

export function FadeUp({ children, className = "", delay = 0, y = 30 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
