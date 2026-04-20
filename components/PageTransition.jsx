"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Lightweight route-change fade. No AnimatePresence exit wait —
 * that was unmounting pages before the next one hydrated and
 * leaving the viewport blank during navigation.
 *
 * Using `key={pathname}` still remounts the tree on navigation so
 * the fade-in plays, but we never wait on an exit animation.
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen"
    >
      {children}
    </motion.main>
  );
}
