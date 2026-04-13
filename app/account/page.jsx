"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Package, User, Calendar, MapPin, Loader2, Store, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function AccountPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => setOrders(data.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  if (authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 size={28} className="animate-spin text-neon-cyan" />
      </div>
    );
  }

  if (!user) {
    return (
      <section className="relative min-h-screen overflow-hidden px-4 py-20 md:px-8">
        <AnimatedBackground />
        <div className="relative z-10 mx-auto max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <User size={24} className="text-white/15" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Sign in to view your account</h1>
          <p className="mt-2 text-sm text-white/40">
            Create an account or sign in to track your orders
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-12 md:px-8">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon-purple">
            Account
          </p>
          <h1 className="mt-2 text-4xl font-bold">
            Welcome, <span className="text-gradient-static">{user.name}</span>
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/40">
            <span>{user.email}</span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              user.accountType === "seller"
                ? "bg-amber-400/15 text-amber-200"
                : "bg-white/[0.06] text-white/60"
            }`}>
              {user.accountType === "seller" ? <Store size={10} /> : <User size={10} />}
              {user.accountType === "seller" ? "Seller" : "Buyer"}
            </span>
          </div>
        </motion.div>

        {user.accountType === "seller" ? (
          <Link
            href="/sell/dashboard"
            className="mt-6 flex items-center justify-between rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 to-orange-500/5 p-5 transition hover:border-amber-300/40"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300">
                <Store size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">Seller dashboard</p>
                <p className="text-xs text-white/45">Manage your listings and auctions</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-amber-300" />
          </Link>
        ) : (
          <Link
            href="/sell"
            className="mt-6 flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition hover:border-amber-300/30 hover:bg-amber-400/[0.04]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-amber-300">
                <Store size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">Become a seller</p>
                <p className="text-xs text-white/45">List products & live auctions in minutes</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-white/40" />
          </Link>
        )}

        {/* Orders */}
        <div className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Package size={18} className="text-neon-cyan" /> Order History
          </h2>

          {loading ? (
            <div className="mt-8 flex justify-center">
              <Loader2 size={24} className="animate-spin text-neon-cyan" />
            </div>
          ) : orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] py-16 text-center"
            >
              <Package size={32} className="text-white/10" />
              <p className="mt-4 text-sm text-white/50">No orders yet</p>
              <p className="mt-1 text-xs text-white/25">
                Your order history will appear here after checkout
              </p>
              <a
                href="/shop"
                className="mt-6 rounded-full bg-neon-cyan/10 px-6 py-2.5 text-sm font-medium text-neon-cyan"
              >
                Start Shopping
              </a>
            </motion.div>
          ) : (
            <div className="mt-6 space-y-4">
              {orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-white/30">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="rounded-full bg-neon-emerald/15 px-2.5 py-0.5 text-[10px] font-bold uppercase text-neon-emerald">
                          {order.status}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-white/30">
                          <Calendar size={11} />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-neon-cyan">${order.total.toFixed(2)}</p>
                  </div>

                  {/* Items */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                        <img src={item.image} alt="" className="h-8 w-8 rounded object-cover" />
                        <div>
                          <p className="text-xs font-medium">{item.name}</p>
                          <p className="text-[10px] text-white/30">x{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {order.shipping?.address && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-white/25">
                      <MapPin size={11} />
                      <span>{order.shipping.address}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
