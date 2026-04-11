"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, User, Menu, X, LogOut, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import EbayLogo from "@/components/EbayLogo";

export default function Navbar({ onAuthOpen }) {
  const { itemCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/cart", label: "Cart" }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-black/60 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-1">
          <EbayLogo size="sm" animated={false} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover-underline relative px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-white/60 transition-all hover:border-neon-rose/30 hover:text-neon-rose"
          >
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-neon-rose text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-white/60 transition-all hover:border-neon-cyan/30 hover:text-neon-cyan"
          >
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="badge-pulse absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-neon-purple text-[10px] font-bold text-white"
              >
                {itemCount}
              </motion.span>
            )}
          </motion.button>

          {/* User */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-neon-purple/30 bg-neon-purple/10 text-sm font-bold text-neon-purple transition-all hover:bg-neon-purple/20"
              >
                {user.name[0].toUpperCase()}
              </button>
            ) : (
              <button
                onClick={onAuthOpen}
                className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 text-sm text-white/60 transition-all hover:border-neon-cyan/30 hover:text-white"
              >
                <User size={16} />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Profile Dropdown */}
            <AnimatePresence>
              {profileOpen && user && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-white/10 bg-panel/95 p-2 shadow-2xl backdrop-blur-2xl"
                >
                  <div className="border-b border-white/[0.06] px-3 py-2.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-white/40">{user.email}</p>
                  </div>
                  <Link
                    href="/account"
                    onClick={() => setProfileOpen(false)}
                    className="mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <Package size={15} /> My Orders
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <Heart size={15} /> Wishlist
                  </Link>
                  <button
                    onClick={() => { logout(); setProfileOpen(false); }}
                    className="mt-1 flex w-full items-center gap-2.5 rounded-lg border-t border-white/[0.06] px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-white/60 md:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
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
                  className="rounded-lg px-4 py-3 text-sm text-white/70 transition hover:bg-white/[0.04] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
