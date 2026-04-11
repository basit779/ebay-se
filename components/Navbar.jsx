"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, User, Menu, X, LogOut, Package, Gavel } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import FluxBidLogo from "@/components/FluxBidLogo";

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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/auctions", label: "Auctions", icon: Gavel, accent: true },
    { href: "/cart", label: "Cart" }
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] bg-black/80 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
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
                className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                  link.accent
                    ? isActive
                      ? "text-red-400"
                      : "text-red-400/60 hover:text-red-400"
                    : isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                }`}
              >
                {link.icon && <link.icon size={13} />}
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute inset-x-2 -bottom-[13px] h-[2px] rounded-full ${
                      link.accent
                        ? "bg-gradient-to-r from-red-500 to-orange-500"
                        : "bg-gradient-to-r from-cyan-400 to-blue-500"
                    }`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/wishlist"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.04] bg-white/[0.02] text-white/40 transition-all hover:border-pink-500/20 hover:text-pink-400"
          >
            <Heart size={16} />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[9px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.04] bg-white/[0.02] text-white/40 transition-all hover:border-cyan-500/20 hover:text-cyan-400"
          >
            <ShoppingCart size={16} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-bold text-black"
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
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-xs font-bold text-purple-400 transition hover:bg-purple-500/20"
              >
                {user.name[0].toUpperCase()}
              </button>
            ) : (
              <button
                onClick={onAuthOpen}
                className="flex h-9 items-center gap-1.5 rounded-xl border border-white/[0.04] bg-white/[0.02] px-3.5 text-xs text-white/40 transition hover:border-cyan-500/20 hover:text-white/70"
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
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.04] bg-white/[0.02] text-white/40 md:hidden"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/[0.06] md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/[0.03] hover:text-white"
                >
                  {link.icon && <link.icon size={14} />}
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
