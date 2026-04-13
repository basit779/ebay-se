"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionTemplate
} from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Gavel,
  Star,
  Clock,
  Headphones,
  Watch,
  Shirt,
  Coffee,
  Cpu,
  Home as HomeIcon,
  Package
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import ProductImage from "@/components/ProductImage";

const CATEGORY_ICONS = {
  Audio: Headphones,
  Wearables: Watch,
  Fashion: Shirt,
  Lifestyle: Coffee,
  Tech: Cpu,
  Home: HomeIcon
};

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const reduce = useReducedMotion();

  const cardRef = useRef(null);
  // Raw 0→1 normalised pointer position inside the card
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useTransform(py, [0, 1], [8, -8]);
  const rotateY = useTransform(px, [0, 1], [-8, 8]);
  const springRotateX = useSpring(rotateX, { stiffness: 250, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 250, damping: 22 });

  const glowX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glowBg = useMotionTemplate`radial-gradient(140px at ${glowX} ${glowY}, rgba(251,191,36,0.45), transparent 55%)`;

  const handleMove = (e) => {
    if (reduce || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const isAuction = product.auction;
  const wishlisted = isWishlisted(product.id);
  const CategoryIcon = CATEGORY_ICONS[product.category] || Package;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

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
      wishlisted ? "Removed from wishlist" : "Added to wishlist",
      "success"
    );
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.3),
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: 1200
      }}
      className="group relative aspect-[4/5] w-full cursor-pointer rounded-3xl bg-gradient-to-br from-zinc-950 via-[#0a0807] to-black shadow-2xl shadow-black/60 transition-shadow duration-500 hover:shadow-[0_30px_80px_-15px_rgba(251,191,36,0.35)]"
    >
      {/* Whole-card click link (under the interactive controls) */}
      <Link
        href={`/product/${product.id}`}
        aria-label={product.name}
        className="absolute inset-0 z-10 rounded-3xl"
      />

      {/* Inner frame */}
      <div
        style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
        className="pointer-events-none absolute inset-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] shadow-inner"
      >
        {/* Grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_65%,transparent_100%)]" />

        {/* Cursor-following gold glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glowBg }}
        />

        {/* Product image — escapes bottom-right, lifts on hover */}
        <motion.div
          style={{ z: 60 }}
          className="pointer-events-none absolute -bottom-4 -right-4 h-40 w-40 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1 group-hover:-translate-y-2 sm:h-44 sm:w-44"
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-zinc-900 via-black to-zinc-950"
            style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.6))" }}
          >
            {/* The photo, tamed to match the dark card */}
            <ProductImage
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ filter: "brightness(0.88) contrast(1.08) saturate(1.08)" }}
            />
            {/* Blend whites into the card via a dark vignette + amber inner glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 40%, transparent 40%, rgba(0,0,0,0.55) 100%)"
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{
                background:
                  "radial-gradient(80% 60% at 30% 30%, rgba(251,191,36,0.22), transparent 70%)"
              }}
            />
            {/* Subtle inner ring for a premium 'tile' feel */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
          </div>
        </motion.div>

        {/* Content layer */}
        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          {/* Top row: category chip + wishlist */}
          <div className="flex items-start justify-between">
            <div
              style={{ transform: "translateZ(30px)" }}
              className="pointer-events-none inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/[0.06] px-3 py-1.5 backdrop-blur-sm"
            >
              <CategoryIcon size={13} className="text-amber-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200">
                {product.category}
              </span>
            </div>

            <button
              onClick={handleWishlist}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={`pointer-events-auto relative z-20 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-colors ${
                wishlisted
                  ? "border-rose-300/40 bg-rose-500/95 text-white shadow-lg shadow-rose-500/30"
                  : "border-white/20 bg-black/40 text-white hover:bg-white/15"
              }`}
            >
              <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Bottom block: name + desc + price + CTA */}
          <div className="max-w-[68%]" style={{ transform: "translateZ(40px)" }}>
            {/* Meta row */}
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              {product.badge && (
                <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black">
                  {product.badge}
                </span>
              )}
              {product.rating && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-white/55">
                  <Star size={10} className="star-filled" fill="currentColor" />
                  {product.rating}
                </span>
              )}
              {isAuction && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400">
                  <Clock size={10} /> {product.bidCount} bids
                </span>
              )}
              {!isAuction && discount > 0 && (
                <span className="rounded-full bg-rose-500/90 px-1.5 py-0.5 text-[9px] font-bold text-white">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-display text-[1.35rem] font-bold leading-[1.1] tracking-tight text-white line-clamp-2">
              {product.name}
            </h3>

            {/* Short description */}
            {product.description && (
              <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-white/40">
                {product.description}
              </p>
            )}

            {/* Price + CTA */}
            <div className="mt-4 flex items-end justify-between gap-3">
              <div className="min-w-0">
                {isAuction ? (
                  <>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-amber-400/75">
                      Current Bid
                    </p>
                    <p className="font-display truncate text-2xl font-bold leading-none">
                      <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                        ${product.currentBid?.toLocaleString()}
                      </span>
                    </p>
                  </>
                ) : (
                  <div className="flex items-baseline gap-2">
                    {product.originalPrice && (
                      <span className="text-[11px] text-white/30 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                    <p className="font-display text-2xl font-bold leading-none">
                      <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                        ${product.price}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* CTA — auction gets full pill, buy-now gets circular */}
              <div className="pointer-events-auto relative z-20 shrink-0">
                {isAuction ? (
                  <Link
                    href={`/product/${product.id}`}
                    className="flex h-10 items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 text-xs font-bold text-black shadow-[0_6px_24px_-6px_rgba(251,191,36,0.7)] transition-transform hover:scale-105 active:scale-95"
                  >
                    <Gavel size={12} /> Bid
                  </Link>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    aria-label="Add to cart"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-black shadow-[0_6px_24px_-6px_rgba(251,191,36,0.7)] transition-transform hover:scale-110 active:scale-95"
                  >
                    <ShoppingCart size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </motion.article>
  );
}
