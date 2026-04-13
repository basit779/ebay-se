"use client";

import Link from "next/link";
import { Globe, MessageCircle, Rss, Mail } from "lucide-react";
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
    { label: "Become a seller", href: "/sell" },
    { label: "Seller dashboard", href: "/sell/dashboard" },
    { label: "New listing", href: "/sell/new" }
  ],
  Account: [
    { label: "My orders", href: "/account" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Cart", href: "/cart" }
  ]
};

const socials = [
  { icon: MessageCircle, href: "https://twitter.com", label: "Twitter" },
  { icon: Rss, href: "#", label: "Blog" },
  { icon: Globe, href: "https://github.com/basit779/ebay-se", label: "GitHub" },
  { icon: Mail, href: "mailto:hello@fluxbid.app", label: "Email" }
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black/40">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <FadeUp className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <FluxBidLogo size="md" animate={false} />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              The premium marketplace where everything flows. Buy, sell, and bid
              with confidence on the most cinematic commerce platform.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-white/55 transition-all hover:border-amber-400/30 hover:bg-amber-400/[0.06] hover:text-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.25)]"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </FadeUp>

          {Object.entries(footerLinks).map(([title, links], i) => (
            <FadeUp key={title} delay={0.1 * (i + 1)}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/55">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-amber-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="text-[11px] text-white/40">
            &copy; {new Date().getFullYear()} FluxBid. Built for a better marketplace.
          </p>
          <p className="text-[11px] text-white/40">
            Crafted with care in the Next.js era.
          </p>
        </div>
      </div>
    </footer>
  );
}
