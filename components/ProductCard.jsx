"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, Eye, Gavel, TrendingUp } from "lucide-react";
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
  Auction: "from-red-500 to-rose-600"
};

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();

  const isAuction = product.auction;
  const wishlisted = isWishlisted(product.id);

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)]">
        {/* Image */}
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative h-64 overflow-hidden">
            <ProductImage
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Badge */}
            {product.badge && (
              <div className="absolute left-3 top-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${badgeColors[product.badge] || badgeColors.New} px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg`}
                >
                  {product.badge === "Auction" && <Gavel size={10} />}
                  {product.badge === "Hot" && <TrendingUp size={10} />}
                  {product.badge}
                </span>
              </div>
            )}

            {/* Quick actions — CSS-only, no JS */}
            <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <button
                onClick={handleWishlist}
                className={`flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-md transition-colors ${
                  wishlisted
                    ? "bg-pink-500/90 text-white"
                    : "border border-white/20 bg-black/50 text-white/90 hover:bg-pink-500/90"
                }`}
              >
                <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
              </button>
              <Link
                href={`/product/${product.id}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-black/50 text-white/90 backdrop-blur-md transition-colors hover:bg-cyan-500/90"
              >
                <Eye size={14} />
              </Link>
            </div>

            {/* Bottom tag */}
            <div className="absolute bottom-3 left-3">
              {isAuction ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/90 px-2.5 py-1 text-[10px] font-bold text-white">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  {product.bidCount} BIDS
                </span>
              ) : product.originalPrice ? (
                <span className="rounded-full bg-rose-500/90 px-2.5 py-1 text-[10px] font-bold text-white">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              ) : null}
            </div>
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
          <h3 className="mt-1.5 text-sm font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-white">
            {product.name}
          </h3>

          <div className="mt-3 flex items-center justify-between">
            {isAuction ? (
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-rose-400">
                  Current Bid
                </p>
                <p className="text-lg font-bold text-white">
                  ${product.currentBid.toLocaleString()}
                </p>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <p className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-lg font-bold text-transparent">
                  ${product.price}
                </p>
                {product.originalPrice && (
                  <p className="text-xs text-white/25 line-through">${product.originalPrice}</p>
                )}
              </div>
            )}

            {isAuction ? (
              <Link
                href={`/product/${product.id}`}
                className="flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-3 text-xs font-semibold text-white shadow-lg shadow-rose-500/30 transition-transform hover:scale-105"
              >
                <Gavel size={13} /> Bid
              </Link>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-transform active:scale-90 hover:scale-105"
              >
                <ShoppingCart size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
