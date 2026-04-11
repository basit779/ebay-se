"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import ProductGrid from "@/components/ProductGrid";
import AnimatedBackground from "@/components/AnimatedBackground";
import products from "@/data/products";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-12 md:px-8">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon-rose">
            Saved
          </p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">Wishlist</h1>
          <p className="mt-2 text-sm text-white/40">
            {wishlistProducts.length > 0
              ? `${wishlistProducts.length} item${wishlistProducts.length !== 1 ? "s" : ""} you love`
              : "Save products you like for later"}
          </p>
        </motion.div>

        <div className="mt-10">
          {wishlistProducts.length > 0 ? (
            <ProductGrid products={wishlistProducts} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] py-20 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <Heart size={24} className="text-white/15" />
              </div>
              <p className="mt-4 text-sm font-medium text-white/50">No saved items</p>
              <p className="mt-1 text-xs text-white/25">
                Tap the heart icon on products to save them here
              </p>
              <a
                href="/shop"
                className="mt-6 rounded-full bg-neon-rose/10 px-6 py-2.5 text-sm font-medium text-neon-rose transition hover:bg-neon-rose/20"
              >
                Explore Products
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
