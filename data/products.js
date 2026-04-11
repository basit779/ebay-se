const products = [
  {
    id: "1",
    name: "Aether Pulse Headphones",
    price: 329,
    originalPrice: 399,
    category: "Audio",
    badge: "Best Seller",
    rating: 4.8,
    reviewCount: 342,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Studio-grade wireless headphones with spatial soundstage, adaptive cancellation, and magnesium alloy body. Engineered for 40-hour battery life with quick-charge capability.",
    features: ["Active Noise Cancellation", "40hr Battery", "Spatial Audio", "USB-C Fast Charge"],
    colors: ["#1a1a2e", "#f5f5f5", "#3b82f6"],
    inStock: true
  },
  {
    id: "2",
    name: "Nebula Arc Smartwatch",
    price: 459,
    originalPrice: null,
    category: "Wearables",
    badge: "New",
    rating: 4.9,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Titanium smartwatch engineered for fitness and productivity with sapphire display and all-day battery. Features advanced health monitoring with ECG and blood oxygen sensors.",
    features: ["Sapphire Display", "ECG Monitor", "5ATM Water Resist", "7-Day Battery"],
    colors: ["#374151", "#d4d4d8", "#92400e"],
    inStock: true
  },
  {
    id: "3",
    name: "Photon Edge Sneakers",
    price: 249,
    originalPrice: 319,
    category: "Fashion",
    badge: "Sale",
    rating: 4.7,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Performance sneakers with reactive foam core and luminous mesh upper designed for speed and comfort. Reflective details for visibility in low-light conditions.",
    features: ["Reactive Foam Core", "Breathable Mesh", "Reflective Details", "Carbon Plate"],
    colors: ["#dc2626", "#1a1a2e", "#f5f5f5"],
    inStock: true
  },
  {
    id: "4",
    name: "CryoGlass Water Bottle",
    price: 89,
    originalPrice: null,
    category: "Lifestyle",
    badge: null,
    rating: 4.5,
    reviewCount: 892,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Vacuum-insulated smart bottle with hydration tracking and dual-wall crystal shell. Keeps drinks cold for 24 hours or hot for 12 hours.",
    features: ["24hr Cold / 12hr Hot", "Smart Hydration Tracking", "BPA-Free", "Crystal Shell"],
    colors: ["#f5f5f5", "#1e3a5f", "#064e3b"],
    inStock: true
  },
  {
    id: "5",
    name: "Orion Pro Camera",
    price: 1399,
    originalPrice: 1599,
    category: "Tech",
    badge: "Sale",
    rating: 4.9,
    reviewCount: 203,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Full-frame mirrorless camera delivering cinematic 8K capture, low-light precision, and AI autofocus. Professional-grade image stabilization with 6.5-stop compensation.",
    features: ["8K Video", "AI Autofocus", "6.5-Stop IBIS", "Dual Card Slots"],
    colors: ["#1a1a2e"],
    inStock: true
  },
  {
    id: "6",
    name: "Lumen Desk Lamp",
    price: 179,
    originalPrice: null,
    category: "Home",
    badge: null,
    rating: 4.6,
    reviewCount: 445,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Minimal sculpted desk lamp with ambient RGB scene modes and adaptive circadian lighting. Touch-sensitive controls with memory recall for your favorite settings.",
    features: ["RGB Scene Modes", "Circadian Rhythm", "Touch Controls", "Wireless Charging Base"],
    colors: ["#f5f5f5", "#1a1a2e"],
    inStock: true
  },
  {
    id: "7",
    name: "Nova Mechanical Keyboard",
    price: 219,
    originalPrice: null,
    category: "Tech",
    badge: "Hot",
    rating: 4.8,
    reviewCount: 1205,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ultra-low-latency mechanical keyboard with custom switches, hot-swap sockets, and per-key RGB. Gasket-mounted for a premium typing experience.",
    features: ["Hot-Swap Sockets", "Per-Key RGB", "Gasket Mount", "PBT Keycaps"],
    colors: ["#1a1a2e", "#f5f5f5", "#7c3aed"],
    inStock: true
  },
  {
    id: "8",
    name: "Astra Travel Backpack",
    price: 199,
    originalPrice: 259,
    category: "Lifestyle",
    badge: "Sale",
    rating: 4.7,
    reviewCount: 678,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165b42?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Weatherproof travel backpack with modular compartments, hidden pockets, and ergonomic support. Fits 16-inch laptops with dedicated padded sleeve.",
    features: ["Weatherproof", "Modular Compartments", "Laptop Sleeve", "RFID Pocket"],
    colors: ["#1a1a2e", "#374151", "#065f46"],
    inStock: true
  },
  {
    id: "9",
    name: "Zenith Wireless Earbuds",
    price: 189,
    originalPrice: null,
    category: "Audio",
    badge: "New",
    rating: 4.6,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80"
    ],
    description: "True wireless earbuds with hybrid ANC, transparency mode, and audiophile-grade drivers. IPX5 rated for workouts with secure-fit wing tips.",
    features: ["Hybrid ANC", "IPX5 Waterproof", "30hr Total Battery", "Wireless Charging Case"],
    colors: ["#1a1a2e", "#f5f5f5"],
    inStock: true
  },
  {
    id: "10",
    name: "Flux Standing Desk Mat",
    price: 79,
    originalPrice: 99,
    category: "Home",
    badge: "Sale",
    rating: 4.4,
    reviewCount: 312,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Anti-fatigue standing desk mat with ergonomic terrain features. Made from premium PU foam with a beveled edge for easy step-on/step-off.",
    features: ["Anti-Fatigue Foam", "Ergonomic Terrain", "Non-Slip Base", "Easy Clean"],
    colors: ["#1a1a2e", "#374151"],
    inStock: true
  },
  {
    id: "11",
    name: "Prism 4K Webcam",
    price: 149,
    originalPrice: null,
    category: "Tech",
    badge: null,
    rating: 4.5,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ultra HD 4K webcam with AI-powered auto-framing, background blur, and low-light correction. Perfect for streaming and video calls.",
    features: ["4K 30fps", "AI Auto-Frame", "Built-in Privacy Shutter", "Dual Microphones"],
    colors: ["#1a1a2e"],
    inStock: true
  },
  {
    id: "12",
    name: "Solaris Sunglasses",
    price: 299,
    originalPrice: null,
    category: "Fashion",
    badge: "Limited",
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Titanium-frame polarized sunglasses with photochromic lenses. Ultra-lightweight at just 18g with anti-scratch sapphire coating.",
    features: ["Polarized Lenses", "Titanium Frame", "18g Ultralight", "Sapphire Coating"],
    colors: ["#1a1a2e", "#92400e", "#1e3a5f"],
    inStock: true
  }
];

export const categories = ["All", ...new Set(products.map((p) => p.category))];

export default products;
