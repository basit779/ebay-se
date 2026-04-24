"use client";

import { useState } from "react";
import { Loader2, Image as ImageIcon, Tag, DollarSign, FileText, Gavel } from "lucide-react";

const CATEGORIES = ["Audio", "Wearables", "Fashion", "Lifestyle", "Tech", "Home", "Sports", "Collectibles", "Art", "Other"];

const empty = {
  name: "",
  price: "",
  originalPrice: "",
  category: "Other",
  description: "",
  image: "",
  imagesText: "",
  featuresText: "",
  inStock: true,
  auction: false,
  startingBid: "",
  endTime: ""
};

export default function SellerProductForm({ initial = null, onSubmit, submitLabel = "Submit Application" }) {
  const [form, setForm] = useState(() => {
    if (!initial) return empty;
    return {
      name: initial.name || "",
      price: initial.price ?? "",
      originalPrice: initial.originalPrice ?? "",
      category: initial.category || "Other",
      description: initial.description || "",
      image: initial.image || "",
      imagesText: (initial.images || []).join("\n"),
      featuresText: (initial.features || []).join(", "),
      inStock: initial.inStock !== false,
      auction: !!initial.auction,
      startingBid: initial.startingBid ?? "",
      endTime: initial.endTime ? initial.endTime.slice(0, 16) : ""
    };
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handle = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
        category: form.category,
        description: form.description.trim(),
        image: form.image.trim(),
        images: form.imagesText
          .split(/\n+/).map((s) => s.trim()).filter(Boolean),
        features: form.featuresText
          .split(",").map((s) => s.trim()).filter(Boolean),
        inStock: form.inStock,
        auction: form.auction,
        startingBid: form.auction ? Number(form.startingBid) : null,
        endTime: form.auction && form.endTime ? new Date(form.endTime).toISOString() : null
      };
      if (!payload.images.length && payload.image) payload.images = [payload.image];
      await onSubmit(payload);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handle} className="space-y-14">
      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      )}

      {/* ── Section: The Object ─────────────────────────── */}
      <Section index="I" title="The Object" hint="Tell us what you're listing. Clarity and detail build trust with collectors.">
        <Field label="Object name" icon={Tag}>
          <input
            required
            value={form.name}
            onChange={(e) => set({ name: e.target.value })}
            placeholder="e.g. Vintage Omega Seamaster"
            className="luxe-input w-full pl-11"
          />
        </Field>

        <Field label="Category">
          <select
            value={form.category}
            onChange={(e) => set({ category: e.target.value })}
            className="luxe-input w-full"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Provenance & description" icon={FileText} alignTop>
          <textarea
            required rows={5}
            value={form.description}
            onChange={(e) => set({ description: e.target.value })}
            placeholder="Origin, condition, history, what makes this special…"
            className="luxe-input w-full pl-11"
          />
        </Field>

        <Field label="Signature features (comma-separated)">
          <input
            value={form.featuresText}
            onChange={(e) => set({ featuresText: e.target.value })}
            placeholder="Waterproof, 30hr Battery, Bluetooth 5.3"
            className="luxe-input w-full"
          />
        </Field>
      </Section>

      {/* ── Section: Imagery ─────────────────────────────── */}
      <Section index="II" title="Imagery" hint="A single hero photograph sells the story. Additional angles confirm it.">
        <Field label="Hero image (https URL)" icon={ImageIcon}>
          <input
            required type="url"
            value={form.image}
            onChange={(e) => set({ image: e.target.value })}
            placeholder="https://images.unsplash.com/…"
            className="luxe-input w-full pl-11"
          />
        </Field>

        {form.image && (
          <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-50">
            {/* User-entered URL — could be any host, so bypass the
                next/image optimizer with unoptimized to avoid a
                remotePatterns violation. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.image} alt="preview" className="h-full w-full object-cover" />
          </div>
        )}

        <Field label="Additional photographs (one URL per line)">
          <textarea
            value={form.imagesText}
            onChange={(e) => set({ imagesText: e.target.value })}
            rows={3}
            className="luxe-input w-full"
          />
        </Field>
      </Section>

      {/* ── Section: Pricing ─────────────────────────────── */}
      <Section index="III" title="Pricing" hint="Transparent pricing. Optional original price unlocks a discount badge on the card.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Asking price (USD)" icon={DollarSign}>
            <input
              required type="number" min="0" step="0.01"
              value={form.price}
              onChange={(e) => set({ price: e.target.value })}
              className="luxe-input font-mono w-full pl-11"
            />
          </Field>
          <Field label="Original retail (optional)" icon={DollarSign}>
            <input
              type="number" min="0" step="0.01"
              value={form.originalPrice}
              onChange={(e) => set({ originalPrice: e.target.value })}
              className="luxe-input font-mono w-full pl-11"
            />
          </Field>
        </div>

        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white/75">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={(e) => set({ inStock: e.target.checked })}
            className="h-4 w-4 accent-champagne-400"
          />
          Currently in stock and ready to ship
        </label>
      </Section>

      {/* ── Section: Auction Terms ──────────────────────── */}
      <Section index="IV" title="Auction Terms" hint="Skip this section for a fixed-price listing.">
        <div className="rounded-2xl border border-champagne-300/25 bg-champagne-400/[0.04] p-5">
          <label className="flex items-center gap-3 text-sm font-semibold text-champagne-200">
            <input
              type="checkbox"
              checked={form.auction}
              onChange={(e) => set({ auction: e.target.checked })}
              className="h-4 w-4 accent-champagne-400"
            />
            <Gavel size={14} /> List this as a live auction
          </label>
          {form.auction && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Opening bid (USD)">
                <input
                  required type="number" min="0" step="0.01"
                  value={form.startingBid}
                  onChange={(e) => set({ startingBid: e.target.value })}
                  className="luxe-input font-mono w-full"
                />
              </Field>
              <Field label="Auction closes">
                <input
                  required type="datetime-local"
                  value={form.endTime}
                  onChange={(e) => set({ endTime: e.target.value })}
                  className="luxe-input font-mono w-full"
                />
              </Field>
            </div>
          )}
        </div>
      </Section>

      {/* ── Submit ────────────────────────────────────────── */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="btn-luxe shine-sweep w-full disabled:opacity-60 disabled:pointer-events-none"
        >
          {submitting && <Loader2 size={14} className="animate-spin" />}
          {submitLabel}
        </button>
        <p className="mt-4 text-center text-[11px] uppercase tracking-[0.25em] text-white/35">
          Submissions reviewed within 24 hours · Commission 3.5%
        </p>
      </div>
    </form>
  );
}

function Section({ index, title, hint, children }) {
  return (
    <section className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
      <div className="md:w-52 md:pt-2">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne-400/80">
          {index} · Section
        </p>
        <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-white">
          {title}
        </h3>
        {hint && (
          <p className="mt-3 text-[13px] leading-[1.7] text-white/45">
            {hint}
          </p>
        )}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Field({ label, icon: Icon, alignTop, children }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon size={14} className={`absolute left-4 ${alignTop ? "top-4" : "top-1/2 -translate-y-1/2"} text-white/30`} />
        )}
        {children}
      </div>
    </div>
  );
}
