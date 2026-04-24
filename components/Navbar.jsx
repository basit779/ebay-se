"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, User, Menu, X, LogOut, Package, Gavel, Store } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import FluxBidLogo from "@/components/FluxBidLogo";
import dynamic from "next/dynamic";

const CommandPalette = dynamic(() => import("@/components/CommandPalette"), {
  ssr: false,
  loading: () => null
});

export default function Navbar({ onAuthOpen }) {
  const { itemCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sellHref = user?.accountType === "seller" ? "/sell/dashboard" : "/sell";
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/auctions", label: "Auctions", icon: Gavel, accent: true },
    { href: sellHref, label: "Sell", icon: Store },
    { href: "/cart", label: "Cart" }
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "border-b border-white/10 bg-obsidian/60 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-[20px] backdrop-saturate-150"
          : "border-b border-transparent bg-transparent backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <FluxBidLogo size="sm" animate={false} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  link.accent
                    ? isActive
                      ? "text-champagne-200"
                      : "text-champagne-300/85 hover:text-champagne-200"
                    : isActive
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                }`}
              >
                {link.icon && <link.icon size={13} />}
                {link.label}
                {/* Hover underline-slide (only when not active) */}
                {!isActive && (
                  <span className="pointer-events-none absolute inset-x-3 -bottom-[9px] h-[1.5px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-600 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                )}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-x-2 -bottom-[13px] h-[2px] rounded-full bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-600 shadow-[0_0_14px_rgba(212,175,55,0.6)]"
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <CommandPalette />

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative hidden h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/60 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-rose-400/30 hover:text-rose-300 sm:flex"
          >
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-rose-500 px-1 font-mono text-[10px] font-bold text-white ring-1 ring-rose-300/50">
                {wishlist.length}
              </span>
            )}
          </Link>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/60 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-champagne-400/30 hover:text-champagne-200"
          >
            <ShoppingCart size={18} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-br from-champagne-200 to-champagne-500 px-1 font-mono text-[10px] font-bold text-black shadow-[0_0_10px_rgba(212,175,55,0.55)] ring-1 ring-champagne-200"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <div className="relative">
            {user ? (
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Account menu"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-champagne-400/25 bg-champagne-400/10 text-sm font-bold text-champagne-200 transition-colors duration-300 hover:bg-champagne-400/20 hover:border-champagne-400/50"
              >
                {user.name[0].toUpperCase()}
              </button>
            ) : (
              <button
                onClick={onAuthOpen}
                className="flex h-11 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 text-xs font-medium text-white/70 transition-colors duration-300 hover:border-champagne-400/30 hover:text-champagne-200"
              >
                <User size={14} />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            <AnimatePresence>
              {profileOpen && user && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-white/10 bg-night/95 p-2 shadow-2xl backdrop-blur-2xl"
                  >
                    <div className="border-b border-white/[0.06] px-3 py-2.5">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-[11px] text-white/30">{user.email}</p>
                    </div>
                    <Link
                      href="/account"
                      onClick={() => setProfileOpen(false)}
                      className="mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-white/60 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <Package size={14} /> My Orders
                    </Link>
                    {user.accountType === "seller" && (
                      <Link
                        href="/sell/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-amber-200 transition hover:bg-amber-400/[0.06]"
                      >
                        <Store size={14} /> Seller Dashboard
                      </Link>
                    )}
                    <Link
                      href="/wishlist"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-white/60 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <Heart size={14} /> Wishlist
                    </Link>
                    <button
                      onClick={() => { logout(); setProfileOpen(false); }}
                      className="mt-1 flex w-full items-center gap-2.5 rounded-lg border-t border-white/[0.06] px-3 py-2.5 text-sm text-red-400/70 transition hover:bg-red-500/[0.06] hover:text-red-400"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/70 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-champagne-400/30 hover:text-champagne-200 md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col bg-obsidian/95 p-6 backdrop-blur-[30px] md:hidden"
          >
            <div className="flex items-center justify-between">
              <FluxBidLogo size="sm" animate={false} />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/70 transition-colors duration-300 hover:border-champagne-400/30 hover:text-champagne-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-12 flex flex-col gap-4">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`relative flex items-center gap-4 rounded-2xl px-6 py-5 font-sans text-xl font-semibold tracking-tight transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive
                          ? "bg-champagne-400/10 text-champagne-200"
                          : "text-white/75 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      {link.icon && <link.icon size={20} />}
                      {link.label}
                      {isActive && (
                        <span className="absolute left-6 right-6 bottom-2 h-[2px] rounded-full bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-500 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 rounded-2xl px-6 py-5 font-sans text-xl font-semibold tracking-tight text-white/75 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/[0.04] hover:text-white"
                >
                  <Heart size={20} />
                  Wishlist
                  {wishlist.length > 0 && (
                    <span className="ml-auto flex h-6 min-w-[24px] items-center justify-center rounded-full bg-rose-500 px-1.5 font-mono text-[11px] font-bold text-white ring-1 ring-rose-300/50">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
