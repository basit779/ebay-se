"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Star,
  Shield,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Minus,
  Plus
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import ProductImage from "@/components/ProductImage";
import BiddingSection from "@/components/BiddingSection";
import ProductGrid from "@/components/ProductGrid";
import { getReviewsForProduct, getRatingBuckets } from "@/lib/reviews";
import { getSpecsForProduct, getSellerForProduct, getHighlightsForProduct } from "@/lib/product-meta";

const tabs = ["Details", "Features", "Specs", "Reviews"];

export default function ProductDetailClient({ product, related = [] }) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Details");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const resetTimer = useRef(null);
  const heroImgRef = useRef(null);
  const [zoom, setZoom] = useState({ x: 50, y: 50, active: false });

  const wishlisted = isWishlisted(product.id);
  const images = product.images || [product.image];
  const isAuction = product.auction;

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleAddToCart = () => {
    if (justAdded) return;
    for (let i = 0; i < quantity; i++) addToCart(product);
    addToast(`${product.name} added to cart`, "success");
    setJustAdded(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setJustAdded(false), 1500);
  };

  const handleMouseMove = (e) => {
    if (!heroImgRef.current) return;
    const r = heroImgRef.current.getBoundingClientRect();
    setZoom({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      active: true
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-16 md:px-8 md:py-24">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-[12px] text-white/45"
        >
          <Link href="/" className="transition-colors duration-300 hover:text-champagne-200">
            Home
          </Link>
          <ChevronRight size={12} className="text-white/25" />
          <Link
            href={isAuction ? "/auctions" : "/shop"}
            className="transition-colors duration-300 hover:text-champagne-200"
          >
            {isAuction ? "Auctions" : "Shop"}
          </Link>
          <ChevronRight size={12} className="text-white/25" />
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="transition-colors duration-300 hover:text-champagne-200"
          >
            {product.category}
          </Link>
          <ChevronRight size={12} className="text-white/25" />
          <span className="truncate text-white/65">{product.name}</span>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              ref={heroImgRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-50"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductImage
                    src={images[selectedImage]}
                    alt={product.name}
                    className="h-[480px] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform: zoom.active ? "scale(1.5)" : "scale(1)",
                      transformOrigin: `${zoom.x}% ${zoom.y}%`
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {images.length > 1 && (
              <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      selectedImage === i
                        ? "border-champagne-400 shadow-[0_0_20px_-4px_rgba(212,175,55,0.5)]"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <ProductImage src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-champagne-400/80">
                {product.category}
              </p>
              {product.badge && (
                <span className="rounded-full bg-gradient-to-r from-champagne-300 to-champagne-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= Math.round(product.rating || 0) ? "star-filled" : "text-white/15"}
                    fill={star <= Math.round(product.rating || 0) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="font-mono text-sm text-white/50">
                {product.rating || "—"}
                {product.reviewCount ? ` · ${product.reviewCount.toLocaleString()} reviews` : ""}
              </span>
            </div>

            {/* Auction or Buy Now */}
            {isAuction ? (
              <div className="mt-8">
                <BiddingSection product={product} />
              </div>
            ) : (
              <>
                {/* Price */}
                <div className="mt-8 flex items-baseline gap-3">
                  <span className="font-mono bg-gradient-to-r from-champagne-100 via-champagne-300 to-champagne-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="font-mono text-lg text-white/30 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="rounded-full border border-champagne-400/30 bg-champagne-400/10 px-3 py-1 font-mono text-[11px] font-bold text-champagne-200">
                        Save ${product.originalPrice - product.price}
                      </span>
                    </>
                  )}
                </div>

                <p className="mt-6 text-[15px] leading-[1.8] text-white/55">{product.description}</p>

                {/* Quantity & Add to Cart */}
                <div className="mt-10 flex gap-3">
                  <div className="flex items-center rounded-full border border-white/10 bg-white/[0.02]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-white/50 transition-colors duration-500 hover:text-champagne-200"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-[40px] text-center font-mono text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 text-white/50 transition-colors duration-500 hover:text-champagne-200"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <motion.button
                    whileTap={justAdded ? undefined : { scale: 0.98 }}
                    onClick={handleAddToCart}
                    className={`btn-luxe shine-sweep flex-1 ${justAdded ? "!bg-none !border !border-champagne-400/60 !bg-champagne-400/10 !text-champagne-100 !shadow-none" : ""}`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {justAdded ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-center gap-2"
                        >
                          <Check size={18} strokeWidth={2.5} />
                          Added to Cart
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingCart size={18} />
                          Add to Cart
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => {
                      toggle(product.id);
                      addToast(wishlisted ? "Removed from wishlist" : "Added to wishlist", "success");
                    }}
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      wishlisted
                        ? "border-rose-400/50 bg-rose-500/15 text-rose-300"
                        : "border-white/10 bg-white/[0.02] text-white/50 hover:border-rose-400/30 hover:text-rose-300"
                    }`}
                    aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
                  </motion.button>
                </div>

                {/* Trust badges */}
                <div className="mt-10 grid grid-cols-3 gap-3">
                  {[
                    { icon: Truck, label: "Insured Shipping", sub: "Free over $50" },
                    { icon: Shield, label: "Buyer Protection", sub: "Full coverage" },
                    { icon: RotateCcw, label: "30-Day Returns", sub: "No questions" }
                  ].map(({ icon: Icon, label, sub }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center"
                    >
                      <Icon size={18} className="mx-auto text-champagne-300" />
                      <p className="mt-2 text-[12px] font-medium">{label}</p>
                      <p className="mt-0.5 text-[10px] text-white/35">{sub}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Tabs */}
            <div className="mt-12 border-t border-white/[0.06] pt-8">
              <div className="flex gap-6 border-b border-white/[0.06]">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative -mb-px pb-3 text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      activeTab === tab
                        ? "text-champagne-200"
                        : "text-white/35 hover:text-white/70"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.span
                        layoutId="tab-underline"
                        className="absolute inset-x-0 -bottom-px h-[2px] rounded bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-600"
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 min-h-[200px]">
                {activeTab === "Details" && <DetailsPanel product={product} />}
                {activeTab === "Features" && <FeaturesPanel product={product} />}
                {activeTab === "Specs" && <SpecsPanel product={product} />}
                {activeTab === "Reviews" && <ReviewsPanel product={product} />}
              </div>

              {/* Seller card (always visible under tabs) */}
              <SellerCard product={product} />
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-32">
            <div className="champagne-rule mb-16" />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/80">
              You may also like
            </p>
            <h2 className="mt-6 font-serif text-4xl font-semibold leading-[0.95] tracking-tight md:text-5xl">
              More in <span className="italic text-champagne-300">{product.category}</span>
            </h2>
            <div className="mt-12">
              <ProductGrid products={related} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function DetailsPanel({ product }) {
  return (
    <div className="space-y-6">
      <p className="text-[14px] leading-[1.8] text-white/65">
        {product.description || "A curated piece from FluxBid's verified sellers, selected for its craftsmanship, provenance, and finish."}
      </p>
      <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:grid-cols-3">
        <InlineFact label="Ships in" value="24–48 hrs" />
        <InlineFact label="Returns" value="30-day free" />
        <InlineFact label="Protection" value="Buyer covered" />
      </div>
      <p className="text-[13px] leading-[1.8] text-white/45">
        Every FluxBid listing is verified for authenticity and condition before it goes live.
        Your order ships fully insured, tracked end-to-end, and backed by our 30-day
        buyer protection.
      </p>
    </div>
  );
}

function FeaturesPanel({ product }) {
  const highlights = getHighlightsForProduct(product);
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {highlights.map((feat) => (
        <li
          key={feat}
          className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white/70"
        >
          <Check size={14} className="shrink-0 text-champagne-300" />
          {feat}
        </li>
      ))}
    </ul>
  );
}

function SpecsPanel({ product }) {
  const specs = getSpecsForProduct(product);
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <dl className="divide-y divide-white/[0.06]">
        {specs.map((s) => (
          <div
            key={s.label}
            className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[180px_1fr] sm:gap-6 sm:py-4"
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
              {s.label}
            </dt>
            <dd className="text-[14px] text-white/80">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function InlineFact({ label, value }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">{label}</p>
      <p className="mt-1 text-[14px] font-medium text-white/85">{value}</p>
    </div>
  );
}

function SellerCard({ product }) {
  const seller = getSellerForProduct(product);
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-champagne-500/[0.04] via-transparent to-white/[0.02] p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-champagne-400/30 bg-champagne-400/10 font-serif text-xl font-semibold text-champagne-200">
            {seller.name[0]}
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-champagne-400/80">
              Sold by
            </p>
            <p className="mt-1 font-serif text-2xl font-semibold tracking-tight text-white">
              {seller.name}
            </p>
            <p className="mt-1 text-[12px] text-white/45">{seller.city} &middot; on FluxBid {seller.years} years</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8">
          <InlineFact label="Rating" value={seller.rating.toFixed(2) + "★"} />
          <InlineFact label="Sales" value={seller.sales} />
          <InlineFact label="Status" value="Verified" />
        </div>
      </div>
    </div>
  );
}

function ReviewsPanel({ product }) {
  const reviews = getReviewsForProduct(product);
  const ratingBuckets = getRatingBuckets(product);
  const avg = (product.rating || 4.8).toFixed(1);
  const count = product.reviewCount || 214;
  return (
    <div className="space-y-10">
      {/* Summary */}
      <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:grid-cols-[auto_1fr] md:gap-12">
        <div>
          <p className="font-mono text-6xl font-bold tracking-tight text-white">{avg}</p>
          <div className="mt-2 flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={14}
                className={s <= Math.round(avg) ? "star-filled" : "text-white/15"}
                fill={s <= Math.round(avg) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
            {count.toLocaleString()} reviews
          </p>
        </div>
        <div className="space-y-2">
          {ratingBuckets.map((b) => (
            <div key={b.star} className="flex items-center gap-3 text-sm">
              <span className="font-mono w-4 text-right text-white/50">{b.star}</span>
              <Star size={11} className="star-filled" fill="currentColor" />
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${b.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-600"
                />
              </div>
              <span className="font-mono w-10 text-right text-[11px] text-white/40">{b.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual reviews */}
      <div className="space-y-8">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name + i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-white/[0.05] pb-8 last:border-0"
          >
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={12}
                  className={s <= r.stars ? "star-filled" : "text-white/15"}
                  fill={s <= r.stars ? "currentColor" : "none"}
                />
              ))}
              <p className="ml-2 font-serif text-lg font-semibold">{r.title}</p>
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
              {r.name} &middot; Verified Buyer &middot; {r.when}
            </p>
            <p className="mt-3 text-[14px] leading-[1.8] text-white/60">{r.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
