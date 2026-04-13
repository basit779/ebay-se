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

export default function SellerProductForm({ initial = null, onSubmit, submitLabel = "Publish listing" }) {
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
    <form onSubmit={handle} className="space-y-5">
      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      )}

      <Field label="Product name" icon={Tag}>
        <input
          required
          value={form.name}
          onChange={(e) => set({ name: e.target.value })}
          placeholder="e.g. Vintage Omega Seamaster"
          className="input-glow w-full rounded-xl bg-white/[0.03] py-3 pl-11 pr-4 text-sm"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Price (USD)" icon={DollarSign}>
          <input
            required type="number" min="0" step="0.01"
            value={form.price}
            onChange={(e) => set({ price: e.target.value })}
            className="input-glow w-full rounded-xl bg-white/[0.03] py-3 pl-11 pr-4 text-sm"
          />
        </Field>
        <Field label="Original price (optional)" icon={DollarSign}>
          <input
            type="number" min="0" step="0.01"
            value={form.originalPrice}
            onChange={(e) => set({ originalPrice: e.target.value })}
            className="input-glow w-full rounded-xl bg-white/[0.03] py-3 pl-11 pr-4 text-sm"
          />
        </Field>
      </div>

      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-wider text-white/40">Category</label>
        <select
          value={form.category}
          onChange={(e) => set({ category: e.target.value })}
          className="input-glow w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm"
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <Field label="Main image URL (https)" icon={ImageIcon}>
        <input
          required type="url"
          value={form.image}
          onChange={(e) => set({ image: e.target.value })}
          placeholder="https://images.unsplash.com/..."
          className="input-glow w-full rounded-xl bg-white/[0.03] py-3 pl-11 pr-4 text-sm"
        />
      </Field>

      {form.image && (
        <div className="overflow-hidden rounded-xl border border-white/[0.06]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={form.image} alt="preview" className="h-48 w-full object-cover" />
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-wider text-white/40">Additional images (one URL per line)</label>
        <textarea
          value={form.imagesText}
          onChange={(e) => set({ imagesText: e.target.value })}
          rows={3}
          className="input-glow w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm"
        />
      </div>

      <Field label="Description" icon={FileText} alignTop>
        <textarea
          required rows={4}
          value={form.description}
          onChange={(e) => set({ description: e.target.value })}
          className="input-glow w-full rounded-xl bg-white/[0.03] py-3 pl-11 pr-4 text-sm"
        />
      </Field>

      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-wider text-white/40">Features (comma-separated)</label>
        <input
          value={form.featuresText}
          onChange={(e) => set({ featuresText: e.target.value })}
          placeholder="Waterproof, 30hr Battery, Bluetooth 5.3"
          className="input-glow w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm"
        />
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm">
        <input
          type="checkbox"
          checked={form.inStock}
          onChange={(e) => set({ inStock: e.target.checked })}
          className="h-4 w-4 accent-amber-400"
        />
        In stock
      </label>

      <div className="rounded-2xl border border-amber-300/20 bg-amber-400/[0.04] p-4">
        <label className="flex items-center gap-3 text-sm font-semibold text-amber-200">
          <input
            type="checkbox"
            checked={form.auction}
            onChange={(e) => set({ auction: e.target.checked })}
            className="h-4 w-4 accent-amber-400"
          />
          <Gavel size={14} /> List as auction
        </label>
        {form.auction && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-white/40">Starting bid (USD)</label>
              <input
                required type="number" min="0" step="0.01"
                value={form.startingBid}
                onChange={(e) => set({ startingBid: e.target.value })}
                className="input-glow w-full rounded-xl bg-white/[0.03] px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] uppercase tracking-wider text-white/40">Auction ends</label>
              <input
                required type="datetime-local"
                value={form.endTime}
                onChange={(e) => set({ endTime: e.target.value })}
                className="input-glow w-full rounded-xl bg-white/[0.03] px-4 py-2.5 text-sm"
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-3.5 text-sm font-bold text-black shadow-[0_10px_40px_-10px_rgba(251,191,36,0.5)] disabled:opacity-50"
      >
        {submitting && <Loader2 size={14} className="animate-spin" />}
        {submitLabel}
      </button>
    </form>
  );
}

function Field({ label, icon: Icon, alignTop, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-white/40">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon size={14} className={`absolute left-4 ${alignTop ? "top-3.5" : "top-1/2 -translate-y-1/2"} text-white/30`} />
        )}
        {children}
      </div>
    </div>
  );
}
