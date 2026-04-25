"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { RevealText, FadeUp } from "@/components/TextReveal";

const faqs = [
  {
    q: "How does the bidding system work?",
    a: "Place your bid on any live auction item — the highest bidder when the timer ends wins. You'll be notified by email if you're outbid or if you win. All bids are binding."
  },
  {
    q: "Are sellers verified?",
    a: "Yes. Every seller goes through identity verification, and items over $1,000 require authentication from our in-house experts. Collectibles are authenticated by PSA/DNA, JSA, or equivalent."
  },
  {
    q: "What's the return policy?",
    a: "30-day returns on all standard items. Auction purchases are final sale, but if an item arrives not as described, our Buyer Protection guarantees a full refund."
  },
  {
    q: "How much does shipping cost?",
    a: "Free shipping on orders over $50. Under that, standard shipping starts at $5.99. Express and international rates are calculated at checkout. All packages are insured."
  },
  {
    q: "Can I sell my own items?",
    a: "Absolutely. Create a seller account, verify your identity, and list in under 5 minutes. During early access, we charge 0% commission — no listing fees, no monthly charges."
  },
  {
    q: "How secure are payments?",
    a: "All payments are SSL-encrypted and processed through Stripe. For high-value auctions, we use escrow until the item is delivered and authenticated by the buyer."
  }
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.04 }}
      className="border-b border-white/[0.06]"
    >
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between py-7 text-left transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-champagne-100"
      >
        <span className="font-serif text-xl font-semibold tracking-tight md:text-2xl">{faq.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`ml-6 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen
              ? "border-champagne-400/50 bg-champagne-400/12 text-champagne-200"
              : "border-white/10 bg-white/[0.02] text-white/55 group-hover:border-champagne-400/30 group-hover:text-champagne-200"
          }`}
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-[14px] leading-[1.8] text-white/60 md:text-[15px] md:pr-12">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 md:px-8">
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <FadeUp>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne-400/80">
              Questions
            </p>
          </FadeUp>
          <RevealText delay={0.1}>
            <h2 className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              Frequently
              <br />
              <span className="italic text-champagne-300">
                asked.
              </span>
            </h2>
          </RevealText>
          <FadeUp delay={0.2}>
            <p className="mt-6 text-[15px] leading-[1.8] text-white/55">
              Everything you need to know before buying, selling, or bidding.
              Can&rsquo;t find what you&rsquo;re looking for?{" "}
              <a href="#" className="text-champagne-300 underline-offset-4 hover:underline">
                Contact support
              </a>
              .
            </p>
          </FadeUp>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
