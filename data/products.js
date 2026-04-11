// Auction end times - set to various future dates
const hours = (h) => new Date(Date.now() + h * 60 * 60 * 1000).toISOString();

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
    image: "https://picsum.photos/seed/headphones1/800/800",
    images: [
      "https://picsum.photos/seed/headphones1/800/800",
      "https://picsum.photos/seed/headphones2/800/800",
      "https://picsum.photos/seed/headphones3/800/800"
    ],
    description: "Studio-grade wireless headphones with spatial soundstage, adaptive noise cancellation, and premium build. 40-hour battery life with quick-charge.",
    features: ["Active Noise Cancellation", "40hr Battery", "Spatial Audio", "USB-C Fast Charge"],
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
    image: "https://picsum.photos/seed/watch1/800/800",
    images: [
      "https://picsum.photos/seed/watch1/800/800",
      "https://picsum.photos/seed/watch2/800/800",
      "https://picsum.photos/seed/watch3/800/800"
    ],
    description: "Titanium smartwatch with sapphire display, ECG monitor, and all-day battery. Advanced health monitoring with blood oxygen sensors.",
    features: ["Sapphire Display", "ECG Monitor", "5ATM Water Resist", "7-Day Battery"],
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
    image: "https://picsum.photos/seed/sneakers1/800/800",
    images: [
      "https://picsum.photos/seed/sneakers1/800/800",
      "https://picsum.photos/seed/sneakers2/800/800",
      "https://picsum.photos/seed/sneakers3/800/800"
    ],
    description: "Performance sneakers with reactive foam core and breathable mesh upper. Reflective details for visibility in low-light conditions.",
    features: ["Reactive Foam Core", "Breathable Mesh", "Reflective Details", "Carbon Plate"],
    colors: ["#dc2626", "#1a1a2e", "#f5f5f5"],
    inStock: true,
    auction: false
  },
  {
    id: "4",
    name: "Hydro Flask Water Bottle",
    price: 89,
    originalPrice: null,
    category: "Lifestyle",
    badge: null,
    rating: 4.5,
    reviewCount: 892,
    image: "https://picsum.photos/seed/bottle1/800/800",
    images: [
      "https://picsum.photos/seed/bottle1/800/800",
      "https://picsum.photos/seed/bottle2/800/800"
    ],
    description: "Vacuum-insulated bottle with dual-wall construction. Keeps drinks cold for 24 hours or hot for 12 hours.",
    features: ["24hr Cold / 12hr Hot", "BPA-Free", "Leak-Proof", "Dishwasher Safe"],
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
    image: "https://picsum.photos/seed/camera1/800/800",
    images: [
      "https://picsum.photos/seed/camera1/800/800",
      "https://picsum.photos/seed/camera2/800/800",
      "https://picsum.photos/seed/camera3/800/800"
    ],
    description: "Full-frame mirrorless camera with 8K video, AI autofocus, and 6.5-stop image stabilization. Professional grade.",
    features: ["8K Video", "AI Autofocus", "6.5-Stop IBIS", "Dual Card Slots"],
    colors: ["#1a1a2e"],
    inStock: true,
    auction: false
  },
  {
    id: "6",
    name: "Dyson Lightcycle Desk Lamp",
    price: 179,
    originalPrice: null,
    category: "Home",
    badge: null,
    rating: 4.6,
    reviewCount: 445,
    image: "https://picsum.photos/seed/lamp1/800/800",
    images: [
      "https://picsum.photos/seed/lamp1/800/800",
      "https://picsum.photos/seed/lamp2/800/800"
    ],
    description: "LED desk lamp with adaptive circadian lighting and touch controls. Wireless charging base included.",
    features: ["RGB Scene Modes", "Circadian Rhythm", "Touch Controls", "Wireless Charging Base"],
    colors: ["#f5f5f5", "#1a1a2e"],
    inStock: true,
    auction: false
  },
  {
    id: "7",
    name: "Razer BlackWidow V4 Keyboard",
    price: 219,
    originalPrice: null,
    category: "Tech",
    badge: "Hot",
    rating: 4.8,
    reviewCount: 1205,
    image: "https://picsum.photos/seed/keyboard1/800/800",
    images: [
      "https://picsum.photos/seed/keyboard1/800/800",
      "https://picsum.photos/seed/keyboard2/800/800",
      "https://picsum.photos/seed/keyboard3/800/800"
    ],
    description: "Mechanical keyboard with hot-swap sockets, per-key RGB, gasket mount. Premium typing experience.",
    features: ["Hot-Swap Sockets", "Per-Key RGB", "Gasket Mount", "PBT Keycaps"],
    colors: ["#1a1a2e", "#f5f5f5", "#7c3aed"],
    inStock: true,
    auction: false
  },
  {
    id: "8",
    name: "Peak Design Travel Backpack",
    price: 199,
    originalPrice: 259,
    category: "Lifestyle",
    badge: "Sale",
    rating: 4.7,
    reviewCount: 678,
    image: "https://picsum.photos/seed/backpack1/800/800",
    images: [
      "https://picsum.photos/seed/backpack1/800/800",
      "https://picsum.photos/seed/backpack2/800/800"
    ],
    description: "Weatherproof travel backpack with modular compartments, laptop sleeve, and RFID pocket.",
    features: ["Weatherproof", "Modular Compartments", "Laptop Sleeve", "RFID Pocket"],
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
    image: "https://picsum.photos/seed/earbuds1/800/800",
    images: [
      "https://picsum.photos/seed/earbuds1/800/800",
      "https://picsum.photos/seed/earbuds2/800/800"
    ],
    description: "True wireless earbuds with hybrid ANC, transparency mode, and audiophile-grade drivers. IPX5 rated.",
    features: ["Hybrid ANC", "IPX5 Waterproof", "30hr Total Battery", "Wireless Charging Case"],
    colors: ["#1a1a2e", "#f5f5f5"],
    inStock: true,
    auction: false
  },
  {
    id: "10",
    name: "Herman Miller Desk Mat",
    price: 79,
    originalPrice: 99,
    category: "Home",
    badge: "Sale",
    rating: 4.4,
    reviewCount: 312,
    image: "https://picsum.photos/seed/deskmat1/800/800",
    images: [
      "https://picsum.photos/seed/deskmat1/800/800"
    ],
    description: "Premium anti-fatigue desk mat with ergonomic design. Made from PU foam with non-slip base.",
    features: ["Anti-Fatigue Foam", "Ergonomic Design", "Non-Slip Base", "Easy Clean"],
    colors: ["#1a1a2e", "#374151"],
    inStock: true,
    auction: false
  },
  {
    id: "11",
    name: "Logitech StreamCam 4K",
    price: 149,
    originalPrice: null,
    category: "Tech",
    badge: null,
    rating: 4.5,
    reviewCount: 567,
    image: "https://picsum.photos/seed/webcam1/800/800",
    images: [
      "https://picsum.photos/seed/webcam1/800/800"
    ],
    description: "4K webcam with AI auto-framing, background blur, and low-light correction. Built-in privacy shutter.",
    features: ["4K 30fps", "AI Auto-Frame", "Built-in Privacy Shutter", "Dual Microphones"],
    colors: ["#1a1a2e"],
    inStock: true,
    auction: false
  },
  {
    id: "12",
    name: "Ray-Ban Aviator Sunglasses",
    price: 299,
    originalPrice: null,
    category: "Fashion",
    badge: "Limited",
    rating: 4.8,
    reviewCount: 156,
    image: "https://picsum.photos/seed/sunglasses1/800/800",
    images: [
      "https://picsum.photos/seed/sunglasses1/800/800",
      "https://picsum.photos/seed/sunglasses2/800/800"
    ],
    description: "Titanium-frame polarized sunglasses with photochromic lenses. Ultra-lightweight at just 18g.",
    features: ["Polarized Lenses", "Titanium Frame", "18g Ultralight", "UV Protection"],
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
    badge: "Sale",
    rating: 4.9,
    reviewCount: 834,
    image: "https://picsum.photos/seed/ipad1/800/800",
    images: [
      "https://picsum.photos/seed/ipad1/800/800",
      "https://picsum.photos/seed/ipad2/800/800"
    ],
    description: "The most powerful iPad ever with M4 chip, Liquid Retina XDR display, and all-day battery.",
    features: ["M4 Chip", "Liquid Retina XDR", "Apple Pencil Pro", "Thunderbolt"],
    colors: ["#374151", "#d4d4d8"],
    inStock: true,
    auction: false
  },
  {
    id: "14",
    name: "Bose SoundLink Flex Speaker",
    price: 129,
    originalPrice: null,
    category: "Audio",
    badge: null,
    rating: 4.6,
    reviewCount: 1023,
    image: "https://picsum.photos/seed/speaker1/800/800",
    images: [
      "https://picsum.photos/seed/speaker1/800/800",
      "https://picsum.photos/seed/speaker2/800/800"
    ],
    description: "Portable Bluetooth speaker with deep bass, IP67 waterproof rating, and 12-hour battery.",
    features: ["Deep Bass", "IP67 Waterproof", "12hr Battery", "USB-C Charging"],
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
    image: "https://picsum.photos/seed/adidas1/800/800",
    images: [
      "https://picsum.photos/seed/adidas1/800/800",
      "https://picsum.photos/seed/adidas2/800/800"
    ],
    description: "Ultralight running shoes with Boost midsole technology. Primeknit upper for sock-like fit.",
    features: ["Boost Midsole", "Primeknit Upper", "Continental Outsole", "Torsion System"],
    colors: ["#f5f5f5", "#1a1a2e", "#3b82f6"],
    inStock: true,
    auction: false
  },
  {
    id: "16",
    name: "Kindle Paperwhite Signature",
    price: 149,
    originalPrice: null,
    category: "Tech",
    badge: "New",
    rating: 4.8,
    reviewCount: 2341,
    image: "https://picsum.photos/seed/kindle1/800/800",
    images: [
      "https://picsum.photos/seed/kindle1/800/800"
    ],
    description: "E-reader with 6.8\" display, adjustable warm light, wireless charging, and 32GB storage.",
    features: ["6.8\" Display", "Warm Light", "Wireless Charging", "IPX8 Waterproof"],
    colors: ["#1a1a2e"],
    inStock: true,
    auction: false
  },

  // ── AUCTION PRODUCTS ────────────────────────────────────
  {
    id: "17",
    name: "Vintage Rolex Submariner 1968",
    price: null,
    originalPrice: null,
    category: "Wearables",
    badge: "Auction",
    rating: 5.0,
    reviewCount: 12,
    image: "https://picsum.photos/seed/rolex1/800/800",
    images: [
      "https://picsum.photos/seed/rolex1/800/800",
      "https://picsum.photos/seed/rolex2/800/800"
    ],
    description: "Rare vintage 1968 Rolex Submariner in exceptional condition. Original dial with patina, complete with box and papers.",
    features: ["Original 1968 Dial", "Patina Bezel", "Box & Papers", "Service History"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 8500,
    startingBid: 5000,
    bidCount: 23,
    endTime: hours(47),
    sellerId: "vintage_watches_nyc"
  },
  {
    id: "18",
    name: "Signed Michael Jordan Jersey",
    price: null,
    originalPrice: null,
    category: "Fashion",
    badge: "Auction",
    rating: 5.0,
    reviewCount: 5,
    image: "https://picsum.photos/seed/jersey1/800/800",
    images: [
      "https://picsum.photos/seed/jersey1/800/800",
      "https://picsum.photos/seed/jersey2/800/800"
    ],
    description: "Authentic Chicago Bulls #23 jersey signed by Michael Jordan. Includes COA from PSA/DNA authentication.",
    features: ["PSA/DNA Authenticated", "Original Tags", "Display Case Included", "Certificate of Authenticity"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 3200,
    startingBid: 1000,
    bidCount: 41,
    endTime: hours(12),
    sellerId: "sports_memorabilia_co"
  },
  {
    id: "19",
    name: "1st Gen iPhone (2007) Sealed",
    price: null,
    originalPrice: null,
    category: "Tech",
    badge: "Auction",
    rating: 5.0,
    reviewCount: 3,
    image: "https://picsum.photos/seed/iphone2007/800/800",
    images: [
      "https://picsum.photos/seed/iphone2007/800/800"
    ],
    description: "Factory-sealed original iPhone from 2007. 8GB model in pristine, unopened condition. Museum-quality collectible.",
    features: ["Factory Sealed", "8GB Model", "Original Packaging", "Investment Grade"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 25000,
    startingBid: 15000,
    bidCount: 18,
    endTime: hours(72),
    sellerId: "tech_collectors"
  },
  {
    id: "20",
    name: "Leica M6 Film Camera Body",
    price: null,
    originalPrice: null,
    category: "Tech",
    badge: "Auction",
    rating: 4.9,
    reviewCount: 8,
    image: "https://picsum.photos/seed/leica1/800/800",
    images: [
      "https://picsum.photos/seed/leica1/800/800",
      "https://picsum.photos/seed/leica2/800/800"
    ],
    description: "Classic Leica M6 rangefinder body in black chrome. Recently CLA'd, light meter accurate. The photographer's dream.",
    features: ["Black Chrome", "CLA Serviced", "Accurate Meter", "Original Strap"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 2800,
    startingBid: 2000,
    bidCount: 15,
    endTime: hours(24),
    sellerId: "analog_photo_shop"
  },
  {
    id: "21",
    name: "Rare Pokemon Charizard 1st Edition",
    price: null,
    originalPrice: null,
    category: "Lifestyle",
    badge: "Auction",
    rating: 5.0,
    reviewCount: 2,
    image: "https://picsum.photos/seed/pokemon1/800/800",
    images: [
      "https://picsum.photos/seed/pokemon1/800/800"
    ],
    description: "PSA 9 Mint 1st Edition Base Set Charizard Holo #4. One of the most sought-after trading cards in existence.",
    features: ["PSA 9 Mint", "1st Edition", "Base Set Holo", "Investment Grade"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 45000,
    startingBid: 30000,
    bidCount: 34,
    endTime: hours(96),
    sellerId: "card_vault_premium"
  },
  {
    id: "22",
    name: "Vintage Gibson Les Paul 1959",
    price: null,
    originalPrice: null,
    category: "Audio",
    badge: "Auction",
    rating: 5.0,
    reviewCount: 6,
    image: "https://picsum.photos/seed/guitar1/800/800",
    images: [
      "https://picsum.photos/seed/guitar1/800/800",
      "https://picsum.photos/seed/guitar2/800/800"
    ],
    description: "Holy grail 1959 Gibson Les Paul Standard in Sunburst finish. All original parts with case. The most coveted electric guitar.",
    features: ["All Original Parts", "Sunburst Finish", "PAF Pickups", "Original Case"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 185000,
    startingBid: 100000,
    bidCount: 12,
    endTime: hours(168),
    sellerId: "vintage_guitar_vault"
  },
  {
    id: "23",
    name: "DJI Mavic 3 Pro Drone",
    price: 899,
    originalPrice: 1049,
    category: "Tech",
    badge: "Sale",
    rating: 4.7,
    reviewCount: 312,
    image: "https://picsum.photos/seed/drone1/800/800",
    images: [
      "https://picsum.photos/seed/drone1/800/800",
      "https://picsum.photos/seed/drone2/800/800"
    ],
    description: "Professional drone with Hasselblad camera, 46-min flight time, and omnidirectional obstacle sensing.",
    features: ["Hasselblad Camera", "46min Flight", "5.1K Video", "Obstacle Avoidance"],
    colors: ["#374151"],
    inStock: true,
    auction: false
  },
  {
    id: "24",
    name: "Le Creuset Dutch Oven 5.5qt",
    price: 369,
    originalPrice: null,
    category: "Home",
    badge: "Best Seller",
    rating: 4.9,
    reviewCount: 1876,
    image: "https://picsum.photos/seed/lecreuset1/800/800",
    images: [
      "https://picsum.photos/seed/lecreuset1/800/800"
    ],
    description: "Iconic enameled cast iron Dutch oven. Superior heat retention for braising, roasting, and baking.",
    features: ["Enameled Cast Iron", "5.5qt Capacity", "Oven Safe 500°F", "Lifetime Warranty"],
    colors: ["#dc2626", "#1e3a5f", "#f5f5f5"],
    inStock: true,
    auction: false
  }
];

export const categories = ["All", ...new Set(products.map((p) => p.category))];

export default products;
