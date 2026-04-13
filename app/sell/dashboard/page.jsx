"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Edit3, Trash2, Loader2, Package, Eye, Gavel, DollarSign } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function SellerDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { addToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.replace("/sell"); return; }
    if (user.accountType !== "seller") { router.replace("/sell"); return; }
    fetch("/api/seller/products")
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []))
      .finally(() => setLoading(false));
  }, [user, authLoading, router]);

  const remove = async (id) => {
    if (!confirm("Delete this listing? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/seller/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProducts((ps) => ps.filter((p) => p.id !== id));
      addToast("Listing removed", "success");
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setDeletingId(null);
    }
  };

  if (authLoading || (user && user.accountType === "seller" && loading)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 size={28} className="animate-spin text-amber-400" />
      </div>
    );
  }
  if (!user || user.accountType !== "seller") return null;

  const active = products.filter((p) => p.status === "active").length;
  const totalValue = products.reduce((sum, p) => sum + (p.price || 0), 0);
  const auctionCount = products.filter((p) => p.auction).length;

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-12 md:px-8">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Seller</p>
            <h1 className="mt-1 text-4xl font-bold">
              <span className="text-luxe">{user.storeName || user.name}</span>
            </h1>
            <p className="mt-1 text-sm text-white/40">Manage your listings and auctions</p>
          </div>
          <Link
            href="/sell/new"
            className="inline-flex items-center gap-2 self-start rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-bold text-black shadow-[0_10px_40px_-10px_rgba(251,191,36,0.5)] sm:self-auto"
          >
            <Plus size={16} /> New listing
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat Icon={Package} label="Active listings" value={active} />
          <Stat Icon={Gavel} label="Auctions" value={auctionCount} />
          <Stat Icon={DollarSign} label="Catalog value" value={`$${totalValue.toLocaleString()}`} />
        </div>

        {/* Listings */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold">Your listings</h2>
          {products.length === 0 ? (
            <div className="mt-6 flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] py-16 text-center">
              <Package size={32} className="text-white/10" />
              <p className="mt-4 text-sm text-white/50">No listings yet</p>
              <Link href="/sell/new" className="mt-5 rounded-full bg-amber-400/15 px-5 py-2 text-sm font-medium text-amber-200">
                Create your first listing
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {products.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium">{p.name}</p>
                      {p.auction && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold text-red-300">
                          <Gavel size={9} /> Auction
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/40">{p.category} · ${Number(p.price).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/product/${p.id}`}
                      className="rounded-lg border border-white/[0.06] p-2 text-white/50 transition hover:text-white"
                      title="View"
                    >
                      <Eye size={14} />
                    </Link>
                    <Link
                      href={`/sell/edit/${p.id}`}
                      className="rounded-lg border border-white/[0.06] p-2 text-white/50 transition hover:text-amber-300"
                      title="Edit"
                    >
                      <Edit3 size={14} />
                    </Link>
                    <button
                      onClick={() => remove(p.id)}
                      disabled={deletingId === p.id}
                      className="rounded-lg border border-white/[0.06] p-2 text-white/50 transition hover:text-rose-400 disabled:opacity-40"
                      title="Delete"
                    >
                      {deletingId === p.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Stat({ Icon, label, value }) {
  return (
    <div className="liquid-glass rounded-2xl p-5">
      <Icon size={16} className="text-amber-300" />
      <p className="mt-3 text-2xl font-bold">{value}</p>
      <p className="mt-0.5 text-[11px] uppercase tracking-wider text-white/40">{label}</p>
    </div>
  );
}
