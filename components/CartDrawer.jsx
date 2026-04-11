"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, total, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/[0.06] bg-night/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-neon-cyan" />
                <h3 className="text-lg font-semibold">Your Cart</h3>
                {itemCount > 0 && (
                  <span className="rounded-full bg-neon-purple/20 px-2.5 py-0.5 text-xs font-medium text-neon-purple">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-white/50 transition hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                    <ShoppingBag size={24} className="text-white/20" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-white/50">Your cart is empty</p>
                  <p className="mt-1 text-xs text-white/25">Add products to get started</p>
                  <Link
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 rounded-full bg-neon-cyan/10 px-6 py-2.5 text-sm font-medium text-neon-cyan transition hover:bg-neon-cyan/20"
                  >
                    Browse Shop
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 80, transition: { duration: 0.2 } }}
                        className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:border-white/[0.1]"
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium">{item.name}</p>
                            <p className="mt-0.5 text-sm font-semibold text-neon-cyan">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <div className="flex items-center rounded-lg border border-white/[0.08] bg-white/[0.02]">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-2 py-1 text-white/40 transition hover:text-white"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="min-w-[28px] text-center text-xs font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-2 py-1 text-white/40 transition hover:text-white"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-white/20 transition hover:bg-red-500/10 hover:text-red-400"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-white/[0.06] px-6 py-5">
                <div className="mb-1 flex items-center justify-between text-sm text-white/50">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="mb-4 flex items-center justify-between text-sm text-white/50">
                  <span>Shipping</span>
                  <span className="text-neon-emerald">Free</span>
                </div>
                <div className="mb-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-neon-cyan">${total.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-glow block rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue py-3.5 text-center text-sm font-semibold text-black transition-all hover:shadow-glow-lg"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 block rounded-xl border border-white/[0.08] py-3 text-center text-sm text-white/50 transition hover:border-white/20 hover:text-white/80"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
