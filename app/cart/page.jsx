"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Shield } from "lucide-react";
import { useCart } from "@/context/CartContext";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function CartPage() {
  const { cartItems, incrementQuantity, removeFromCart, total, itemCount } = useCart();

  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-24 md:px-8 md:py-32">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/80">
            Your Selection
          </p>
          <h1 className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
            The <span className="italic text-champagne-300">cart.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-white/55">
            {itemCount > 0
              ? `${itemCount} object${itemCount !== 1 ? "s" : ""} awaiting checkout. Review and complete when ready.`
              : "No objects selected. Browse the marketplace to begin."}
          </p>
        </motion.div>

        <div className="champagne-rule my-16" />

        <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:gap-20">
          {/* Items */}
          <div className="space-y-8">
            <AnimatePresence>
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.02] py-24 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
                    <ShoppingBag size={22} className="text-white/20" />
                  </div>
                  <p className="mt-6 font-serif text-2xl font-semibold text-white/70">Nothing here yet</p>
                  <p className="mt-3 text-[13px] text-white/35">Discover something extraordinary.</p>
                  <Link href="/shop" className="btn-luxe shine-sweep mt-10">
                    Browse Marketplace <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group grid grid-cols-1 gap-6 border-b border-white/[0.06] pb-10 sm:grid-cols-[180px_1fr_auto]"
                  >
                    <Link
                      href={`/product/${item.id}`}
                      className="relative block h-44 w-full overflow-hidden rounded-2xl bg-zinc-50 sm:w-44"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        loading="lazy"
                        sizes="(min-width: 640px) 176px, 100vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    </Link>

                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-champagne-400/80">
                          {item.category}
                        </p>
                        <Link
                          href={`/product/${item.id}`}
                          className="mt-2 block font-serif text-2xl font-semibold tracking-tight text-white transition-colors duration-500 hover:text-champagne-200"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-2 font-mono text-sm text-white/40">
                          ${item.price} &middot; per unit
                        </p>
                      </div>

                      <div className="mt-5 flex items-center gap-5">
                        <div className="flex items-center rounded-full border border-white/10 bg-white/[0.02]">
                          <button
                            onClick={() => incrementQuantity(item.id, -1)}
                            className="px-4 py-2 text-white/45 transition-colors duration-500 hover:text-champagne-200"
                            aria-label="Decrease"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="min-w-[32px] text-center font-mono text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => incrementQuantity(item.id, 1)}
                            className="px-4 py-2 text-white/45 transition-colors duration-500 hover:text-champagne-200"
                            aria-label="Increase"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-white/30 transition-colors duration-500 hover:text-rose-300"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <p className="font-mono text-3xl font-bold tracking-tight text-white md:text-4xl">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Summary */}
          {cartItems.length > 0 && (
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="h-fit lg:sticky lg:top-28"
            >
              <div className="rounded-3xl border border-white/10 bg-surface/70 p-10 backdrop-blur-[20px]">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/80">
                  Order Summary
                </p>

                <div className="mt-10 space-y-5">
                  <Row label={`Subtotal · ${itemCount} item${itemCount !== 1 ? "s" : ""}`} value={`$${total.toFixed(2)}`} />
                  <Row label="Shipping" value="Complimentary" valueClass="text-champagne-300" />
                  <Row label="Duties & tax" value="At checkout" valueClass="text-white/40" />
                </div>

                <div className="champagne-rule my-10" />

                {/* The Total — most prominent element */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
                    Total
                  </p>
                  <p className="mt-3 font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                    ${total.toFixed(2)}
                  </p>
                </div>

                <Link
                  href="/checkout"
                  className="btn-luxe shine-sweep mt-10 w-full"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </Link>

                <div className="mt-6 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/30">
                  <Shield size={12} /> Buyer protection included
                </div>
              </div>
            </motion.aside>
          )}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, valueClass = "text-white/80" }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-white/50">{label}</span>
      <span className={`font-mono text-sm ${valueClass}`}>{value}</span>
    </div>
  );
}
