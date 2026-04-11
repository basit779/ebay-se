"use client";

import { Zap, Shield, Truck, Star, Award, Clock } from "lucide-react";

const items = [
  { icon: Truck, text: "Free Shipping Worldwide" },
  { icon: Shield, text: "2-Year Warranty" },
  { icon: Star, text: "4.9 Average Rating" },
  { icon: Zap, text: "Lightning Fast Delivery" },
  { icon: Award, text: "Premium Quality" },
  { icon: Clock, text: "24/7 Support" }
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/[0.04] bg-white/[0.01] py-4">
      <div className="marquee-track">
        {doubled.map(({ icon: Icon, text }, i) => (
          <div key={i} className="flex items-center gap-2 px-8 text-sm text-white/30">
            <Icon size={14} className="text-neon-cyan/50" />
            <span className="whitespace-nowrap font-medium">{text}</span>
            <span className="ml-6 text-white/10">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
