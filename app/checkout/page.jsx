"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CreditCard,
  Truck,
  Shield,
  Check,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import {
  isValidEmail,
  luhn,
  detectCardBrand,
  isValidExpiry,
  isValidCVC,
  normalizeCardNumber
} from "@/lib/validation";

// ── Formatters ──────────────────────────────────────────────────
function formatCardNumber(v) {
  const digits = normalizeCardNumber(v).slice(0, 19);
  const brand = detectCardBrand(digits);
  // Amex format: 4-6-5
  if (brand === "amex") {
    return digits
      .replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, (_, a, b, c) =>
        [a, b, c].filter(Boolean).join(" ")
      )
      .trim();
  }
  // Default: 4-4-4-4 (and 4-4-4-4-3 for 19-digit cards)
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(v) {
  const digits = String(v || "").replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

const BRAND_COLORS = {
  visa: "text-blue-300",
  mastercard: "text-orange-300",
  amex: "text-cyan-300",
  discover: "text-champagne-400",
  diners: "text-champagne-300",
  jcb: "text-emerald-300",
  unknown: "text-white/30"
};

const BRAND_LABELS = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  discover: "Discover",
  diners: "Diners Club",
  jcb: "JCB",
  unknown: ""
};

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
  const [touched, setTouched] = useState({});

  const brand = useMemo(() => detectCardBrand(form.cardNumber), [form.cardNumber]);

  const errors = useMemo(() => {
    const e = {};
    // Step 1
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!isValidEmail(form.email)) e.email = "Invalid email format";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.zip.trim()) e.zip = "Required";
    else if (!/^[A-Za-z0-9\s-]{3,10}$/.test(form.zip.trim())) e.zip = "Invalid ZIP";

    // Step 2
    if (!form.cardNumber.trim()) e.cardNumber = "Required";
    else if (!luhn(form.cardNumber)) e.cardNumber = "Invalid card number";
    if (!form.cardExpiry.trim()) e.cardExpiry = "Required";
    else if (!isValidExpiry(form.cardExpiry)) e.cardExpiry = "Invalid or expired";
    if (!form.cardCvc.trim()) e.cardCvc = "Required";
    else if (!isValidCVC(form.cardCvc, brand))
      e.cardCvc = brand === "amex" ? "Must be 4 digits" : "Must be 3 digits";
    return e;
  }, [form, brand]);

  const step1Valid = !errors.name && !errors.email && !errors.address && !errors.city && !errors.zip;
  const step2Valid = !errors.cardNumber && !errors.cardExpiry && !errors.cardCvc && step1Valid;

  const updateField = (field, value) => {
    let v = value;
    if (field === "cardNumber") v = formatCardNumber(value);
    else if (field === "cardExpiry") v = formatExpiry(value);
    else if (field === "cardCvc") v = String(value).replace(/\D/g, "").slice(0, 4);
    setForm((f) => ({ ...f, [field]: v }));
  };

  const markTouched = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const showErr = (field) => touched[field] && errors[field];

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    // force-touch every field so errors surface
    setTouched({
      name: true, email: true, address: true, city: true, zip: true,
      cardNumber: true, cardExpiry: true, cardCvc: true
    });
    if (!step2Valid) {
      addToast("Please fix the errors before placing the order", "error");
      return;
    }

    setLoading(true);

    try {
      if (!user) {
        addToast("Please sign in to place an order", "error");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          total,
          shipping: {
            name: form.name,
            address: `${form.address}, ${form.city} ${form.zip}`
          },
          payment: {
            cardNumber: normalizeCardNumber(form.cardNumber),
            expiry: form.cardExpiry,
            cvc: form.cardCvc,
            cardHolder: form.name
          }
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        addToast(data.error || "Order failed", "error");
        return;
      }

      clearAll();
      addToast("Order placed — check your inbox for confirmation", "success");
      setStep(3);
    } catch {
      addToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && step !== 3) {
    return (
      <section className="relative min-h-screen overflow-hidden px-6 py-24 md:px-8 md:py-32">
        <AnimatedBackground />
        <div className="relative z-10 mx-auto max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
            <CreditCard size={22} className="text-white/20" />
          </div>
          <h1 className="mt-8 font-serif text-3xl font-semibold tracking-tight">Nothing to checkout</h1>
          <p className="mt-4 text-sm leading-[1.7] text-white/45">Add an object to your cart to continue.</p>
          <Link href="/shop" className="btn-luxe shine-sweep mt-10">Browse Marketplace</Link>
        </div>
      </section>
    );
  }

  // Success
  if (step === 3) {
    return (
      <section className="relative min-h-screen overflow-hidden px-6 py-24 md:px-8 md:py-32">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-champagne-400/30 bg-champagne-400/10"
          >
            <Check size={32} className="text-champagne-300" />
          </motion.div>
          <p className="mt-10 font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/80">
            Confirmed
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight">
            Order received.
          </h1>
          <p className="mt-5 text-[14px] leading-[1.8] text-white/50">
            Your order is being reviewed. A confirmation email is on its way.
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <Link href="/shop" className="btn-ghost">Keep Shopping</Link>
            {user && <Link href="/account" className="btn-luxe shine-sweep">View Orders</Link>}
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-24 md:px-8 md:py-32">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/80">
            Secure Checkout
          </p>
          <h1 className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
            Complete your <span className="italic text-champagne-300">order.</span>
          </h1>
        </motion.div>

        {/* Steps indicator */}
        <div className="mt-12 flex items-center gap-4">
          {["Shipping", "Payment"].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-bold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  step > i + 1
                    ? "border border-champagne-400/50 bg-champagne-400/10 text-champagne-300"
                    : step === i + 1
                      ? "border border-champagne-400/50 bg-champagne-400/10 text-champagne-200"
                      : "border border-white/10 bg-white/[0.02] text-white/25"
                }`}
              >
                {step > i + 1 ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-[11px] uppercase tracking-[0.25em] ${step >= i + 1 ? "text-white/70" : "text-white/25"}`}>
                {label}
              </span>
              {i === 0 && <div className="mx-2 h-px w-16 bg-white/10" />}
            </div>
          ))}
        </div>

        <div className="champagne-rule my-14" />

        <form onSubmit={handlePlaceOrder} className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          {/* Form Steps */}
          <div className="rounded-3xl border border-white/10 bg-surface/50 p-10 backdrop-blur-[20px]">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="space-y-6">
                <h3 className="flex items-center gap-3 font-serif text-2xl font-semibold tracking-tight">
                  <Truck size={18} className="text-champagne-300" /> Shipping
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Full Name"
                    value={form.name}
                    onChange={(v) => updateField("name", v)}
                    onBlur={() => markTouched("name")}
                    error={showErr("name")}
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(v) => updateField("email", v)}
                    onBlur={() => markTouched("email")}
                    error={showErr("email")}
                  />
                </div>
                <Field
                  label="Address"
                  value={form.address}
                  onChange={(v) => updateField("address", v)}
                  onBlur={() => markTouched("address")}
                  error={showErr("address")}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="City"
                    value={form.city}
                    onChange={(v) => updateField("city", v)}
                    onBlur={() => markTouched("city")}
                    error={showErr("city")}
                  />
                  <Field
                    label="ZIP Code"
                    value={form.zip}
                    onChange={(v) => updateField("zip", v)}
                    onBlur={() => markTouched("zip")}
                    error={showErr("zip")}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTouched((t) => ({
                      ...t, name: true, email: true, address: true, city: true, zip: true
                    }));
                    if (step1Valid) setStep(2);
                  }}
                  disabled={!step1Valid && Object.keys(touched).length > 0}
                  className="btn-luxe shine-sweep mt-4 w-full disabled:opacity-50 disabled:pointer-events-none"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="space-y-6">
                <h3 className="flex items-center gap-3 font-serif text-2xl font-semibold tracking-tight">
                  <CreditCard size={18} className="text-champagne-300" /> Payment
                </h3>
                <p className="text-xs text-white/35">
                  Demo mode — no real charges. Test card: <span className="font-mono text-champagne-300">4242 4242 4242 4242</span>
                </p>

                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">Card Number</label>
                  <div className="relative">
                    <input
                      inputMode="numeric"
                      autoComplete="cc-number"
                      value={form.cardNumber}
                      onChange={(e) => updateField("cardNumber", e.target.value)}
                      onBlur={() => markTouched("cardNumber")}
                      placeholder="4242 4242 4242 4242"
                      className={`luxe-input w-full pr-28 font-mono tracking-wider ${
                        showErr("cardNumber") ? "!border-rose-500/50" : ""
                      }`}
                    />
                    {brand !== "unknown" && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${BRAND_COLORS[brand]}`}
                      >
                        <CreditCard size={11} />
                        {BRAND_LABELS[brand]}
                      </motion.div>
                    )}
                  </div>
                  {showErr("cardNumber") && <ErrorText>{errors.cardNumber}</ErrorText>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">Expiry</label>
                    <input
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      value={form.cardExpiry}
                      onChange={(e) => updateField("cardExpiry", e.target.value)}
                      onBlur={() => markTouched("cardExpiry")}
                      placeholder="MM/YY"
                      className={`luxe-input w-full font-mono tracking-wider ${
                        showErr("cardExpiry") ? "!border-rose-500/50" : ""
                      }`}
                    />
                    {showErr("cardExpiry") && <ErrorText>{errors.cardExpiry}</ErrorText>}
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">CVC</label>
                    <input
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      value={form.cardCvc}
                      onChange={(e) => updateField("cardCvc", e.target.value)}
                      onBlur={() => markTouched("cardCvc")}
                      placeholder={brand === "amex" ? "1234" : "123"}
                      className={`luxe-input w-full font-mono tracking-wider ${
                        showErr("cardCvc") ? "!border-rose-500/50" : ""
                      }`}
                    />
                    {showErr("cardCvc") && <ErrorText>{errors.cardCvc}</ErrorText>}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setStep(1)} className="btn-ghost">
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !step2Valid}
                    className="btn-luxe shine-sweep flex-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    <span>Place Order</span>
                    <span className="font-mono">${total.toFixed(2)}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="h-fit rounded-3xl border border-white/10 bg-surface/70 p-10 backdrop-blur-[20px] lg:sticky lg:top-28">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/80">
              Order Summary
            </p>

            <div className="mt-8 space-y-5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-zinc-50">
                    <Image
                      src={item.image}
                      alt={item.name || ""}
                      fill
                      loading="lazy"
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-white/80">{item.name}</p>
                    <p className="font-mono text-[11px] text-white/35">Qty {item.quantity}</p>
                  </div>
                  <p className="font-mono text-sm text-white/70">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="champagne-rule my-10" />

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Subtotal</span>
                <span className="font-mono text-white/80">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Shipping</span>
                <span className="font-mono text-champagne-300">Complimentary</span>
              </div>
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

            <div className="mt-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/35">
              <Shield size={12} />
              <span>SSL Encrypted &middot; Buyer Protection</span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, onBlur, error, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`luxe-input w-full ${error ? "!border-rose-500/50" : ""}`}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }) {
  return (
    <p className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-400">
      <AlertCircle size={11} />
      {children}
    </p>
  );
}
