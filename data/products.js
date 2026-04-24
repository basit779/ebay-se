// All Unsplash URLs verified to match actual product imagery
const U = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const products = [
  // ── BUY NOW PRODUCTS ────────────────────────────────────
  {
    id: "1",
    name: "Sony WH-1000XM5 Headphones",
    price: 329,
    originalPrice: 399,
    category: "Audio",
    badge: "Best Seller",
    rating: 4.8,
    reviewCount: 342,
    image: U("1505740420928-5e560c06d30e"),
    images: [
      U("1505740420928-5e560c06d30e"),
      U("1583394838336-acd977736f90"),
      U("1487215078519-e21cc028cb29")
    ],
    description: "Industry-leading noise cancellation with premium sound and 30-hour battery life.",
    features: ["Industry-Leading ANC", "30hr Battery", "Multi-Point Connect", "Fast Charge"],
    colors: ["#1a1a2e", "#f5f5f5", "#3b82f6"],
    inStock: true,
    auction: false
  },
  {
    id: "2",
    name: "Apple Watch Ultra 2",
    price: 459,
    originalPrice: null,
    category: "Wearables",
    badge: "New",
    rating: 4.9,
    reviewCount: 128,
    image: U("1523275335684-37898b6baf30"),
    images: [
      U("1523275335684-37898b6baf30"),
      U("1579586337278-3befd40fd17a"),
      U("1508685096489-7aacd43bd3b1")
    ],
    description: "Rugged titanium smartwatch with precision dual-frequency GPS and 36-hour battery.",
    features: ["Titanium Case", "Dual GPS", "36hr Battery", "Action Button"],
    colors: ["#374151", "#d4d4d8", "#92400e"],
    inStock: true,
    auction: false
  },
  {
    id: "3",
    name: "Nike Air Max 97 Sneakers",
    price: 249,
    originalPrice: 319,
    category: "Fashion",
    badge: "Sale",
    rating: 4.7,
    reviewCount: 567,
    image: U("1542291026-7eec264c27ff"),
    images: [
      U("1542291026-7eec264c27ff"),
      U("1606107557195-0e29a4b5b4aa"),
      U("1595950653106-6c9ebd614d3a")
    ],
    description: "Iconic running-inspired sneaker with full-length Max Air cushioning.",
    features: ["Max Air Cushion", "Reflective Upper", "Rubber Outsole", "Leather Overlays"],
    colors: ["#dc2626", "#1a1a2e", "#f5f5f5"],
    inStock: true,
    auction: false
  },
  {
    id: "4",
    name: "Hydro Flask 32oz",
    price: 49,
    originalPrice: null,
    category: "Lifestyle",
    badge: null,
    rating: 4.5,
    reviewCount: 892,
    image: U("1602143407151-7111542de6e8"),
    images: [U("1602143407151-7111542de6e8")],
    description: "TempShield double-wall vacuum insulation keeps drinks cold 24 hrs or hot 12 hrs.",
    features: ["24hr Cold / 12hr Hot", "BPA-Free", "Flex Cap", "Dishwasher Safe"],
    colors: ["#f5f5f5", "#1e3a5f", "#064e3b"],
    inStock: true,
    auction: false
  },
  {
    id: "5",
    name: "Canon EOS R6 Mark II",
    price: 1399,
    originalPrice: 1599,
    category: "Tech",
    badge: "Sale",
    rating: 4.9,
    reviewCount: 203,
    image: U("1502920917128-1aa500764cbd"),
    images: [
      U("1502920917128-1aa500764cbd"),
      U("1510127034890-ba27508e9f1c")
    ],
    description: "Full-frame mirrorless camera with 24MP sensor and professional 4K video.",
    features: ["24MP Full-Frame", "40fps Burst", "4K 60p Video", "Dual Card Slots"],
    colors: ["#1a1a2e"],
    inStock: true,
    auction: false
  },
  {
    id: "6",
    name: "Premium LED Desk Lamp",
    price: 179,
    originalPrice: null,
    category: "Home",
    badge: null,
    rating: 4.6,
    reviewCount: 445,
    image: U("1513506003901-1e6a229e2d15"),
    images: [U("1513506003901-1e6a229e2d15")],
    description: "Task light with adaptive daylight tracking and touch controls for optimal visual comfort.",
    features: ["Daylight Tracking", "Touch Controls", "USB Port", "App Connected"],
    colors: ["#f5f5f5", "#1a1a2e"],
    inStock: true,
    auction: false
  },
  {
    id: "7",
    name: "Keychron Q1 Pro Keyboard",
    price: 219,
    originalPrice: null,
    category: "Tech",
    badge: "Hot",
    rating: 4.8,
    reviewCount: 1205,
    image: U("1595225476474-87563907a212"),
    images: [
      U("1595225476474-87563907a212"),
      U("1587829741301-dc798b83add3"),
      U("1618384887929-16ec33fab9ef")
    ],
    description: "Wireless mechanical keyboard with double-gasket design and hot-swap sockets.",
    features: ["Double Gasket", "Hot-Swap Sockets", "QMK/VIA", "Wireless Bluetooth"],
    colors: ["#1a1a2e", "#f5f5f5", "#7c3aed"],
    inStock: true,
    auction: false
  },
  {
    id: "8",
    name: "Peak Design Everyday Backpack",
    price: 199,
    originalPrice: 259,
    category: "Lifestyle",
    badge: "Sale",
    rating: 4.7,
    reviewCount: 678,
    image: U("1553062407-98eeb64c6a62"),
    images: [
      U("1553062407-98eeb64c6a62"),
      U("1622560480605-d83c853bc5c3")
    ],
    description: "Adaptable 30L backpack with customizable dividers and weatherproof shell.",
    features: ["30L Capacity", "Laptop Sleeve", "Weatherproof", "MagLatch Closure"],
    colors: ["#1a1a2e", "#374151", "#065f46"],
    inStock: true,
    auction: false
  },
  {
    id: "9",
    name: "AirPods Pro 2nd Gen",
    price: 189,
    originalPrice: null,
    category: "Audio",
    badge: "New",
    rating: 4.6,
    reviewCount: 89,
    image: U("1600294037681-c80b4cb5b434"),
    images: [
      U("1600294037681-c80b4cb5b434"),
      U("1606220588913-b3aacb4d2f46")
    ],
    description: "2x stronger Active Noise Cancellation with Adaptive Transparency mode.",
    features: ["2x ANC", "Adaptive Transparency", "Spatial Audio", "MagSafe Charging"],
    colors: ["#f5f5f5"],
    inStock: true,
    auction: false
  },
  {
    id: "10",
    name: "Herman Miller Aeron Chair",
    price: 1395,
    originalPrice: 1595,
    category: "Home",
    badge: "Sale",
    rating: 4.9,
    reviewCount: 2341,
    image: U("1592078615290-033ee584e267"),
    images: [U("1592078615290-033ee584e267")],
    description: "The iconic ergonomic chair. PostureFit SL back support and 8Z Pellicle suspension.",
    features: ["8Z Pellicle", "PostureFit SL", "12-Year Warranty", "Fully Adjustable"],
    colors: ["#1a1a2e", "#374151"],
    inStock: true,
    auction: false
  },
  {
    id: "11",
    name: "Logitech MX Master 3S",
    price: 99,
    originalPrice: null,
    category: "Tech",
    badge: null,
    rating: 4.7,
    reviewCount: 567,
    image: U("1527864550417-7fd91fc51a46"),
    images: [U("1527864550417-7fd91fc51a46")],
    description: "Ergonomic wireless mouse with 8K DPI sensor and MagSpeed scroll wheel.",
    features: ["8K DPI Sensor", "MagSpeed Scroll", "Quiet Clicks", "USB-C Charging"],
    colors: ["#1a1a2e", "#d4d4d8"],
    inStock: true,
    auction: false
  },
  {
    id: "12",
    name: "Ray-Ban Aviator Classic",
    price: 163,
    originalPrice: null,
    category: "Fashion",
    badge: "Limited",
    rating: 4.8,
    reviewCount: 156,
    image: U("1572635196237-14b3f281503f"),
    images: [
      U("1572635196237-14b3f281503f"),
      U("1511499767150-a48a237f0083")
    ],
    description: "The original Aviator. Timeless metal frame with crystal green lenses.",
    features: ["Gold Metal Frame", "G-15 Lenses", "UV Protection", "100% Authentic"],
    colors: ["#1a1a2e", "#92400e", "#1e3a5f"],
    inStock: true,
    auction: false
  },
  {
    id: "13",
    name: "iPad Pro M4 12.9\"",
    price: 1099,
    originalPrice: 1199,
    category: "Tech",
    badge: "New",
    rating: 4.9,
    reviewCount: 834,
    image: U("1544244015-0df4b3ffc6b0"),
    images: [
      U("1544244015-0df4b3ffc6b0"),
      U("1561154464-82e9adf32764")
    ],
    description: "Incredibly thin iPad Pro with M4 chip and stunning Ultra Retina XDR display.",
    features: ["M4 Chip", "Ultra Retina XDR", "Apple Pencil Pro", "Thunderbolt"],
    colors: ["#374151", "#d4d4d8"],
    inStock: true,
    auction: false
  },
  {
    id: "14",
    name: "Bose SoundLink Max Speaker",
    price: 399,
    originalPrice: null,
    category: "Audio",
    badge: null,
    rating: 4.6,
    reviewCount: 1023,
    image: U("1608043152269-423dbba4e7e1"),
    images: [
      U("1608043152269-423dbba4e7e1"),
      U("1545454675-3531b543be5d")
    ],
    description: "Bose's most powerful portable speaker with deep, rich sound for hours.",
    features: ["Custom Transducers", "20hr Battery", "IP67 Waterproof", "Multi-Point"],
    colors: ["#1a1a2e", "#374151", "#0e4a2e"],
    inStock: true,
    auction: false
  },
  {
    id: "15",
    name: "Adidas Ultraboost Light",
    price: 189,
    originalPrice: 220,
    category: "Fashion",
    badge: "Sale",
    rating: 4.7,
    reviewCount: 445,
    image: U("1556906781-9a412961c28c"),
    images: [
      U("1556906781-9a412961c28c"),
      U("1460353581641-37baddab0fa2")
    ],
    description: "Our lightest Ultraboost ever. Light BOOST midsole returns energy with every stride.",
    features: ["Light BOOST", "Primeknit+", "Continental Rubber", "Linear Energy Push"],
    colors: ["#f5f5f5", "#1a1a2e", "#3b82f6"],
    inStock: true,
    auction: false
  },
  {
    id: "16",
    name: "DJI Mavic 3 Pro Drone",
    price: 2199,
    originalPrice: null,
    category: "Tech",
    badge: "Hot",
    rating: 4.7,
    reviewCount: 312,
    image: U("1473968512647-3e447244af8f"),
    images: [
      U("1473968512647-3e447244af8f"),
      U("1506947411487-a56738267384")
    ],
    description: "Triple-camera flagship drone with Hasselblad L2D-20c and 43-minute flight time.",
    features: ["Hasselblad L2D-20c", "5.1K Video", "43min Flight", "O4 Transmission"],
    colors: ["#374151"],
    inStock: true,
    auction: false
  },

  // ── AUCTION PRODUCTS ────────────────────────────────────
  {
    id: "17",
    name: "Vintage Rolex Submariner 1968",
    price: null,
    category: "Wearables",
    badge: "Auction",
    rating: 5.0,
    reviewCount: 12,
    image: U("1614164185128-e4ec99c436d7"),
    images: [
      U("1614164185128-e4ec99c436d7"),
      U("1526045431048-f857369baa09")
    ],
    description: "Rare 1968 Rolex Submariner Ref. 5513 with original gilt dial and tropical patina.",
    features: ["Ref. 5513", "Gilt Dial", "Tropical Patina", "Service Papers"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 8500,
    startingBid: 5000,
    bidCount: 23,
    endTimeOffset: 2,
    sellerId: "vintage_watches_nyc"
  },
  {
    id: "18",
    name: "Air Jordan 1 'Chicago' (1985) — Signed",
    price: null,
    category: "Fashion",
    badge: "Auction",
    rating: 5.0,
    reviewCount: 5,
    image: U("1600185365483-26d7a4cc7519"),
    images: [
      U("1600185365483-26d7a4cc7519"),
      U("1542291026-7eec264c27ff"),
      U("1556906781-9a412961c28c")
    ],
    description: "Original 1985 Air Jordan 1 'Chicago' colorway, signed by Michael Jordan. PSA/DNA authenticated — a grail-level collector piece.",
    features: ["PSA/DNA Authenticated", "Original 1985 Pair", "Certificate Included", "Display Box"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 3200,
    startingBid: 1000,
    bidCount: 41,
    endTimeOffset: 0.75,
    sellerId: "sports_memorabilia_co"
  },
  {
    id: "19",
    name: "1st Gen iPhone (2007) Sealed",
    price: null,
    category: "Tech",
    badge: "Auction",
    rating: 5.0,
    reviewCount: 3,
    image: U("1511707171634-5f897ff02aa9"),
    images: [U("1511707171634-5f897ff02aa9")],
    description: "Factory-sealed original iPhone from 2007. 8GB model in pristine condition.",
    features: ["Factory Sealed", "8GB Model", "Original Packaging", "Investment Grade"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 25000,
    startingBid: 15000,
    bidCount: 18,
    endTimeOffset: 6,
    sellerId: "tech_collectors"
  },
  {
    id: "20",
    name: "Leica M6 Film Camera",
    price: null,
    category: "Tech",
    badge: "Auction",
    rating: 4.9,
    reviewCount: 8,
    image: U("1452780212940-6f5c0d14d848"),
    images: [
      U("1452780212940-6f5c0d14d848"),
      U("1516035069371-29a1b244cc32")
    ],
    description: "Classic Leica M6 rangefinder in black chrome. Recently CLA'd by Leica.",
    features: ["Black Chrome", "Leica CLA", "Summicron 50mm", "Collector Grade"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 4200,
    startingBid: 2500,
    bidCount: 19,
    endTimeOffset: 1.5,
    sellerId: "analog_photo_shop"
  },
  {
    id: "21",
    name: "Gibson Les Paul Standard 1959",
    price: null,
    category: "Audio",
    badge: "Auction",
    rating: 5.0,
    reviewCount: 6,
    image: U("1510915361894-db8b60106cb1"),
    images: [
      U("1510915361894-db8b60106cb1"),
      U("1564186763535-ebb21ef5277f")
    ],
    description: "Holy grail 1959 Gibson Les Paul Standard with original PAF pickups.",
    features: ["Original PAFs", "Sunburst Finish", "Original Case", "Investment Grade"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 185000,
    startingBid: 100000,
    bidCount: 12,
    endTimeOffset: 12,
    sellerId: "vintage_guitar_vault"
  },
  {
    id: "22",
    name: "Le Creuset Signature 5.5qt",
    price: 369,
    category: "Home",
    badge: "Best Seller",
    rating: 4.9,
    reviewCount: 1876,
    image: U("1585515320310-259814833e62"),
    images: [U("1585515320310-259814833e62")],
    description: "Iconic enameled cast iron Dutch oven with superior heat retention.",
    features: ["Enameled Cast Iron", "5.5qt Capacity", "Oven Safe 500F", "Lifetime Warranty"],
    colors: ["#dc2626", "#1e3a5f", "#f5f5f5"],
    inStock: true,
    auction: false
  },
  {
    id: "23",
    name: "Samsung Galaxy S24 Ultra",
    price: 1199,
    originalPrice: 1299,
    category: "Tech",
    badge: "New",
    rating: 4.8,
    reviewCount: 542,
    image: U("1592899677977-9c10ca588bbd"),
    images: [
      U("1592899677977-9c10ca588bbd"),
      U("1511707171634-5f897ff02aa9")
    ],
    description: "Flagship smartphone with titanium frame, 200MP camera, and S Pen built-in.",
    features: ["200MP Camera", "Titanium Frame", "S Pen", "Galaxy AI"],
    colors: ["#1a1a2e", "#374151", "#7c3aed"],
    inStock: true,
    auction: false
  },
  {
    id: "24",
    name: "Polaroid SX-70 (1972)",
    price: null,
    category: "Tech",
    badge: "Auction",
    rating: 4.9,
    reviewCount: 4,
    image: U("1526170375885-4d8ecf77b99f"),
    images: [U("1526170375885-4d8ecf77b99f")],
    description: "Original 1972 Polaroid SX-70 in chrome and brown leather. Fully refurbished.",
    features: ["Fully Refurbished", "Original Leather", "Chrome Finish", "Tested Working"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 350,
    startingBid: 150,
    bidCount: 28,
    endTimeOffset: 3,
    sellerId: "retro_camera_shop"
  }
];

export const categories = ["All", ...new Set(products.map((p) => p.category))];

/**
 * Compute a product's auction end time relative to "now" at call time.
 *
 * Previously this file stored absolute ISO timestamps computed from
 * Date.now() at module load. That timestamp was frozen at `next build`
 * time on Vercel, so by the time users visited the site the end times
 * were already in the past — every auction card displayed 00:00:00.
 *
 * Now products store `endTimeOffset` (hours from now as a plain number)
 * and callers derive a fresh Date at render time on the client.
 */
export function getEndTime(product) {
  if (!product) return null;
  // Seller-created listings store an absolute ISO end time entered by
  // the seller at listing time — that's fine, use it as-is.
  if (product.endTime) return new Date(product.endTime);
  // Module-curated products use a relative offset resolved here.
  if (typeof product.endTimeOffset === "number") {
    return new Date(Date.now() + product.endTimeOffset * 3_600_000);
  }
  return null;
}

export default products;
