"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function CartPage() {
  const { cartItems, incrementQuantity, removeFromCart, total, itemCount } = useCart();

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-12 md:px-8">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon-cyan">
            Shopping
          </p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">Your Cart</h1>
          <p className="mt-2 text-sm text-white/40">
            {itemCount > 0
              ? `${itemCount} item${itemCount !== 1 ? "s" : ""} ready to ship`
              : "Your cart is empty"}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Items */}
          <div className="space-y-3">
            <AnimatePresence>
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] py-20 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                    <ShoppingBag size={24} className="text-white/15" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-white/50">Nothing here yet</p>
                  <p className="mt-1 text-xs text-white/25">Discover something you love</p>
                  <Link
                    href="/shop"
                    className="mt-6 flex items-center gap-2 rounded-full bg-neon-cyan/10 px-6 py-2.5 text-sm font-medium text-neon-cyan transition hover:bg-neon-cyan/20"
                  >
                    Browse Shop <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                    className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12]"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <Link href={`/product/${item.id}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-28 w-full rounded-xl object-cover transition-transform hover:scale-[1.02] sm:w-28"
                        />
                      </Link>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link href={`/product/${item.id}`} className="hover-underline text-base font-semibold">
                              {item.name}
                            </Link>
                            <p className="mt-0.5 text-xs text-white/30">{item.category}</p>
                          </div>
                          <p className="text-lg font-bold text-neon-cyan">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex items-center rounded-xl border border-white/[0.08] bg-white/[0.02]">
                            <button
                              onClick={() => incrementQuantity(item.id, -1)}
                              className="px-3 py-2 text-white/40 transition hover:text-white"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-[36px] text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => incrementQuantity(item.id, 1)}
                              className="px-3 py-2 text-white/40 transition hover:text-white"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <span className="text-xs text-white/20">${item.price} each</span>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-white/25 transition hover:bg-red-500/10 hover:text-red-400"
                          >
                            <Trash2 size={13} /> Remove
                          </button>
                        </div>
                      </div>
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
              transition={{ delay: 0.2 }}
              className="h-fit rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm lg:sticky lg:top-24"
            >
              <h2 className="text-lg font-semibold">Order Summary</h2>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-sm text-white/50">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-white/50">
                  <span>Shipping</span>
                  <span className="font-medium text-neon-emerald">Free</span>
                </div>
                <div className="flex items-center justify-between text-sm text-white/50">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="mt-5 border-t border-white/[0.06] pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-neon-cyan">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn-glow mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue py-4 text-sm font-semibold text-black transition-all hover:shadow-glow-lg"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/25">
                <Tag size={12} />
                <span>Free shipping on all orders</span>
              </div>
            </motion.aside>
          )}
        </div>
      </div>
    </section>
  );
}
