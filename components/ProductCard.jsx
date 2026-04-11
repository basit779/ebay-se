"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";

const badgeColors = {
  "Best Seller": "from-neon-amber to-orange-500",
  New: "from-neon-emerald to-emerald-600",
  Sale: "from-neon-rose to-rose-600",
  Hot: "from-orange-500 to-red-500",
  Limited: "from-neon-purple to-purple-700"
};

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x - 150}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y - 150}px`);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addToast(`${product.name} added to cart`, "success");
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    addToast(
      isWishlisted(product.id) ? "Removed from wishlist" : "Added to wishlist",
      isWishlisted(product.id) ? "info" : "success"
    );
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      className="spotlight-card group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-colors hover:border-white/[0.12]"
    >
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent" />

          {/* Badge */}
          {product.badge && (
            <span className={`absolute left-3 top-3 rounded-full bg-gradient-to-r ${badgeColors[product.badge] || badgeColors.New} px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg`}>
              {product.badge}
            </span>
          )}

          {/* Quick actions overlay */}
          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleWishlist}
              className={`flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-md transition-all ${
                wishlisted
                  ? "border-neon-rose/50 bg-neon-rose/20 text-neon-rose"
                  : "border border-white/20 bg-black/40 text-white/80 hover:text-neon-rose"
              }`}
            >
              <Heart size={15} fill={wishlisted ? "currentColor" : "none"} />
            </motion.button>
            <Link
              href={`/product/${product.id}`}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-black/40 text-white/80 backdrop-blur-md transition-all hover:text-neon-cyan"
            >
              <Eye size={15} />
            </Link>
          </div>

          {/* Sale price tag */}
          {product.originalPrice && (
            <div className="absolute bottom-3 left-3">
              <span className="rounded-lg bg-neon-rose/90 px-2 py-1 text-xs font-bold text-white">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
            {product.category}
          </p>
          {product.rating && (
            <>
              <span className="text-white/15">·</span>
              <div className="flex items-center gap-1">
                <Star size={10} className="star-filled" fill="currentColor" />
                <span className="text-[10px] font-medium text-white/50">{product.rating}</span>
              </div>
            </>
          )}
        </div>
        <h3 className="mt-1.5 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-white">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-neon-cyan">${product.price}</p>
            {product.originalPrice && (
              <p className="text-xs text-white/30 line-through">${product.originalPrice}</p>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-neon-purple/30 bg-neon-purple/10 text-neon-purple transition-all hover:bg-neon-purple/20 hover:shadow-purple"
          >
            <ShoppingCart size={15} />
          </motion.button>
        </div>
      </div>

      {/* Hover glow border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-neon-purple/30 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.article>
  );
}
