"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-section relative flex min-h-screen items-center overflow-hidden">
      <div className="hero-divider pointer-events-none absolute left-0 right-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <p className="hero-eyebrow">WHERE</p>
        <h1 className="hero-headline">LUXURY FLOWS</h1>

        <Link href="/shop" className="hero-enter-link">
          ENTER THE MARKETPLACE →
        </Link>
      </div>

      <div className="hero-scroll-pulse pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2" />

      <style jsx global>{`
        .hero-section {
          background-color: #0a0a0a;
        }
        .hero-divider {
          top: 38%;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.12);
        }
        .hero-eyebrow {
          margin: 0;
          color: #ffffff;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: clamp(11px, 1.2vw, 13px);
          font-weight: 400;
          letter-spacing: 0.4em;
          opacity: 0.4;
        }
        .hero-headline {
          margin: 1rem 0 0 0;
          color: #ffffff;
          font-size: clamp(72px, 10vw, 140px);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.9;
        }
        .hero-enter-link {
          display: inline-block;
          margin-top: 4rem;
          padding: 0;
          border: 0;
          background: none;
          border-radius: 0;
          color: #ffffff;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          text-decoration: none;
          opacity: 0.5;
          transition: opacity 200ms ease;
        }
        .hero-enter-link:hover {
          opacity: 1;
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        .hero-scroll-pulse {
          width: 2px;
          height: 48px;
          background-color: #ffffff;
          animation: hero-scroll-pulse 2s ease-in-out infinite;
        }
        @keyframes hero-scroll-pulse {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  );
}
