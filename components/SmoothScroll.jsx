"use client";

import { useEffect } from "react";

/**
 * Lightweight rAF lerp smooth scroll for desktop wheel input.
 * - Skips touch / reduced-motion / modals marked [data-scroll-lock].
 * - Preserves native scroll for elements with overflow (drawers, menus).
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let rafId;
    let running = false;
    const ease = 0.1;

    const isScrollable = (el) => {
      while (el && el !== document.body) {
        const style = getComputedStyle(el);
        const oy = style.overflowY;
        if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight) {
          return true;
        }
        if (el.hasAttribute && el.hasAttribute("data-lenis-prevent")) return true;
        el = el.parentElement;
      }
      return false;
    };

    const loop = () => {
      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.25) {
        current = target;
        window.scrollTo(0, current);
        running = false;
        return;
      }
      window.scrollTo(0, current);
      rafId = requestAnimationFrame(loop);
    };

    const onWheel = (e) => {
      if (e.ctrlKey) return; // zoom
      if (isScrollable(e.target)) return;
      if (document.body.hasAttribute("data-scroll-lock")) return;
      e.preventDefault();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = Math.max(0, Math.min(max, target + e.deltaY));
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(loop);
      }
    };

    const onScroll = () => {
      if (!running) {
        current = window.scrollY;
        target = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
