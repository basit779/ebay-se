"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import SellerProductForm from "@/components/SellerProductForm";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function NewListingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { addToast } = useToast();

  useEffect(() => {
    if (loading) return;
    if (!user || user.accountType !== "seller") router.replace("/sell");
  }, [user, loading, router]);

  const submit = async (payload) => {
    const res = await fetch("/api/seller/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed");
    addToast("Listing published", "success");
    router.push("/sell/dashboard");
  };

  if (loading || !user || user.accountType !== "seller") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 size={28} className="animate-spin text-champagne-400" />
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-24 md:px-8 md:py-32">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Link
          href="/sell/dashboard"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40 transition-colors duration-500 hover:text-champagne-200"
        >
          <ArrowLeft size={12} /> Return to dashboard
        </Link>

        {/* Editorial header */}
        <div className="mt-10">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/80">
            Application for Listing
          </p>
          <h1 className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
            Submit an <span className="italic text-champagne-300">object.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-white/55">
            FluxBid is an invite-only marketplace. Every object is reviewed before going live.
            Complete the four sections below &mdash; the stronger your provenance,
            the faster the approval.
          </p>
        </div>

        <div className="champagne-rule my-14" />

        <SellerProductForm onSubmit={submit} submitLabel="Submit Application" />
      </div>
    </section>
  );
}
