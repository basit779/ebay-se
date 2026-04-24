"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, ShoppingBag, Store } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { isValidEmail } from "@/lib/validation";

export default function AuthModal({ isOpen, onClose, defaultAccountType = "buyer" }) {
  const [mode, setMode] = useState("login"); // "login" | "register" | "verify-sent"
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [accountType, setAccountType] = useState(defaultAccountType);
  const [touched, setTouched] = useState({});
  const [sentTo, setSentTo] = useState("");
  useEffect(() => {
    if (isOpen && defaultAccountType === "seller") {
      setAccountType("seller");
      setMode("register");
    }
  }, [isOpen, defaultAccountType]);
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
        const result = await register(form.name, form.email, form.password, accountType);
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
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[8%] z-50 mx-auto max-w-md sm:inset-x-auto sm:left-1/2 sm:top-[12%] sm:-translate-x-1/2"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-night/95 p-8 shadow-2xl backdrop-blur-2xl">
              {/* Decorative gold glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-400/25 blur-[90px]" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-orange-500/20 blur-[90px]" />

              <button
                onClick={closeAndReset}
                aria-label="Close sign-in"
                className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-lg text-white/30 transition hover:text-white/60"
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
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
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
                  {/* OAuth */}
                  <div className="relative mb-5 space-y-2.5">
                    <a
                      href={`/api/auth/google?next=${encodeURIComponent("/account")}`}
                      className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 text-sm font-medium text-white/85 transition hover:border-white/15 hover:bg-white/[0.06]"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continue with Google
                    </a>
                    <a
                      href={`/api/auth/github?next=${encodeURIComponent("/account")}`}
                      className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 text-sm font-medium text-white/85 transition hover:border-amber-300/30 hover:bg-white/[0.06]"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      Continue with GitHub
                    </a>
                  </div>

                  <div className="relative mb-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">or</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="relative space-y-4">
                    {mode === "register" && (
                      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1.5">
                        {[
                          { key: "buyer", label: "Buyer", sub: "Shop & bid", Icon: ShoppingBag },
                          { key: "seller", label: "Seller", sub: "List products", Icon: Store }
                        ].map(({ key, label, sub, Icon }) => {
                          const active = accountType === key;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setAccountType(key)}
                              className={`flex flex-col items-start gap-0.5 rounded-xl px-3 py-2.5 text-left transition ${
                                active
                                  ? "bg-gradient-to-br from-amber-400/20 to-orange-500/10 text-white ring-1 ring-amber-300/40"
                                  : "text-white/55 hover:bg-white/[0.03] hover:text-white"
                              }`}
                            >
                              <span className="flex items-center gap-1.5 text-xs font-semibold">
                                <Icon size={12} /> {label}
                              </span>
                              <span className="text-[10px] text-white/40">{sub}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
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
