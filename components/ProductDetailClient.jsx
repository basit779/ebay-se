"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Star, Shield, Truck, RotateCcw, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import AnimatedBackground from "@/components/AnimatedBackground";

const tabs = ["Details", "Features", "Reviews"];

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState("Details");
  const [quantity, setQuantity] = useState(1);

  const wishlisted = isWishlisted(product.id);
  const images = product.images || [product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    addToast(`${product.name} added to cart`, "success");
  };

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-12 md:px-8">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  src={images[selectedImage]}
                  alt={product.name}
                  className="h-[480px] w-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                      selectedImage === i
                        ? "border-neon-cyan shadow-glow"
                        : "border-white/[0.06] opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {/* Badge & Category */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                {product.category}
              </span>
              {product.badge && (
                <span className="rounded-full bg-neon-purple/20 px-3 py-0.5 text-[10px] font-bold uppercase text-neon-purple">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="mt-3 text-3xl font-bold md:text-4xl">{product.name}</h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= Math.round(product.rating) ? "star-filled" : "text-white/15"}
                    fill={star <= Math.round(product.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-sm text-white/50">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-4xl font-bold text-neon-cyan">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-white/30 line-through">${product.originalPrice}</span>
                  <span className="rounded-full bg-neon-rose/20 px-3 py-1 text-xs font-bold text-neon-rose">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-white/50">{product.description}</p>

            {/* Color selector */}
            {product.colors && product.colors.length > 1 && (
              <div className="mt-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">Color</p>
                <div className="flex gap-3">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`h-9 w-9 rounded-full border-2 transition-all ${
                        selectedColor === i
                          ? "border-neon-cyan scale-110 shadow-glow"
                          : "border-white/10 hover:border-white/30"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="mt-8 flex gap-3">
              <div className="flex items-center rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-white/50 transition hover:text-white"
                >
                  -
                </button>
                <span className="min-w-[40px] text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-white/50 transition hover:text-white"
                >
                  +
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="btn-glow flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3 font-semibold text-black transition-all hover:shadow-glow-lg"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  toggle(product.id);
                  addToast(wishlisted ? "Removed from wishlist" : "Added to wishlist", "success");
                }}
                className={`flex h-[50px] w-[50px] items-center justify-center rounded-xl border transition-all ${
                  wishlisted
                    ? "border-neon-rose/40 bg-neon-rose/15 text-neon-rose"
                    : "border-white/[0.08] bg-white/[0.02] text-white/50 hover:text-neon-rose"
                }`}
              >
                <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
                { icon: Shield, label: "2-Year Warranty", sub: "Full coverage" },
                { icon: RotateCcw, label: "30-Day Returns", sub: "No questions" }
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                  <Icon size={18} className="mx-auto text-neon-cyan" />
                  <p className="mt-1.5 text-xs font-medium">{label}</p>
                  <p className="text-[10px] text-white/30">{sub}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-8 border-t border-white/[0.06] pt-6">
              <div className="flex gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "bg-neon-cyan/10 text-neon-cyan"
                        : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                {activeTab === "Details" && (
                  <p className="text-sm leading-relaxed text-white/50">{product.description}</p>
                )}
                {activeTab === "Features" && (
                  <ul className="space-y-2">
                    {(product.features || []).map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-white/60">
                        <Check size={14} className="text-neon-emerald" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === "Reviews" && (
                  <p className="text-sm text-white/40">
                    {product.reviewCount} reviews · {product.rating} average rating.
                    Sign in to leave a review.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
