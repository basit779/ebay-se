"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Store, Sparkles, Gavel, ArrowRight, Loader2, ShieldCheck, Coins } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import AuthModal from "@/components/AuthModal";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function SellLanding() {
  const { user, loading, upgradeToSeller } = useAuth();
  const router = useRouter();
  const { addToast } = useToast();
  const [authOpen, setAuthOpen] = useState(false);
  const [upgrading, setUpgrading] = useState(false);

  const onUpgrade = async () => {
    setUpgrading(true);
    try {
      await upgradeToSeller({ storeName: user.name });
      addToast("You're now a seller", "success");
      router.push("/sell/dashboard");
    } catch (err) {
      addToast(err.message || "Upgrade failed", "error");
    } finally {
      setUpgrading(false);
    }
  };

  const Cta = () => {
    if (loading) {
      return <Loader2 size={20} className="animate-spin text-white/40" />;
    }
    if (!user) {
      return (
        <button
          onClick={() => setAuthOpen(true)}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-3.5 text-sm font-bold text-black shadow-[0_10px_40px_-10px_rgba(251,191,36,0.6)]"
        >
          Create seller account
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      );
    }
    if (user.accountType === "seller") {
      return (
        <Link
          href="/sell/dashboard"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-3.5 text-sm font-bold text-black shadow-[0_10px_40px_-10px_rgba(251,191,36,0.6)]"
        >
          Open seller dashboard
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      );
    }
    return (
      <button
        onClick={onUpgrade}
        disabled={upgrading}
        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-3.5 text-sm font-bold text-black shadow-[0_10px_40px_-10px_rgba(251,191,36,0.6)] disabled:opacity-50"
      >
        {upgrading && <Loader2 size={14} className="animate-spin" />}
        Upgrade to seller account
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </button>
    );
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-white/70">
            <Store size={12} className="text-amber-300" /> Seller program
          </span>
          <h1 className="mt-6 text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl">
            <span className="text-luxe">Turn your</span><br />
            <span className="font-display-italic bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">closet into cash.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/55">
            List products and live auctions on FluxBid in minutes. Buyers worldwide,
            zero listing fees during launch, instant publish.
          </p>
          <div className="mt-10 flex justify-center">
            <Cta />
          </div>
        </motion.div>

        <div className="mt-20 grid gap-5 sm:grid-cols-3">
          {[
            { Icon: Sparkles, title: "Instant publish", body: "List in under 60 seconds — name, price, photo, done." },
            { Icon: Gavel, title: "Auctions or buy-now", body: "Toggle auction mode with starting bid and end date." },
            { Icon: ShieldCheck, title: "Owner-only edits", body: "Your listings, your control. JWT-protected end to end." }
          ].map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="liquid-glass rounded-2xl p-6"
            >
              <Icon size={20} className="text-amber-300" />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-white/50">{body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-2 text-xs text-white/30">
          <Coins size={12} />
          0% listing fees during early access
        </div>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultAccountType="seller" />
    </section>
  );
}
