"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-obsidian/70 text-white/65 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-[20px] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-champagne-400/40 hover:text-champagne-200 md:bottom-8 md:right-8"
        >
          <ChevronUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
