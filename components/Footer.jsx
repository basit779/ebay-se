"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import FluxBidLogo from "@/components/FluxBidLogo";
import { FadeUp } from "@/components/TextReveal";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Live Auctions", href: "/auctions" },
    { label: "Audio", href: "/shop?category=Audio" },
    { label: "Tech", href: "/shop?category=Tech" },
    { label: "Fashion", href: "/shop?category=Fashion" }
  ],
  Sell: [
    { label: "Become a Seller", href: "/sell" },
    { label: "Seller Dashboard", href: "/sell/dashboard" },
    { label: "New Listing", href: "/sell/new" }
  ],
  Account: [
    { label: "My Orders", href: "/account" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Cart", href: "/cart" }
  ]
};

const socials = [
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    )
  },
  {
    label: "X",
    href: "#",
    svg: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    label: "YouTube",
    href: "#",
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    )
  },
  {
    label: "Email",
    href: "mailto:hello@fluxbid.app",
    svg: <Mail size={14} />
  }
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-obsidian">
      <div className="champagne-rule absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
        {/* Editorial top band: brand statement */}
        <FadeUp>
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/80">
            The FluxBid Manifesto
          </p>
          <h3 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
            Commerce, <span className="italic text-champagne-300">reimagined</span> as a ritual.
          </h3>
        </FadeUp>

        <div className="champagne-rule mt-20 md:mt-24" />

        <div className="mt-16 grid gap-14 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <FadeUp className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <FluxBidLogo size="md" animate={false} />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-white/65">
              The premium marketplace for rare finds and extraordinary goods.
              Hand-verified sellers, transparent bidding, cinematic commerce.
            </p>
            <div className="mt-8 flex gap-3">
              {socials.map(({ svg, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/65 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-champagne-400/40 hover:text-champagne-300 hover:shadow-[0_10px_30px_-12px_rgba(212,175,55,0.5)]"
                >
                  {svg}
                </a>
              ))}
            </div>
          </FadeUp>

          {Object.entries(footerLinks).map(([title, links], i) => (
            <FadeUp key={title} delay={0.1 * (i + 1)}>
              <h4 className="font-serif text-xl font-semibold tracking-tight text-white">
                {title}
              </h4>
              <ul className="mt-6 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-[14px] text-white/65 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-champagne-200"
                    >
                      <span className="inline-block h-px w-0 bg-champagne-300 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-white/[0.06] pt-10 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
            &copy; {new Date().getFullYear()} &nbsp;·&nbsp; FluxBid &nbsp;·&nbsp; All rights reserved
          </p>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-white/55">
            <a href="#" className="transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-champagne-200">
              Privacy Policy
            </a>
            <span className="h-3 w-px bg-white/10" />
            <a href="#" className="transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-champagne-200">
              Terms of Service
            </a>
          </div>

          <p className="text-[11px] italic text-white/50">
            Where luxury flows.
          </p>
        </div>
      </div>
    </footer>
  );
}
