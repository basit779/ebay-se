/**
 * Per-category spec templates + a mock seller profile, so the product
 * detail page has something substantive to show even when the raw data
 * only has name/price/description.
 */

const SPECS_BY_CATEGORY = {
  Audio: [
    { label: "Driver", value: "40mm dynamic" },
    { label: "Connectivity", value: "Bluetooth 5.3 · LDAC · USB-C" },
    { label: "Battery", value: "Up to 30 hours (ANC on)" },
    { label: "Weight", value: "250 g" },
    { label: "Warranty", value: "2 years · FluxBid verified" }
  ],
  Wearables: [
    { label: "Case", value: "Titanium, 49mm" },
    { label: "Display", value: "Always-on Retina · 3000 nits" },
    { label: "Water resistance", value: "WR100 · dive certified" },
    { label: "Battery", value: "36 hours typical" },
    { label: "Warranty", value: "1 year · extendable" }
  ],
  Fashion: [
    { label: "Material", value: "Italian full-grain leather" },
    { label: "Lining", value: "Premium cotton twill" },
    { label: "Hardware", value: "Solid brass, hand-polished" },
    { label: "Care", value: "Conditioning kit included" },
    { label: "Origin", value: "Florence, Italy" }
  ],
  Lifestyle: [
    { label: "Material", value: "Aerospace-grade aluminium" },
    { label: "Finish", value: "Anodised matte" },
    { label: "Dimensions", value: "240 × 160 × 45 mm" },
    { label: "Weight", value: "Light enough for daily carry" },
    { label: "Origin", value: "Designed in California" }
  ],
  Tech: [
    { label: "Processor", value: "Latest-gen · custom silicon" },
    { label: "Memory", value: "16 GB unified" },
    { label: "Storage", value: "512 GB SSD · upgradeable" },
    { label: "Ports", value: "Thunderbolt 4 · HDMI 2.1" },
    { label: "Warranty", value: "2 years · priority support" }
  ],
  Home: [
    { label: "Frame", value: "Solid oak · hand-finished" },
    { label: "Textile", value: "OEKO-TEX certified weave" },
    { label: "Assembly", value: "White-glove delivery available" },
    { label: "Care", value: "Spot clean · vacuum weekly" },
    { label: "Guarantee", value: "Lifetime frame warranty" }
  ],
  Sports: [
    { label: "Upper", value: "Engineered breathable mesh" },
    { label: "Midsole", value: "Responsive full-length foam" },
    { label: "Traction", value: "Rubber lug outsole" },
    { label: "Weight", value: "280 g (size US 9)" },
    { label: "Use", value: "Training · road · trail-ready" }
  ],
  Collectibles: [
    { label: "Provenance", value: "Documented chain of custody" },
    { label: "Authentication", value: "PSA/JSA certified" },
    { label: "Condition", value: "Graded & archived" },
    { label: "Packaging", value: "Archival-grade case included" },
    { label: "Insurance", value: "Full transit cover to buyer" }
  ],
  Art: [
    { label: "Medium", value: "Mixed media on archival paper" },
    { label: "Dimensions", value: "Framed · 60 × 80 cm" },
    { label: "Edition", value: "Limited, numbered & signed" },
    { label: "Framing", value: "Museum glass · UV-filtered" },
    { label: "Certificate", value: "Included with purchase" }
  ],
  Other: [
    { label: "Materials", value: "Premium, responsibly sourced" },
    { label: "Finish", value: "Hand-inspected" },
    { label: "Packaging", value: "Protected & insured shipping" },
    { label: "Returns", value: "30-day hassle-free" },
    { label: "Warranty", value: "1 year · FluxBid verified" }
  ]
};

export function getSpecsForProduct(product) {
  if (!product) return [];
  const list = SPECS_BY_CATEGORY[product.category] || SPECS_BY_CATEGORY.Other;
  return list;
}

const SELLERS = [
  { name: "Atelier Nord", city: "Copenhagen", rating: 4.9, sales: "12.4k", years: 6 },
  { name: "Halcyon Studio", city: "Kyoto", rating: 4.95, sales: "8.1k", years: 5 },
  { name: "Maison Verdi", city: "Milan", rating: 4.85, sales: "21.7k", years: 9 },
  { name: "North Cove Co.", city: "Portland", rating: 4.92, sales: "6.3k", years: 4 },
  { name: "The Obsidian Room", city: "London", rating: 4.97, sales: "3.8k", years: 3 }
];

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export function getSellerForProduct(product) {
  if (!product) return SELLERS[0];
  if (product.seller) return { ...SELLERS[0], ...product.seller };
  const idx = simpleHash(String(product.id || "0")) % SELLERS.length;
  return SELLERS[idx];
}

export function getHighlightsForProduct(product) {
  // Short bullet highlights used under the title — fallback narrative
  // when a product doesn't provide features of its own.
  if (product?.features?.length) return product.features;
  return [
    "Authenticated by FluxBid before shipment",
    "Hand-inspected and documented",
    "Insured international delivery",
    "30-day buyer protection"
  ];
}
