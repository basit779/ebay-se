"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Store, Sparkles, Gavel, ArrowRight, Loader2, ShieldCheck, Coins,
  Zap, BarChart3, ImageIcon, Lock, Camera, Rocket, CircleCheck,
  Star, TrendingUp, ChevronDown, Package
} from "lucide-react";
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
  const [price, setPrice] = useState(250);
  const [openFaq, setOpenFaq] = useState(0);

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

  const primaryCta = (() => {
    if (loading) return null;
    if (!user) {
      return {
        label: "Create seller account",
        onClick: () => setAuthOpen(true),
        href: null
      };
    }
    if (user.accountType === "seller") {
      return { label: "Open seller dashboard", href: "/sell/dashboard" };
    }
    return { label: "Upgrade to seller", onClick: onUpgrade };
  })();

  const CtaButton = ({ size = "lg", className = "" }) => {
    if (!primaryCta) return <Loader2 size={20} className="animate-spin text-white/40" />;
    const base = `shine-sweep group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 font-bold text-black shadow-[0_15px_50px_-10px_rgba(251,191,36,0.55)] transition-transform hover:scale-[1.02] ${
      size === "lg" ? "px-8 py-4 text-sm" : "px-6 py-3 text-xs"
    } ${className}`;
    const content = (
      <>
        {upgrading && <Loader2 size={14} className="animate-spin" />}
        {primaryCta.label}
        <ArrowRight size={size === "lg" ? 16 : 14} className="transition-transform group-hover:translate-x-1" />
      </>
    );
    if (primaryCta.href) return <Link href={primaryCta.href} className={base}>{content}</Link>;
    return (
      <button onClick={primaryCta.onClick} disabled={upgrading} className={`${base} disabled:opacity-60`}>
        {content}
      </button>
    );
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      {/* ambient amber orbs */}
      <div className="pointer-events-none absolute -left-40 top-40 h-[500px] w-[500px] rounded-full bg-amber-400/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-[30%] h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[120px]" />

      {/* ─────────── HERO ─────────── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-white/80">
            <Sparkles size={12} className="text-amber-300" />
            Seller program · <span className="text-amber-200">0% fees in early access</span>
          </span>

          <h1 className="mt-7 text-5xl font-black leading-[0.92] tracking-tighter sm:text-6xl md:text-7xl lg:text-[96px]">
            <span className="text-luxe">Turn your</span><br />
            <span className="relative inline-block">
              <span className="font-display-italic bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                closet into cash.
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 h-[6px] w-full origin-left rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 opacity-70 blur-md"
              />
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base text-white/55 md:text-lg">
            List products and live auctions on FluxBid in a few minutes.
            Buyers worldwide, zero listing fees, curated marketplace.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CtaButton />
            <Link
              href="#how"
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white/75 transition hover:text-amber-200"
            >
              See how it works
            </Link>
          </div>

          {/* trust row */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/40">
            <span className="flex items-center gap-1.5"><TrendingUp size={12} className="text-amber-300" /> 2k+ active sellers</span>
            <span className="h-3 w-px bg-white/10" />
            <span className="flex items-center gap-1.5"><Coins size={12} className="text-amber-300" /> $1.2M+ in sales</span>
            <span className="h-3 w-px bg-white/10" />
            <span className="flex items-center gap-1.5"><Star size={12} className="star-filled" fill="currentColor" /> 4.9 avg rating</span>
          </div>
        </motion.div>
      </div>

      {/* ─────────── STATS STRIP ─────────── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="liquid-glass-strong grid grid-cols-2 gap-4 rounded-3xl p-6 md:grid-cols-4 md:gap-0 md:p-8"
        >
          {[
            { k: "0%", v: "Listing fees" },
            { k: "190M+", v: "Global buyers" },
            { k: "60s", v: "To publish" },
            { k: "24/7", v: "Live auctions" }
          ].map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative md:px-6 md:first:pl-0 md:last:pr-0 md:[&:not(:last-child)]:border-r md:[&:not(:last-child)]:border-white/[0.08]"
            >
              <p className="bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text text-4xl font-black tracking-tighter text-transparent md:text-5xl">
                {s.k}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/40">{s.v}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ─────────── HOW IT WORKS ─────────── */}
      <div id="how" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <SectionHead
          eyebrow="How it works"
          title={<>List in <span className="font-display-italic text-amber-300">minutes</span>, not hours.</>}
        />

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          {/* connector line */}
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent md:block" />

          {[
            { n: "01", Icon: Rocket, title: "Create your listing", body: "Name, price, image, done. Flip one switch to run it as an auction with a starting bid and end date." },
            { n: "02", Icon: Sparkles, title: "Get discovered", body: "Approved listings publish across shop, auctions, and search — with curated placement on the homepage for standout pieces." },
            { n: "03", Icon: Coins, title: "Get paid", body: "Buyers check out in a single click. You keep 100% of the sale — zero fees during early access." }
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="liquid-glass relative rounded-2xl p-6"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/25 to-orange-500/15 ring-1 ring-amber-300/30">
                <s.Icon size={22} className="text-amber-200" />
              </div>
              <p className="mt-5 font-mono text-[11px] tracking-widest text-amber-300/70">STEP {s.n}</p>
              <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─────────── SAMPLE LISTING PREVIEW ─────────── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Preview</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              <span className="text-luxe">This is what</span><br />
              <span className="font-display-italic text-amber-300">buyers see.</span>
            </h2>
            <p className="mt-5 max-w-md text-white/55">
              Every listing gets the full FluxBid cinematic treatment — hover tilt,
              gold glow, reveal overlay, and your store name front-and-center. No fiddling required.
            </p>

            <ul className="mt-7 space-y-3 text-sm">
              {[
                "Auto-generated hover effects + blur-up loading",
                "Your store name + rating on every card",
                "Works across shop, search, auctions, and profile pages",
                "Mobile-optimized carousel on small screens"
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-white/70">
                  <CircleCheck size={16} className="mt-0.5 shrink-0 text-amber-300" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <PreviewCard />
            {/* decorative halo */}
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-amber-400/10 blur-[100px]" />
          </motion.div>
        </div>
      </div>

      {/* ─────────── EARNINGS ESTIMATOR ─────────── */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="liquid-glass-strong relative overflow-hidden rounded-3xl p-8 md:p-12"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-400/20 blur-[80px]" />

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Earnings estimator</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            <span className="text-luxe">You keep</span>{" "}
            <span className="font-display-italic bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              every dollar.
            </span>
          </h2>

          <div className="mt-10">
            <div className="flex items-baseline justify-between">
              <label className="text-sm text-white/55">Listing price</label>
              <span className="font-mono text-sm text-white/70">${price.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={10}
              max={5000}
              step={10}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-3 w-full accent-amber-400"
            />
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-white/30">
              <span>$10</span><span>$5,000</span>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <Row label="Listing price" value={`$${price.toLocaleString()}`} />
            <Row label="FluxBid fee" value="$0.00" accent="text-emerald-400" />
            <Row
              label="You take home"
              value={`$${price.toLocaleString()}`}
              accent="bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text text-transparent"
              big
            />
          </div>

          <p className="mt-8 text-xs text-white/35">
            Fees kick in after our first 1,000 sellers — that means right now, it&apos;s still 0%.
          </p>
        </motion.div>
      </div>

      {/* ─────────── FEATURE GRID ─────────── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <SectionHead
          eyebrow="What you get"
          title={<>Built for <span className="font-display-italic text-amber-300">serious</span> sellers.</>}
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { Icon: Zap, title: "Instant publish", body: "Listings go live the moment you hit save. No review, no waiting." },
            { Icon: Gavel, title: "Auctions + Buy-now", body: "Toggle auction mode with a starting bid and end date in one click." },
            { Icon: BarChart3, title: "Dashboard analytics", body: "Track active listings, catalog value, and auction count at a glance." },
            { Icon: Lock, title: "Owner-only edits", body: "JWT-scoped APIs — nobody else can touch your listings. Ever." },
            { Icon: ImageIcon, title: "Any-CDN images", body: "Paste image URLs from Unsplash, Cloudinary, your own CDN — all work." },
            { Icon: ShieldCheck, title: "Verified-email only", body: "Every seller confirms their email. Buyers know who they're buying from." }
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="liquid-glass group relative overflow-hidden rounded-2xl p-6 transition-colors hover:border-amber-300/25"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/5 blur-2xl transition-opacity group-hover:bg-amber-400/15" />
              <f.Icon size={20} className="text-amber-300" />
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─────────── FAQ ─────────── */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20">
        <SectionHead
          eyebrow="FAQ"
          title={<>Questions, <span className="font-display-italic text-amber-300">answered.</span></>}
        />
        <div className="mt-10 space-y-2">
          {FAQ.map((f, i) => (
            <FaqItem
              key={f.q}
              q={f.q}
              a={f.a}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
            />
          ))}
        </div>
      </div>

      {/* ─────────── FINAL CTA ─────────── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-orange-500/20 p-10 text-center ring-1 ring-amber-300/30 md:p-16"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-amber-400/30 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-orange-500/30 blur-[100px]" />

          <Package size={32} className="mx-auto text-amber-300" />
          <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            <span className="text-luxe">Apply, list,</span>{" "}
            <span className="font-display-italic bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              get paid.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/55">
            No setup fees, no monthly charges, no sales cut during early access.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton />
          </div>
        </motion.div>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultAccountType="seller" />
    </section>
  );
}

/* ─────────── sub-components ─────────── */

function SectionHead({ eyebrow, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{title}</h2>
    </motion.div>
  );
}

function Row({ label, value, accent, big }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <p className="text-[11px] uppercase tracking-wider text-white/40">{label}</p>
      <p className={`mt-1.5 font-black tracking-tight ${big ? "text-3xl md:text-4xl" : "text-2xl"} ${accent || "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function PreviewCard() {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:-translate-y-2 hover:rotate-1">
      <div className="relative h-[340px] overflow-hidden rounded-2xl">
        <Image
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
          alt="Apple Watch preview"
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 520px, 100vw"
          className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
            <Sparkles size={9} /> New
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-red-500/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Live
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs uppercase tracking-wider text-white/50">by Your Store</p>
          <p className="mt-1 text-lg font-bold text-white">Vintage Omega Seamaster</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text text-3xl font-black text-transparent">
              $2,450
            </p>
            <div className="flex items-center gap-1 text-xs text-white/60">
              <Star size={12} className="star-filled" fill="currentColor" />
              4.9 · 23 bids
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className="liquid-glass overflow-hidden rounded-2xl">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/[0.02]"
      >
        <span className="text-sm font-semibold">{q}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-amber-300 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <p className="px-5 pb-5 text-sm leading-relaxed text-white/55">{a}</p>
        </div>
      </div>
    </div>
  );
}

const FAQ = [
  {
    q: "What can I sell on FluxBid?",
    a: "Anything legal — electronics, fashion, collectibles, vintage items, art. Currently buy-now and live auctions are supported. No digital-only goods yet."
  },
  {
    q: "How fast do I get paid?",
    a: "Payouts land in your connected account within 2–3 business days after the buyer confirms delivery. During early access there's no platform cut — you keep 100%."
  },
  {
    q: "I signed up as a buyer. Can I switch to selling?",
    a: "Yep. Head to your account page and hit \"Become a seller\" — it's a one-click upgrade, same email, no new password."
  },
  {
    q: "Do I need my own product photos?",
    a: "Yes, but any CDN URL works — Unsplash, Cloudinary, your own hosting. File uploads are coming soon; for now paste https:// image URLs."
  },
  {
    q: "What about taxes and shipping?",
    a: "You handle both. FluxBid collects buyer payment; shipping is arranged between you and the buyer using the address attached to their order."
  }
];
