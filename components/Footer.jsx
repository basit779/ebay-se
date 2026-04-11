"use client";

import Link from "next/link";
import { Globe, MessageCircle, Rss, Mail } from "lucide-react";
import EbayLogo from "@/components/EbayLogo";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Audio", href: "/shop?category=Audio" },
    { label: "Tech", href: "/shop?category=Tech" },
    { label: "Fashion", href: "/shop?category=Fashion" },
    { label: "Lifestyle", href: "/shop?category=Lifestyle" }
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" }
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Contact", href: "#" }
  ]
};

const socials = [
  { icon: MessageCircle, href: "#" },
  { icon: Rss, href: "#" },
  { icon: Globe, href: "#" },
  { icon: Mail, href: "#" }
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black/40">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <EbayLogo size="md" animated={false} />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
              A premium marketplace pushing the boundaries of modern web commerce.
              Buy and sell with confidence.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/40 transition-all hover:border-neon-cyan/30 hover:text-neon-cyan"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/35 transition-colors hover:text-white/70"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} eBay Commerce. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/25">
            <a href="#" className="transition hover:text-white/50">Privacy</a>
            <a href="#" className="transition hover:text-white/50">Terms</a>
            <a href="#" className="transition hover:text-white/50">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
