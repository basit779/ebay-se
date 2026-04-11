"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login, register } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
        addToast("Welcome back!", "success");
      } else {
        await register(form.name, form.email, form.password);
        addToast("Account created successfully!", "success");
      }
      onClose();
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-md sm:inset-x-auto sm:left-1/2 sm:top-[15%] sm:-translate-x-1/2"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-night/95 p-8 shadow-2xl backdrop-blur-2xl">
              {/* Decorative gradient */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-neon-purple/20 blur-[80px]" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-neon-cyan/20 blur-[80px]" />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-white/30 transition hover:text-white/60"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4">
                  <span className="text-3xl font-extrabold italic">
                    <span style={{color:"#e53238"}}>e</span>
                    <span style={{color:"#0064d2"}}>b</span>
                    <span style={{color:"#f5af02"}}>a</span>
                    <span style={{color:"#86b817"}}>y</span>
                  </span>
                </div>
                <h2 className="text-2xl font-bold">
                  {mode === "login" ? "Welcome back" : "Create account"}
                </h2>
                <p className="mt-1 text-sm text-white/40">
                  {mode === "login"
                    ? "Sign in to your eBay account"
                    : "Join eBay for a premium experience"}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "register" && (
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                    <input
                      type="text"
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="input-glow w-full rounded-xl bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/25"
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="input-glow w-full rounded-xl bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/25"
                  />
                </div>

                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={6}
                    className="input-glow w-full rounded-xl bg-white/[0.03] py-3.5 pl-11 pr-11 text-sm text-white placeholder-white/25"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 transition hover:text-white/50"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue py-3.5 text-sm font-semibold text-black transition-all hover:shadow-glow-lg disabled:opacity-50"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {mode === "login" ? "Sign In" : "Create Account"}
                </button>
              </form>

              {/* Toggle */}
              <p className="mt-6 text-center text-sm text-white/35">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="font-medium text-neon-cyan transition hover:text-neon-cyan/80"
                >
                  {mode === "login" ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
