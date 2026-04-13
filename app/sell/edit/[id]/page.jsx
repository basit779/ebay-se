"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import SellerProductForm from "@/components/SellerProductForm";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function EditListingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { addToast } = useToast();
  const [product, setProduct] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user || user.accountType !== "seller") { router.replace("/sell"); return; }
    fetch(`/api/seller/products/${params.id}`)
      .then(async (r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((d) => setProduct(d.product))
      .catch(() => {
        addToast("Listing not found", "error");
        router.replace("/sell/dashboard");
      })
      .finally(() => setFetching(false));
  }, [user, loading, params.id, router, addToast]);

  const submit = async (payload) => {
    const res = await fetch(`/api/seller/products/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed");
    addToast("Listing updated", "success");
    router.push("/sell/dashboard");
  };

  if (loading || fetching || !product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 size={28} className="animate-spin text-amber-400" />
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-12 md:px-8">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-2xl">
        <Link href="/sell/dashboard" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white">
          <ArrowLeft size={12} /> Back to dashboard
        </Link>
        <h1 className="mt-3 text-3xl font-bold">Edit listing</h1>
        <div className="mt-8 rounded-3xl border border-white/[0.06] bg-white/[0.015] p-6">
          <SellerProductForm initial={product} onSubmit={submit} submitLabel="Save changes" />
        </div>
      </div>
    </section>
  );
}
