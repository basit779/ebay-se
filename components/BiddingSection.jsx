"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gavel, Clock, TrendingUp, AlertCircle, User, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

function useCountdown(endTime) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const update = () => {
      const diff = new Date(endTime) - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        expired: false
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return timeLeft;
}

export default function BiddingSection({ product }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const countdown = useCountdown(product.endTime);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [bids, setBids] = useState([]);
  const [currentBid, setCurrentBid] = useState(product.currentBid);
  const [bidCount, setBidCount] = useState(product.bidCount);
  const [showBids, setShowBids] = useState(false);

  const minBid = currentBid + 1;

  const fetchBids = useCallback(async () => {
    try {
      const res = await fetch(`/api/bids?productId=${product.id}`);
      const data = await res.json();
      setBids(data.bids || []);
    } catch {}
  }, [product.id]);

  useEffect(() => {
    fetchBids();
  }, [fetchBids]);

  const handleBid = async (e) => {
    e.preventDefault();
    if (!user) {
      addToast("Sign in to place a bid", "error");
      return;
    }

    const amount = Number(bidAmount);
    if (!amount || amount < minBid) {
      addToast(`Minimum bid is $${minBid.toLocaleString()}`, "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, amount })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Couldn't place bid — please try again");

      setCurrentBid(data.currentBid);
      setBidCount((prev) => prev + 1);
      setBidAmount("");
      addToast(`Bid of $${amount.toLocaleString()} placed successfully!`, "success");
      fetchBids();
    } catch (err) {
      addToast(err?.message || "Network error — try again", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="bid" className="space-y-5 scroll-mt-24">
      {/* Current Bid */}
      <div className="rounded-2xl border border-[#e53238]/20 bg-[#e53238]/5 p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e53238]">
          <Gavel size={14} />
          Live Auction
        </div>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="text-4xl font-bold text-white">${currentBid.toLocaleString()}</span>
          <span className="text-sm text-white/40">{bidCount} bid{bidCount !== 1 ? "s" : ""}</span>
        </div>
        {product.startingBid && (
          <p className="mt-1 text-xs text-white/30">
            Started at ${product.startingBid.toLocaleString()}
          </p>
        )}
      </div>

      {/* Countdown */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/50">
          <Clock size={13} />
          {countdown.expired ? "Auction ended" : "Time remaining"}
        </div>
        {countdown.expired ? (
          <p className="text-lg font-semibold text-[#e53238]">This auction has ended</p>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: countdown.days, label: "Days" },
              { value: countdown.hours, label: "Hours" },
              { value: countdown.minutes, label: "Min" },
              { value: countdown.seconds, label: "Sec" }
            ].map(({ value, label }) => (
              <div key={label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center">
                <motion.p
                  key={value}
                  initial={{ y: -5, opacity: 0.5 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-bold tabular-nums"
                >
                  {String(value).padStart(2, "0")}
                </motion.p>
                <p className="mt-0.5 text-[10px] text-white/30">{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Place Bid */}
      {!countdown.expired && (
        <form onSubmit={handleBid} className="space-y-3">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-white/30">$</span>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder={`${minBid.toLocaleString()} or more`}
              min={minBid}
              step="1"
              className="input-glow w-full rounded-xl bg-white/[0.03] py-4 pl-10 pr-4 text-lg font-semibold text-white placeholder-white/20"
            />
          </div>
          <div className="flex gap-2">
            {[minBid, Math.ceil(minBid * 1.1), Math.ceil(minBid * 1.25)].map((quick) => (
              <button
                key={quick}
                type="button"
                onClick={() => setBidAmount(String(quick))}
                className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] py-2 text-xs font-medium text-white/50 transition hover:border-white/15 hover:text-white/80"
              >
                ${quick.toLocaleString()}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={loading || !bidAmount}
            className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e53238] to-[#c62828] py-4 text-sm font-bold text-white transition-all hover:shadow-[0_0_30px_rgba(229,50,56,0.3)] disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Gavel size={18} />}
            {loading ? "Placing bid..." : "Place Bid"}
          </button>
          {!user && (
            <p className="flex items-center gap-1.5 text-xs text-[#f5af02]">
              <AlertCircle size={12} /> You must sign in to place a bid
            </p>
          )}
        </form>
      )}

      {/* Seller */}
      {product.sellerId && (
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neon-purple/20 text-sm font-bold text-neon-purple">
            {product.sellerId[0].toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-medium">{product.sellerId}</p>
            <p className="text-[10px] text-white/30">Verified Seller</p>
          </div>
        </div>
      )}

      {/* Bid History */}
      <button
        onClick={() => { setShowBids(!showBids); if (!showBids) fetchBids(); }}
        className="flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white/50 transition hover:text-white/80"
      >
        <span className="flex items-center gap-2">
          <TrendingUp size={14} /> Bid History ({bidCount})
        </span>
        <span>{showBids ? "▲" : "▼"}</span>
      </button>

      <AnimatePresence>
        {showBids && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="max-h-60 space-y-2 overflow-y-auto">
              {bids.length === 0 ? (
                <p className="py-4 text-center text-xs text-white/30">No bids yet — be the first!</p>
              ) : (
                bids.map((bid, i) => (
                  <div
                    key={bid.id}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${
                      i === 0 ? "border border-amber-400/25 bg-amber-400/10" : "border border-white/[0.04] bg-white/[0.01]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <User size={12} className="text-white/25" />
                      <span className="text-xs font-medium">
                        {bid.userName}
                        {i === 0 && <span className="ml-1.5 text-[10px] text-amber-300">Leading</span>}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">${bid.amount.toLocaleString()}</p>
                      <p className="text-[10px] text-white/25">
                        {new Date(bid.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
