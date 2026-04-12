"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 20 });

  // Parallax image
  const imageX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  const imageY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  // Glow spotlight
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const isAuction = product.auction;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
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

  const wishlisted = isWishlisted(product.id);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200
      }}
      className="group relative"
    >
      {/* Animated gradient border on hover */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-[1px] rounded-[18px] opacity-0"
        style={{
          background: isAuction
            ? "conic-gradient(from var(--angle, 0deg), rgba(244,63,94,0.4), rgba(251,113,133,0.4), rgba(244,63,94,0.4))"
            : "conic-gradient(from var(--angle, 0deg), rgba(34,211,238,0.5), rgba(168,85,247,0.5), rgba(59,130,246,0.5), rgba(34,211,238,0.5))",
          animation: "border-rotate 4s linear infinite"
        }}
      />

      <div className="relative overflow-hidden rounded-[17px] border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-sm">
        {/* Spotlight glow following cursor */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(300px circle at ${x} ${y}, ${
                  isAuction ? "rgba(244,63,94,0.12)" : "rgba(34,211,238,0.12)"
                }, transparent 40%)`
            )
          }}
        />

        {/* Image */}
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative h-64 overflow-hidden" style={{ transform: "translateZ(20px)" }}>
            <motion.div
              style={{ x: imageX, y: imageY, scale: 1.1 }}
              className="absolute inset-0"
            >
              <ProductImage
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Shimmer sweep on hover */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "200%" : "-100%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{ transform: "skewX(-20deg)" }}
            />

            {/* Badge */}
            {product.badge && (
              <div
                className="absolute left-3 top-3"
                style={{ transform: "translateZ(30px)" }}
              >
                <span
                  className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${badgeColors[product.badge] || badgeColors.New} px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-black/50`}
                >
                  {product.badge === "Auction" && <Gavel size={10} />}
                  {product.badge === "Hot" && <TrendingUp size={10} />}
                  {product.badge}
                </span>
              </div>
            )}

            {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -8 }}
              transition={{ duration: 0.3 }}
              className="absolute right-3 top-3 flex flex-col gap-2"
              style={{ transform: "translateZ(30px)" }}
            >
              <button
                onClick={handleWishlist}
                className={`flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-md transition-all ${
                  wishlisted
                    ? "bg-pink-500/90 text-white"
                    : "border border-white/20 bg-black/50 text-white/90 hover:bg-pink-500/90"
                }`}
              >
                <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
              </button>
              <Link
                href={`/product/${product.id}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-black/50 text-white/90 backdrop-blur-md transition-all hover:bg-cyan-500/90 hover:text-white"
              >
                <Eye size={14} />
              </Link>
            </motion.div>

            {/* Sale or bid indicator */}
            <div
              className="absolute bottom-3 left-3"
              style={{ transform: "translateZ(30px)" }}
            >
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
        <div className="p-4" style={{ transform: "translateZ(15px)" }}>
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
                <span className="text-[10px] text-white/20">({product.reviewCount})</span>
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
                className="flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-3 text-xs font-semibold text-white shadow-lg shadow-rose-500/30 transition-all hover:shadow-xl hover:shadow-rose-500/50"
              >
                <Gavel size={13} /> Bid Now
              </Link>
            ) : (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
              >
                <ShoppingCart size={15} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
