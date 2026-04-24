"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import ProductImage from "@/components/ProductImage";
import { getEndTime } from "@/data/products";

function formatCountdown(ms) {
  if (ms <= 0) return { text: "ENDED", ended: true };
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const text = h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
  return { text, ended: false };
}

function useAuctionCountdown(product) {
  const [endTime] = useState(() => (product?.auction ? getEndTime(product) : null));
  const [ms, setMs] = useState(() => (endTime ? endTime.getTime() - Date.now() : 0));
  useEffect(() => {
    if (!endTime) return;
    const target = endTime.getTime();
    const tick = () => setMs(target - Date.now());
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, [endTime]);
  return ms;
}

// Editorial minimal card for regular (non-auction) products.
function RegularProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addToast(`${product.name} added to cart`, "success");
  };

  return (
    <article className="pc-card relative w-full">
      <Link
        href={`/product/${product.id}`}
        aria-label={product.name}
        className="absolute inset-0 z-10"
      />

      <div className="pc-image-frame">
        <div className="pc-image-wrap">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="block h-full w-full object-cover"
          />
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="pc-cart-bar"
          aria-label="Add to cart"
        >
          ADD TO CART
        </button>
      </div>

      <div className="pc-info">
        <h3 className="pc-name">{product.name}</h3>
        <p className="pc-price">${product.price}</p>
      </div>

      <style jsx>{`
        .pc-card {
          border-radius: 4px;
          overflow: hidden;
          background: transparent;
          box-shadow: none;
        }
        .pc-image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 0;
        }
        .pc-image-wrap {
          position: absolute;
          inset: 0;
          transition: transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        .pc-card:hover .pc-image-wrap {
          transform: scale(1.04);
        }
        .pc-cart-bar {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 20;
          height: 32px;
          border: 0;
          border-radius: 0;
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.85);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          opacity: 0;
          transition: opacity 200ms ease;
        }
        .pc-card:hover .pc-cart-bar {
          opacity: 1;
        }
        .pc-info {
          padding-top: 10px;
        }
        .pc-name {
          margin: 0;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pc-price {
          margin: 4px 0 0 0;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.4);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
        }
        @media (prefers-reduced-motion: reduce) {
          .pc-image-wrap,
          .pc-cart-bar {
            transition: none;
          }
          .pc-card:hover .pc-image-wrap {
            transform: none;
          }
        }
      `}</style>
    </article>
  );
}

// Horizontal-split auction card — 55% image / 45% info panel.
function AuctionCard({ product, variant = "default" }) {
  const isHero = variant === "hero";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const countdownMs = useAuctionCountdown(product);
  const countdown = formatCountdown(countdownMs);
  const underOneHour =
    !countdown.ended && countdownMs > 0 && countdownMs < 60 * 60 * 1000;

  return (
    <article className={`ac-card relative w-full ${isHero ? "h-full" : ""}`}>
      <Link
        href={`/product/${product.id}`}
        aria-label={product.name}
        className="absolute inset-0 z-10"
      />

      <div className="ac-inner">
        <div className="ac-image">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="block h-full w-full object-cover"
          />
        </div>

        <div className="ac-info">
          <div className="ac-live">
            <span className="ac-live-dot" aria-hidden />
            LIVE AUCTION
          </div>

          <h3 className="ac-name">{product.name}</h3>

          <div className="ac-bid">
            ${product.currentBid?.toLocaleString() ?? "0"}
          </div>
          <div className="ac-bids">
            {product.bidCount ?? 0} BIDS
          </div>

          {isMounted && (
            <div className="ac-countdown-wrap">
              <div
                className={`ac-countdown ${underOneHour ? "ac-countdown-urgent" : ""} ${countdown.ended ? "ac-countdown-ended" : ""}`}
              >
                {countdown.text}
              </div>
              <div className="ac-remaining">REMAINING</div>
            </div>
          )}

          <Link
            href={`/product/${product.id}#bid`}
            className="ac-bid-btn pointer-events-auto relative z-20"
          >
            PLACE BID
          </Link>
        </div>
      </div>

      <style jsx>{`
        .ac-card {
          background: #111111;
          border-radius: 4px;
          overflow: hidden;
        }
        .ac-inner {
          display: flex;
          flex-direction: row;
          min-height: 280px;
          height: 100%;
        }
        .ac-image {
          flex: 0 0 55%;
          position: relative;
          overflow: hidden;
          background: #0a0a0a;
          border-radius: 0;
        }
        .ac-info {
          flex: 0 0 45%;
          background: #111111;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .ac-live {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 9px;
          letter-spacing: 0.5em;
          color: #ff4444;
          text-transform: uppercase;
        }
        .ac-live-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff4444;
          animation: ac-pulse 1.2s infinite;
        }
        @keyframes ac-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        .ac-name {
          margin: 12px 0 0 0;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.2;
          color: #ffffff;
        }
        .ac-bid {
          margin-top: 12px;
          font-size: 28px;
          font-weight: 700;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          color: #e8c97e;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .ac-bids {
          margin-top: 4px;
          font-size: 10px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          opacity: 0.3;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .ac-countdown-wrap {
          margin-top: auto;
          padding-top: 16px;
        }
        .ac-countdown {
          font-size: 36px;
          font-weight: 800;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          letter-spacing: -0.02em;
          color: #ffffff;
          line-height: 1;
        }
        .ac-countdown-urgent {
          color: #ff4444;
        }
        .ac-countdown-ended {
          color: rgba(255, 255, 255, 0.3);
          font-size: 28px;
        }
        .ac-remaining {
          margin-top: 6px;
          font-size: 8px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          letter-spacing: 0.5em;
          opacity: 0.25;
          color: #ffffff;
          text-transform: uppercase;
        }
        .ac-bid-btn {
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 44px;
          background: #e8c97e;
          color: #000000;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.3em;
          border-radius: 0;
          border: 0;
          text-decoration: none;
          cursor: pointer;
          transition: background 200ms ease;
          text-transform: uppercase;
        }
        .ac-bid-btn:hover {
          background: #ffffff;
        }
      `}</style>
    </article>
  );
}

export default function ProductCard({ product, index = 0, variant = "default" }) {
  if (!product.auction) {
    return <RegularProductCard product={product} />;
  }
  return <AuctionCard product={product} variant={variant} />;
}
