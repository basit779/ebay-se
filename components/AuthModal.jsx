"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { isValidEmail } from "@/lib/validation";

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login"); // "login" | "register" | "verify-sent"
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [sentTo, setSentTo] = useState("");
  const { login, register, resendVerification } = useAuth();
  const { addToast } = useToast();

  const emailError =
    touched.email && form.email && !isValidEmail(form.email)
      ? "Enter a valid email address"
      : "";
  const passwordError =
    touched.password && form.password.length > 0 && form.password.length < 6
      ? "Password must be at least 6 characters"
      : "";
  const nameError =
    mode === "register" && touched.name && !form.name.trim() ? "Name is required" : "";

  const canSubmit =
    form.email &&
    form.password &&
    isValidEmail(form.email) &&
    form.password.length >= 6 &&
    (mode === "login" || form.name.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (!canSubmit) return;
    setLoading(true);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
        addToast("Welcome back!", "success");
        onClose();
        setForm({ name: "", email: "", password: "" });
      } else {
        const result = await register(form.name, form.email, form.password);
        if (result?.requiresVerification) {
          setSentTo(result.email);
          setMode("verify-sent");
        } else {
          addToast("Account created", "success");
          onClose();
          setForm({ name: "", email: "", password: "" });
        }
      }
    } catch (err) {
      addToast(err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await resendVerification(sentTo);
      addToast("Verification email re-sent", "success");
    } catch (err) {
      addToast(err.message || "Please try again in a moment", "error");
    } finally {
      setResending(false);
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", password: "" });
    setTouched({});
    setSentTo("");
    setMode("login");
  };

  const closeAndReset = () => {
    onClose();
    setTimeout(reset, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAndReset}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-x-4 top-[8%] z-50 mx-auto max-w-md sm:inset-x-auto sm:left-1/2 sm:top-[12%] sm:-translate-x-1/2"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-night/95 p-8 shadow-2xl backdrop-blur-2xl">
              {/* Decorative gold glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-400/25 blur-[90px]" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-orange-500/20 blur-[90px]" />

              <button
                onClick={closeAndReset}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-white/30 transition hover:text-white/60"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="relative mb-7 text-center">
                <div className="mx-auto mb-4">
                  <span className="text-3xl font-black tracking-tighter">
                    <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">Flux</span>
                    <span className="text-white">Bid</span>
                  </span>
                </div>
                {mode === "verify-sent" ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                      className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/15"
                    >
                      <Mail size={24} className="text-amber-300" />
                    </motion.div>
                    <h2 className="font-display text-2xl font-bold">Check your inbox</h2>
                    <p className="mt-2 px-2 text-sm leading-relaxed text-white/50">
                      We sent a verification link to{" "}
                      <span className="font-semibold text-amber-200">{sentTo}</span>.
                      Click it within 24 hours to activate your account.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-2xl font-bold">
                      {mode === "login" ? "Welcome back" : "Create account"}
                    </h2>
                    <p className="mt-1 text-sm text-white/40">
                      {mode === "login"
                        ? "Sign in to your FluxBid account"
                        : "Join FluxBid for a premium experience"}
                    </p>
                  </>
                )}
              </div>

              {/* Verify-sent state */}
              {mode === "verify-sent" ? (
                <div className="relative space-y-3">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400/25 bg-amber-400/10 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-400/15 disabled:opacity-50"
                  >
                    {resending && <Loader2 size={14} className="animate-spin" />}
                    Resend email
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="w-full rounded-xl border border-white/[0.06] py-3 text-sm text-white/60 transition hover:text-white"
                  >
                    Back to sign in
                  </button>
                  <p className="pt-2 text-center text-[11px] leading-relaxed text-white/30">
                    Didn't get it? Check spam, or make sure the email is correct and resend.
                  </p>
                </div>
              ) : (
                <>
                  {/* Form */}
                  <form onSubmit={handleSubmit} className="relative space-y-4">
                    {mode === "register" && (
                      <div>
                        <div className="relative">
                          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                          <input
                            type="text"
                            placeholder="Full name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                            required
                            className={`input-glow w-full rounded-xl bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/25 ${
                              nameError ? "border border-rose-500/50" : ""
                            }`}
                          />
                        </div>
                        {nameError && <InlineErr>{nameError}</InlineErr>}
                      </div>
                    )}

                    <div>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                        <input
                          type="email"
                          placeholder="Email address"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                          required
                          className={`input-glow w-full rounded-xl bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/25 ${
                            emailError ? "border border-rose-500/50" : ""
                          }`}
                        />
                        {touched.email && form.email && isValidEmail(form.email) && (
                          <CheckCircle2 size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400" />
                        )}
                      </div>
                      {emailError && <InlineErr>{emailError}</InlineErr>}
                    </div>

                    <div>
                      <div className="relative">
                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                          required
                          minLength={6}
                          className={`input-glow w-full rounded-xl bg-white/[0.03] py-3.5 pl-11 pr-11 text-sm text-white placeholder-white/25 ${
                            passwordError ? "border border-rose-500/50" : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 transition hover:text-white/50"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {passwordError && <InlineErr>{passwordError}</InlineErr>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !canSubmit}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-3.5 text-sm font-bold text-black shadow-[0_10px_40px_-10px_rgba(251,191,36,0.5)] transition-all hover:shadow-[0_15px_60px_-5px_rgba(251,191,36,0.6)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {loading && <Loader2 size={16} className="animate-spin" />}
                      {mode === "login" ? "Sign In" : "Create Account"}
                    </button>
                  </form>

                  <p className="relative mt-6 text-center text-sm text-white/35">
                    {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                      onClick={() => {
                        setMode(mode === "login" ? "register" : "login");
                        setTouched({});
                      }}
                      className="font-medium text-amber-300 transition hover:text-amber-200"
                    >
                      {mode === "login" ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InlineErr({ children }) {
  return (
    <p className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-400">
      <AlertCircle size={11} />
      {children}
    </p>
  );
}
