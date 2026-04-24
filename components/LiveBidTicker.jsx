"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

const bidders = [
  "alex_b",
  "vintage_lex",
  "watch_collector_88",
  "midas_24",
  "art_baron",
  "rare_finds",
  "lux_hunter",
  "bid_pro",
  "gold_eye",
  "first_dibs"
];

function pickBidder(i) {
  return bidders[i % bidders.length];
}

function formatEntry(e) {
  if (e.type === "bid") {
    return `@${e.user} bid $${e.amount.toLocaleString()} on ${e.name} — ${e.bids} bids`;
  }
  return `HOT LOT — ${e.name} — ${e.bids} watching`;
}

export default function LiveBidTicker({ auctions = [] }) {
  if (!auctions.length) return null;

  const entries = auctions.flatMap((a, i) => [
    {
      type: "bid",
      user: pickBidder(i),
      amount: a.currentBid,
      name: a.name,
      bids: a.bidCount
    },
    {
      type: "hot",
      name: a.name,
      bids: a.bidCount
    }
  ]);
  const doubled = [...entries, ...entries];

  return (
    <section className="lbt-section relative overflow-hidden">
      <div className="lbt-mask">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="lbt-track whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {doubled.map((e, i) => (
            <Fragment key={i}>
              <span className="lbt-item">{formatEntry(e)}</span>
              <span className="lbt-sep"> · </span>
            </Fragment>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .lbt-section {
          background: #0f0f0f;
          border: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 14px 0;
        }
        .lbt-mask {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 80px,
            black calc(100% - 80px),
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 80px,
            black calc(100% - 80px),
            transparent
          );
        }
        .lbt-track {
          display: inline-flex;
          align-items: center;
        }
        .lbt-item {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 11px;
          color: #ffffff;
          opacity: 0.45;
          transition: opacity 200ms ease;
          cursor: default;
        }
        .lbt-item:hover {
          opacity: 1;
        }
        .lbt-sep {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 11px;
          color: #ffffff;
          opacity: 0.25;
          padding: 0 14px;
        }
      `}</style>
    </section>
  );
}
