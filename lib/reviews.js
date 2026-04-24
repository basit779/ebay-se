/**
 * Deterministic mock reviews per product.
 * Uses a simple string-hash of the product id to pick 4 reviews from
 * a category-aware pool, so each product surfaces a consistent but
 * distinct review set on every render.
 */

// Shared pool — tagged by category for relevance. Tag "*" = generic.
const POOL = [
  { tag: "Audio", stars: 5, title: "Studio-grade sound at home.", name: "Maya K.", when: "3 days ago",
    body: "Plugged it in, sat down, and genuinely forgot I was listening through cans. The detail in the high-mids is unreal." },
  { tag: "Audio", stars: 5, title: "ANC is the real deal.", name: "Dante L.", when: "1 week ago",
    body: "I ride the subway twice a day. These cancel the roar completely and make audiobooks sound like they're in my head." },
  { tag: "Audio", stars: 4, title: "Love them, battery is just fine.", name: "Ivy R.", when: "2 weeks ago",
    body: "Only reason I'm not giving 5 stars: battery drains faster than spec. Still 20+ hours, but not 30. Sound is flawless." },

  { tag: "Wearables", stars: 5, title: "Actually changed my routine.", name: "Sam P.", when: "5 days ago",
    body: "Sleep tracking convinced me to fix my bedtime. A week in and I'm hitting 7 hours consistently for the first time in years." },
  { tag: "Wearables", stars: 5, title: "Rugged. Stylish. Quiet.", name: "Noah T.", when: "3 weeks ago",
    body: "Survived a week of climbing + a thunderstorm. Battery didn't flinch. Titanium case feels like carrying a piece of watchmaking, not a gadget." },

  { tag: "Fashion", stars: 5, title: "Fits like tailor-made.", name: "Jade H.", when: "6 days ago",
    body: "Ordered my usual size and it was exactly right out of the box. Stitching and finish feel noticeably premium — zero break-in needed." },
  { tag: "Fashion", stars: 4, title: "Statement piece.", name: "Eli O.", when: "2 weeks ago",
    body: "Got three compliments the first day I wore it. Single star off for the packaging — could've been cleaner for the price." },

  { tag: "Tech", stars: 5, title: "Worth the upgrade.", name: "Aurora M.", when: "4 days ago",
    body: "Set-up took five minutes. Everything from the keyboard feel to the app ecosystem is clearly built by people who care." },
  { tag: "Tech", stars: 5, title: "Quiet, fast, reliable.", name: "Rhys B.", when: "2 weeks ago",
    body: "Been my daily driver for a month. No quirks, no hangs. This is what every piece of tech should feel like." },
  { tag: "Tech", stars: 4, title: "One niggle, still a keeper.", name: "Vanessa S.", when: "1 month ago",
    body: "Performance is stellar. Cable routing could be more thoughtful, but that's a tiny gripe for the build quality overall." },

  { tag: "Home", stars: 5, title: "Rooms feel warmer.", name: "Leo D.", when: "1 week ago",
    body: "Didn't expect to be emotional about a household object. The craftsmanship shows — this is clearly built to be handed down." },
  { tag: "Home", stars: 5, title: "Reframes a space.", name: "Priya N.", when: "3 weeks ago",
    body: "Moved three pieces of furniture around once it arrived just to give it a proper showcase. That good." },

  { tag: "Sports", stars: 5, title: "Outperforms the hype.", name: "Marcus J.", when: "1 week ago",
    body: "Trained six sessions with it already. Zero slip, zero rub, zero complaints. Might order a second to keep in the gym bag." },

  { tag: "Collectibles", stars: 5, title: "Museum-grade presentation.", name: "Clara F.", when: "2 weeks ago",
    body: "Arrived in a case that felt like it belonged in a vault. Provenance paperwork was thorough. You can feel the curation." },
  { tag: "Collectibles", stars: 5, title: "Rare find, perfect condition.", name: "Oscar V.", when: "1 month ago",
    body: "Been hunting this exact piece for three years. Seller's description was word-for-word accurate. Trustworthy end to end." },

  { tag: "Art", stars: 5, title: "Better in person.", name: "Nora W.", when: "10 days ago",
    body: "Photos don't capture the texture. The framing choice was thoughtful — obvious that whoever packed this cares about the work." },

  // Generic — ready for any product
  { tag: "*", stars: 5, title: "Worth every dollar.", name: "John D.", when: "2 weeks ago",
    body: "Packaging was immaculate and the item exceeded the listing photos. Fast shipping too. Can't recommend FluxBid enough." },
  { tag: "*", stars: 5, title: "Exceeded expectations.", name: "Amy R.", when: "1 month ago",
    body: "Second purchase here and they're consistent — authenticity guaranteed, beautiful finish, and support replied in under an hour." },
  { tag: "*", stars: 4, title: "Premium feel, pricey.", name: "Marcus L.", when: "1 month ago",
    body: "Quality is top-shelf. Wish the price point were a touch friendlier, but the craftsmanship justifies it." },
  { tag: "*", stars: 5, title: "A conversation piece.", name: "Priya S.", when: "2 months ago",
    body: "Everyone who visits asks about it. Shipped fully insured and arrived sooner than the stated window." },
  { tag: "*", stars: 4, title: "Very good, small quibble.", name: "Jules C.", when: "5 weeks ago",
    body: "Great item. The product page could be more detailed on dimensions, but customer service answered in minutes." },
  { tag: "*", stars: 5, title: "Will buy from FluxBid again.", name: "Ren S.", when: "7 weeks ago",
    body: "Smoothest luxury-item purchase I've done online. Tracking, delivery window, and condition all matched what was promised." }
];

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

/**
 * Return 4 reviews for a product. Prefers reviews tagged with the
 * product's category (up to 2) and fills the rest from the generic
 * pool. Picks are deterministic per product id so the same product
 * always shows the same reviews.
 */
export function getReviewsForProduct(product) {
  if (!product) return [];
  const seed = hash(String(product.id));
  const catPool = POOL.filter((r) => r.tag === product.category);
  const genericPool = POOL.filter((r) => r.tag === "*");

  const pick = (pool, count, offset = 0) => {
    if (pool.length === 0) return [];
    const out = [];
    for (let i = 0; i < count && i < pool.length; i++) {
      out.push(pool[(seed + offset + i * 7) % pool.length]);
    }
    // De-duplicate by name in case modular math collides
    const seen = new Set();
    return out.filter((r) => {
      if (seen.has(r.name)) return false;
      seen.add(r.name);
      return true;
    });
  };

  const catPicks = pick(catPool, 2);
  const needed = 4 - catPicks.length;
  const genericPicks = pick(genericPool, needed + 1, 3);

  // Merge, de-dup, trim to 4
  const seen = new Set(catPicks.map((r) => r.name));
  const merged = [...catPicks];
  for (const r of genericPicks) {
    if (merged.length >= 4) break;
    if (!seen.has(r.name)) {
      seen.add(r.name);
      merged.push(r);
    }
  }
  return merged.slice(0, 4);
}

/**
 * Rating distribution buckets — also seeded by id so it varies
 * plausibly per product but stays consistent across renders.
 */
export function getRatingBuckets(product) {
  if (!product) return [];
  const seed = hash(String(product.id) + "-dist");
  // Three plausible distributions, picked by seed
  const presets = [
    [{ star: 5, pct: 78 }, { star: 4, pct: 14 }, { star: 3, pct: 5 }, { star: 2, pct: 2 }, { star: 1, pct: 1 }],
    [{ star: 5, pct: 71 }, { star: 4, pct: 20 }, { star: 3, pct: 6 }, { star: 2, pct: 2 }, { star: 1, pct: 1 }],
    [{ star: 5, pct: 82 }, { star: 4, pct: 12 }, { star: 3, pct: 4 }, { star: 2, pct: 1 }, { star: 1, pct: 1 }]
  ];
  return presets[seed % presets.length];
}
