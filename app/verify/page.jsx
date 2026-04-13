"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, Mail, Loader2, CheckCircle2 } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { isValidEmail } from "@/lib/validation";

function VerifyInner() {
  const params = useSearchParams();
  const status = params.get("status") || "invalid";
  const initialEmail = params.get("email") || "";
  const [email, setEmail] = useState(initialEmail);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resendVerification } = useAuth();
  const { addToast } = useToast();

  const handleResend = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      addToast("Enter a valid email", "error");
      return;
    }
    setLoading(true);
    try {
      await resendVerification(email);
      setSent(true);
      addToast("Verification email sent", "success");
    } catch (err) {
      addToast(err.message || "Failed to resend", "error");
    } finally {
      setLoading(false);
    }
  };

  const title = status === "expired" ? "Link expired" : "Invalid verification link";
  const message =
    status === "expired"
      ? "This verification link has passed its 24-hour window. Enter your email and we'll send you a fresh one."
      : "We couldn't verify that link. It may have already been used, or the URL got mangled. Request a new link below.";

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-20 md:px-8">
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 mx-auto max-w-md"
      >
        <div className="liquid-glass rounded-3xl p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/15">
            {sent ? (
              <CheckCircle2 size={24} className="text-emerald-400" />
            ) : (
              <AlertTriangle size={24} className="text-amber-300" />
            )}
          </div>
          <h1 className="font-display text-3xl font-bold">
            {sent ? "Check your inbox" : title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            {sent
              ? `A fresh verification link is on its way to ${email}.`
              : message}
          </p>

          {!sent && (
            <form onSubmit={handleResend} className="mt-6 space-y-3">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-glow w-full rounded-xl bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/25"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading || !isValidEmail(email)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-3.5 text-sm font-bold text-black disabled:opacity-40"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                Send new link
              </button>
            </form>
          )}

          <Link
            href="/"
            className="mt-6 inline-block text-xs text-white/40 transition hover:text-white/70"
          >
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <VerifyInner />
    </Suspense>
  );
}
