"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Search,
  Package,
  Gavel,
  ShoppingBag,
  Heart,
  User,
  Home,
  Store,
  CreditCard,
  Sparkles,
  ArrowRight,
  CornerDownLeft
} from "lucide-react";
import products from "@/data/products";

const quickActions = [
  { label: "Home", href: "/", icon: Home, group: "Navigate" },
  { label: "Shop all products", href: "/shop", icon: ShoppingBag, group: "Navigate" },
  { label: "Live auctions", href: "/auctions", icon: Gavel, group: "Navigate" },
  { label: "Sell on FluxBid", href: "/sell", icon: Store, group: "Navigate" },
  { label: "Cart", href: "/cart", icon: ShoppingBag, group: "Navigate" },
  { label: "Checkout", href: "/checkout", icon: CreditCard, group: "Navigate" },
  { label: "Wishlist", href: "/wishlist", icon: Heart, group: "Navigate" },
  { label: "My account", href: "/account", icon: User, group: "Navigate" }
];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Keyboard shortcut: Cmd/Ctrl+K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Reset state + focus on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return [
        { section: "Quick actions", items: quickActions.slice(0, 6) },
        {
          section: "Trending",
          items: products.slice(0, 4).map((p) => ({
            label: p.name,
            href: `/product/${p.id}`,
            meta: `$${p.price}`,
            category: p.category,
            image: p.image,
            icon: Package,
            group: "Product"
          }))
        }
      ];
    }

    const actionMatches = quickActions.filter((a) =>
      a.label.toLowerCase().includes(q)
    );
    const productMatches = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      )
      .slice(0, 8)
      .map((p) => ({
        label: p.name,
        href: `/product/${p.id}`,
        meta: p.auction
          ? `$${p.currentBid?.toLocaleString?.() ?? p.startingBid}`
          : `$${p.price}`,
        category: p.category,
        image: p.image,
        icon: Package,
        group: "Product"
      }));

    const sections = [];
    if (actionMatches.length) sections.push({ section: "Actions", items: actionMatches });
    if (productMatches.length) sections.push({ section: "Products", items: productMatches });
    return sections;
  }, [query]);

  const flat = useMemo(() => results.flatMap((s) => s.items), [results]);

  const go = useCallback(
    (item) => {
      if (!item?.href) return;
      setOpen(false);
      router.push(item.href);
    },
    [router]
  );

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(flat[activeIndex]);
    }
  };

  // Keep active item visible
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-cmd-idx="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  return (
    <>
      {/* Trigger pill (desktop only, sits in nav) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[12px] text-white/45 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-champagne-400/30 hover:bg-white/[0.05] hover:text-champagne-200 md:inline-flex"
        aria-label="Open command palette"
      >
        <Search size={13} />
        <span>Search</span>
        <span className="ml-6 flex items-center gap-1">
          <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-white/55">
            ⌘
          </kbd>
          <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-white/55">
            K
          </kbd>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
              aria-hidden
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 top-[12%] z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2"
            >
              <div
                className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
                style={{
                  background: "linear-gradient(135deg, rgba(20,20,20,0.88), rgba(10,10,10,0.82))",
                  backdropFilter: "blur(24px) saturate(150%)",
                  WebkitBackdropFilter: "blur(24px) saturate(150%)"
                }}
              >
                {/* Input row */}
                <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                  <Search size={16} className="text-champagne-400/80" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setActiveIndex(0);
                    }}
                    onKeyDown={onInputKey}
                    placeholder="Search products, auctions, pages…"
                    className="flex-1 bg-transparent text-[15px] text-white placeholder-white/30 outline-none"
                  />
                  <kbd className="hidden rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-white/45 sm:inline-flex">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2">
                  {results.length === 0 ? (
                    <div className="flex flex-col items-center py-14 text-center">
                      <Sparkles size={22} className="text-white/15" />
                      <p className="mt-4 text-sm text-white/45">
                        No results for &ldquo;{query}&rdquo;
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/25">
                        Try a shorter term
                      </p>
                    </div>
                  ) : (
                    results.map((section, si) => {
                      let runningIdx = results
                        .slice(0, si)
                        .reduce((sum, s) => sum + s.items.length, 0);
                      return (
                        <div key={section.section} className="px-2 py-2">
                          <p className="mb-1 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
                            {section.section}
                          </p>
                          <ul className="space-y-0.5">
                            {section.items.map((item) => {
                              const idx = runningIdx++;
                              const isActive = idx === activeIndex;
                              const Icon = item.icon || Search;
                              return (
                                <li key={item.href + item.label}>
                                  <button
                                    type="button"
                                    data-cmd-idx={idx}
                                    onMouseEnter={() => setActiveIndex(idx)}
                                    onClick={() => go(item)}
                                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-300 ${
                                      isActive
                                        ? "bg-champagne-400/10 text-champagne-100"
                                        : "text-white/65 hover:bg-white/[0.04] hover:text-white"
                                    }`}
                                  >
                                    {item.image ? (
                                      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-zinc-50">
                                        <img
                                          src={item.image}
                                          alt=""
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                    ) : (
                                      <div
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                                          isActive
                                            ? "border-champagne-400/40 bg-champagne-400/10 text-champagne-200"
                                            : "border-white/10 bg-white/[0.02] text-white/50"
                                        }`}
                                      >
                                        <Icon size={15} />
                                      </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                      <p className="truncate text-sm font-medium">{item.label}</p>
                                      {item.category && (
                                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                                          {item.category}
                                        </p>
                                      )}
                                    </div>

                                    {item.meta && (
                                      <span className="font-mono text-[13px] text-white/55">
                                        {item.meta}
                                      </span>
                                    )}
                                    <ArrowRight
                                      size={13}
                                      className={`shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                        isActive
                                          ? "translate-x-0 text-champagne-300 opacity-100"
                                          : "-translate-x-1 text-white/25 opacity-0"
                                      }`}
                                    />
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-5 py-3 text-[11px] text-white/40">
                  <div className="flex items-center gap-4">
                    <Hint keys={["↑", "↓"]} label="Navigate" />
                    <Hint keys={[<CornerDownLeft size={10} key="k" />]} label="Select" />
                  </div>
                  <span className="font-mono uppercase tracking-[0.2em]">FluxBid</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Hint({ keys, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="flex items-center gap-0.5">
        {keys.map((k, i) => (
          <kbd
            key={i}
            className="inline-flex h-4 min-w-[16px] items-center justify-center rounded border border-white/10 bg-white/[0.04] px-1 font-mono text-[9px] text-white/60"
          >
            {k}
          </kbd>
        ))}
      </span>
      <span>{label}</span>
    </span>
  );
}
