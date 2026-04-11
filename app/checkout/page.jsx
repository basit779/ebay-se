"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, Truck, Shield, Check, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, total, clearAll } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  });

  const updateField = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (user) {
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartItems,
            total,
            shipping: { name: form.name, address: `${form.address}, ${form.city} ${form.zip}` }
          })
        });
      }

      clearAll();
      addToast("Order placed successfully!", "success");
      setStep(3);
    } catch {
      addToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && step !== 3) {
    return (
      <section className="relative min-h-screen overflow-hidden px-4 py-20 md:px-8">
        <AnimatedBackground />
        <div className="relative z-10 mx-auto max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <CreditCard size={24} className="text-white/15" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Nothing to checkout</h1>
          <p className="mt-2 text-sm text-white/40">Add items to your cart first</p>
          <a
            href="/shop"
            className="mt-6 inline-block rounded-full bg-neon-cyan/10 px-6 py-2.5 text-sm font-medium text-neon-cyan"
          >
            Browse Shop
          </a>
        </div>
      </section>
    );
  }

  // Success
  if (step === 3) {
    return (
      <section className="relative min-h-screen overflow-hidden px-4 py-20 md:px-8">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 mx-auto max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neon-emerald/20"
          >
            <Check size={36} className="text-neon-emerald" />
          </motion.div>
          <h1 className="mt-6 text-3xl font-bold">Order Confirmed!</h1>
          <p className="mt-3 text-sm text-white/40">
            Thanks for your purchase. We'll send you tracking info via email.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <a
              href="/shop"
              className="rounded-xl border border-white/[0.08] px-6 py-3 text-sm font-medium text-white/60 transition hover:text-white"
            >
              Keep Shopping
            </a>
            {user && (
              <a
                href="/account"
                className="rounded-xl bg-neon-cyan/10 px-6 py-3 text-sm font-medium text-neon-cyan transition hover:bg-neon-cyan/20"
              >
                View Orders
              </a>
            )}
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-12 md:px-8">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon-cyan">Secure</p>
          <h1 className="mt-2 text-4xl font-bold">Checkout</h1>
        </motion.div>

        {/* Steps indicator */}
        <div className="mt-8 flex items-center gap-3">
          {["Shipping", "Payment"].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  step > i + 1
                    ? "bg-neon-emerald/20 text-neon-emerald"
                    : step === i + 1
                      ? "bg-neon-cyan/20 text-neon-cyan"
                      : "bg-white/[0.04] text-white/20"
                }`}
              >
                {step > i + 1 ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-sm ${step >= i + 1 ? "text-white/70" : "text-white/20"}`}>
                {label}
              </span>
              {i === 0 && <div className="mx-2 h-px w-12 bg-white/[0.06]" />}
            </div>
          ))}
        </div>

        <form onSubmit={handlePlaceOrder} className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Form Steps */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h3 className="flex items-center gap-2 text-base font-semibold">
                  <Truck size={18} className="text-neon-cyan" /> Shipping Information
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs text-white/35">Full Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      required
                      className="input-glow w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-white/35">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                      className="input-glow w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-white/35">Address</label>
                  <input
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    required
                    className="input-glow w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs text-white/35">City</label>
                    <input
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      required
                      className="input-glow w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-white/35">ZIP Code</label>
                    <input
                      value={form.zip}
                      onChange={(e) => updateField("zip", e.target.value)}
                      required
                      className="input-glow w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-glow mt-2 w-full rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue py-3.5 text-sm font-semibold text-black"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h3 className="flex items-center gap-2 text-base font-semibold">
                  <CreditCard size={18} className="text-neon-cyan" /> Payment Details
                </h3>
                <p className="text-xs text-white/30">
                  This is a demo — no real charges will be made.
                </p>
                <div>
                  <label className="mb-1.5 block text-xs text-white/35">Card Number</label>
                  <input
                    value={form.cardNumber}
                    onChange={(e) => updateField("cardNumber", e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    required
                    className="input-glow w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs text-white/35">Expiry</label>
                    <input
                      value={form.cardExpiry}
                      onChange={(e) => updateField("cardExpiry", e.target.value)}
                      placeholder="MM/YY"
                      required
                      className="input-glow w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-white/35">CVC</label>
                    <input
                      value={form.cardCvc}
                      onChange={(e) => updateField("cardCvc", e.target.value)}
                      placeholder="123"
                      required
                      className="input-glow w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-xl border border-white/[0.08] px-6 py-3 text-sm text-white/50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue py-3.5 text-sm font-semibold text-black disabled:opacity-50"
                  >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    Place Order · ${total.toFixed(2)}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="h-fit rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 lg:sticky lg:top-24">
            <h3 className="text-sm font-semibold">Order Summary</h3>
            <div className="mt-4 space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-medium">{item.name}</p>
                    <p className="text-[10px] text-white/30">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-medium text-white/60">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-white/[0.06] pt-4">
              <div className="flex justify-between text-xs text-white/40">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-white/40">
                <span>Shipping</span>
                <span className="text-neon-emerald">Free</span>
              </div>
              <div className="flex justify-between border-t border-white/[0.06] pt-3 text-sm font-semibold">
                <span>Total</span>
                <span className="text-neon-cyan">${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-neon-emerald/5 px-3 py-2 text-xs text-neon-emerald/70">
              <Shield size={12} />
              <span>SSL Encrypted & Secure</span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
