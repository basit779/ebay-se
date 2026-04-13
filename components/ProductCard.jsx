"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShoppingCart, Heart, Star, Eye, Gavel, Clock, TrendingUp } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import ProductImage from "@/components/ProductImage";

const badgeColors = {
  "Best Seller": "from-amber-400 to-orange-500",
  New: "from-emerald-400 to-green-500",
  Sale: "from-rose-400 to-red-500",
  Hot: "from-orange-400 to-red-500",
  Limited: "from-purple-400 to-fuchsia-500",
  Auction: "from-amber-400 via-orange-500 to-rose-500"
};

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const isAuction = product.auction;
  const wishlisted = isWishlisted(product.id);

  const handleMove = (e) => {
    if (reduce || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMouse({ x, y });
    setTilt({ x: -(y / rect.height) * 6, y: (x / rect.width) * 6 });
  };

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    setMouse({ x: 0, y: 0 });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuction) return;
    addToCart(product);
    addToast(`${product.name} added to cart`, "success");
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    addToast(
      isWishlisted(product.id) ? "Removed from wishlist" : "Added to wishlist",
      "success"
    );
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      className="group relative cursor-pointer"
      style={{ transformStyle: "preserve-3d", perspective: "1200px", willChange: "transform" }}
    >
      <div
        className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-zinc-950 via-[#0a0d1a] to-black shadow-2xl shadow-black/60 transition-shadow duration-500 group-hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.9)]"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Neon glow blobs (only render on hover via opacity) */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cyan-500/40 opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-purple-500/40 opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-100" />
        {isAuction && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/30 opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100" />
        )}

        {/* Glass overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />

        {/* Image */}
        <Link href={`/product/${product.id}`} className="relative block">
          <div className="relative h-72 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ x: mouse.x * 0.025, y: mouse.y * 0.025 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              <ProductImage
                src={product.image}
                alt={product.name}
                className="h-full w-full scale-110 object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125"
              />
            </motion.div>

            {/* Image gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(168,85,247,0.20) 100%)" }}
            />

            {/* Premium badge with neon glow */}
            {product.badge && (
              <div className="absolute left-4 top-4 z-20">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${badgeColors[product.badge] || badgeColors.New} opacity-50 blur-xl rounded-full`} />
                  <span className={`relative inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${badgeColors[product.badge] || badgeColors.New} px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-lg backdrop-blur-sm border border-white/20`}>
                    {product.badge === "Auction" && <Gavel size={10} />}
                    {product.badge === "Hot" && <TrendingUp size={10} />}
                    {product.badge}
                  </span>
                </div>
              </div>
            )}

            {/* Discount chip */}
            {!isAuction && discount > 0 && (
              <div className="absolute right-4 top-4 z-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-rose-500/60 blur-xl rounded-full" />
                  <span className="relative rounded-full bg-rose-500/95 px-2.5 py-1 text-[10px] font-bold text-white border border-white/20">
                    -{discount}%
                  </span>
                </div>
              </div>
            )}

            {/* Quick actions */}
            <div className="absolute right-4 top-14 z-20 flex flex-col gap-2 opacity-0 -translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleWishlist}
                className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-xl border transition-colors ${
                  wishlisted
                    ? "bg-rose-500/95 border-rose-300/40 text-white shadow-lg shadow-rose-500/40"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }`}
                aria-label="Wishlist"
              >
                <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
              </motion.button>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}>
                <Link
                  href={`/product/${product.id}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white transition-colors hover:bg-white/20"
                  aria-label="Quick view"
                >
                  <Eye size={14} />
                </Link>
              </motion.div>
            </div>

            {/* Auction time / live indicator */}
            {isAuction && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full border border-amber-500/40 bg-black/70 px-3 py-1.5 backdrop-blur-xl"
              >
                <Clock size={12} className="text-amber-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {product.bidCount || 0} bids · live
                </span>
              </motion.div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="relative z-20 space-y-3 p-5">
          {/* Category + rating */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400/80">
              {product.category}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1">
                <Star size={11} className="star-filled" fill="currentColor" />
                <span className="text-xs font-semibold text-white">{product.rating}</span>
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className="font-display text-lg font-bold leading-tight text-white line-clamp-2 transition-colors group-hover:text-white/95">
            {product.name}
          </h3>

          {/* Price */}
          <div className="space-y-1">
            {isAuction ? (
              <>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber-400/70">
                  Current Bid
                </span>
                <div className="font-display text-3xl font-bold leading-none">
                  <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                    ${product.currentBid?.toLocaleString()}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-baseline gap-2">
                {product.originalPrice && (
                  <span className="text-xs text-white/30 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <div className="font-display text-3xl font-bold leading-none">
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          {isAuction ? (
            <Link
              href={`/product/${product.id}`}
              className="relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 transition-opacity group-hover/btn:opacity-90" />
              <div className="absolute inset-0 opacity-0 blur-xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 transition-opacity group-hover/btn:opacity-80" />
              <Gavel size={14} className="relative text-white" />
              <span className="relative text-sm font-bold text-white tracking-wide">Place Bid</span>
            </Link>
          ) : (
            <button
              onClick={handleAddToCart}
              className="relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-opacity group-hover/btn:opacity-90" />
              <div className="absolute inset-0 opacity-0 blur-xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 transition-opacity group-hover/btn:opacity-70" />
              <ShoppingCart size={14} className="relative text-white" />
              <span className="relative text-sm font-bold text-white tracking-wide">Add to Cart</span>
            </button>
          )}
        </div>

        {/* Bottom glow line on hover */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </motion.article>
  );
}
