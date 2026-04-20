"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShoppingCart, Star, Heart, Gavel, Eye, Clock, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import ProductImage from "@/components/ProductImage";

export default function ProductCard({ product, index = 0, variant = "default" }) {
  const isHero = variant === "hero";
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const reduce = useReducedMotion();
  const shouldAnimate = !reduce;

  const [justAdded, setJustAdded] = useState(false);
  const resetTimer = useRef(null);

  const isAuction = product.auction;
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const features = product.features || [];

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuction || justAdded) return;
    addToCart(product);
    addToast(`${product.name} added to cart`, "success");
    setJustAdded(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setJustAdded(false), 1400);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    addToast(
      wishlisted ? "Removed from wishlist" : "Added to wishlist",
      "success"
    );
  };

  // ── Variants ──────────────────────────────────────────────
  // Card container stays still on hover; only the image zooms.
  const containerVariants = {
    rest: {},
    hover: {}
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: shouldAnimate ? { scale: 1.05 } : {}
  };

  const overlayVariants = {
    rest: {
      y: "100%",
      opacity: 0,
      filter: "blur(4px)"
    },
    hover: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.09,
        delayChildren: 0.1
      }
    }
  };

  const contentVariants = {
    rest: { opacity: 0, y: 20 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const buttonMotion = {
    rest: { scale: 1, y: 0 },
    hover: shouldAnimate
      ? { scale: 1.02, y: -2, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
      : {},
    tap: shouldAnimate ? { scale: 0.98, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } } : {}
  };

  const favoriteVariants = {
    rest: { scale: 1, rotate: 0 },
    favorite: {
      scale: [1, 1.25, 1],
      rotate: [0, 8, -8, 0],
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.8,
        delay: Math.min(index * 0.06, 0.35),
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`relative w-full ${isHero ? "h-full" : ""}`}
    >
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={containerVariants}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-[#141414] via-[#0f0f0f] to-[#0A0A0A] shadow-2xl shadow-black/50 transition-shadow duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_30px_80px_-15px_rgba(212,175,55,0.22)] ${isHero ? "h-full" : ""}`}
      >
        {/* Whole-card link (under controls) */}
        <Link
          href={`/product/${product.id}`}
          aria-label={product.name}
          className="absolute inset-0 z-10"
        />

        {/* ── Image container (off-white gallery tile) ─── */}
        <div className="relative overflow-hidden bg-zinc-50">
          <motion.div
            variants={imageVariants}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={isHero ? "h-[520px] w-full" : "h-56 w-full"}
          >
            <ProductImage
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Favorite button */}
          <motion.button
            onClick={handleWishlist}
            variants={favoriteVariants}
            animate={wishlisted ? "favorite" : "rest"}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`pointer-events-auto absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-colors ${
              wishlisted
                ? "border-rose-300/40 bg-rose-500/95 text-white shadow-lg shadow-rose-500/40"
                : "border-white/25 bg-black/40 text-white hover:bg-white/20"
            }`}
          >
            <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
          </motion.button>

          {/* Top-left chip: discount / auction live */}
          {isAuction ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-champagne-400/40 bg-black/70 px-3 py-1 backdrop-blur-xl"
            >
              <Clock size={11} className="text-champagne-300" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-champagne-300">
                {product.bidCount || 0} bids
              </span>
            </motion.div>
          ) : discount > 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-4 top-4 z-20 rounded-full bg-gradient-to-r from-champagne-300 to-champagne-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-[0_6px_20px_-6px_rgba(212,175,55,0.5)]"
            >
              -{discount}% OFF
            </motion.div>
          ) : product.badge ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-4 top-4 z-20 rounded-full bg-gradient-to-r from-champagne-300 to-champagne-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-[0_6px_20px_-6px_rgba(212,175,55,0.5)]"
            >
              {product.badge}
            </motion.div>
          ) : null}
        </div>

        {/* ── Default (rest-state) content ───────────────── */}
        <div className="space-y-3 p-5">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  size={13}
                  className={
                    i < Math.floor(product.rating || 0)
                      ? "star-filled"
                      : "text-white/15"
                  }
                  fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-xs text-white/45">
              {product.rating?.toFixed(1) || "—"}
              {product.reviewCount ? ` (${product.reviewCount})` : ""}
            </span>
          </div>

          {/* Category + name */}
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-champagne-400/80">
              {product.category}
            </p>
            <h3 className="font-serif text-lg font-semibold leading-tight tracking-tight text-white line-clamp-2">
              {product.name}
            </h3>
          </div>

          {/* Price row */}
          <div className="flex items-baseline gap-2">
            {isAuction ? (
              <>
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-champagne-400/75">
                  Current Bid
                </span>
                <span className="font-mono bg-gradient-to-r from-champagne-100 via-champagne-300 to-champagne-500 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  ${product.currentBid?.toLocaleString()}
                </span>
              </>
            ) : (
              <>
                <span className="font-mono bg-gradient-to-r from-champagne-100 via-champagne-300 to-champagne-500 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-white/30 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* ── Reveal overlay (slides up on hover) ─────────── */}
        <motion.div
          variants={overlayVariants}
          className="absolute inset-0 z-30 flex flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-950/95 via-black/95 to-zinc-950/95 backdrop-blur-xl"
        >
          {/* Ambient champagne glow inside overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212,175,55,0.2), transparent 70%)",
              filter: "blur(60px)"
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(143,113,24,0.18), transparent 70%)",
              filter: "blur(60px)"
            }}
          />

          <div className="relative space-y-4 p-6">
            {/* Header: category + name */}
            <motion.div variants={contentVariants}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-champagne-400/90">
                {product.category}
              </p>
              <h3 className="font-serif mt-1 text-xl font-semibold leading-tight tracking-tight text-white line-clamp-2">
                {product.name}
              </h3>
            </motion.div>

            {/* Description */}
            {product.description && (
              <motion.div variants={contentVariants}>
                <h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-champagne-300/80">
                  Product Details
                </h4>
                <p className="line-clamp-3 text-xs leading-relaxed text-white/60">
                  {product.description}
                </p>
              </motion.div>
            )}

            {/* Feature tiles (take first two real features from data) */}
            {features.length > 0 && (
              <motion.div variants={contentVariants}>
                <div className="grid grid-cols-2 gap-2">
                  {features.slice(0, 2).map((f) => (
                    <div
                      key={f}
                      className="rounded-lg border border-champagne-400/20 bg-champagne-400/[0.05] p-2 text-center"
                    >
                      <div className="text-[11px] font-semibold leading-tight text-champagne-100">
                        {f}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action buttons */}
            <motion.div variants={contentVariants} className="pointer-events-auto relative z-10 space-y-2.5 pt-1">
              {isAuction ? (
                <motion.div
                  variants={buttonMotion}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    href={`/product/${product.id}#bid`}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-champagne-300 to-champagne-500 text-sm font-bold text-black shadow-[0_10px_30px_-8px_rgba(212,175,55,0.5)] transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_14px_40px_-6px_rgba(212,175,55,0.75)]"
                  >
                    <Gavel size={15} />
                    <span>Place Bid · </span>
                    <span className="font-mono">${product.currentBid?.toLocaleString()}</span>
                  </Link>
                </motion.div>
              ) : (
                <motion.button
                  onClick={handleAddToCart}
                  variants={buttonMotion}
                  initial="rest"
                  whileHover={justAdded ? undefined : "hover"}
                  whileTap={justAdded ? undefined : "tap"}
                  animate={justAdded ? { backgroundColor: "rgba(212,175,55,0.15)" } : undefined}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl text-sm font-bold transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    justAdded
                      ? "border border-champagne-400/50 text-champagne-200 shadow-[0_10px_30px_-8px_rgba(212,175,55,0.3)]"
                      : "bg-gradient-to-r from-champagne-300 to-champagne-500 text-black shadow-[0_10px_30px_-8px_rgba(212,175,55,0.5)] hover:shadow-[0_14px_40px_-6px_rgba(212,175,55,0.75)]"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {justAdded ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.9 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-2"
                      >
                        <Check size={16} strokeWidth={2.5} />
                        Added to Cart
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingCart size={15} />
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}

              <motion.div
                variants={buttonMotion}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href={`/product/${product.id}`}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] text-xs font-semibold text-white/75 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-champagne-400/35 hover:bg-champagne-400/[0.07] hover:text-champagne-200"
                >
                  <Eye size={13} /> View Details
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
