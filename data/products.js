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
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80"
    ],
    description: "True wireless earbuds with hybrid ANC, transparency mode, and audiophile-grade drivers. IPX5 rated.",
    features: ["Hybrid ANC", "IPX5 Waterproof", "30hr Total Battery", "Wireless Charging Case"],
    colors: ["#1a1a2e", "#f5f5f5"],
    inStock: true,
    auction: false
  },
  {
    id: "10",
    name: "Autonomous SmartDesk Pro",
    price: 499,
    originalPrice: 599,
    category: "Home",
    badge: "Sale",
    rating: 4.4,
    reviewCount: 312,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Electric standing desk with dual motors, programmable heights, and solid bamboo top. Whisper quiet.",
    features: ["Dual Motors", "4 Memory Presets", "Bamboo Top", "Anti-Collision"],
    colors: ["#1a1a2e", "#92400e"],
    inStock: true,
    auction: false
  },
  {
    id: "11",
    name: "Logitech MX Master 3S Mouse",
    price: 99,
    originalPrice: null,
    category: "Tech",
    badge: null,
    rating: 4.7,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ergonomic wireless mouse with MagSpeed scroll, USB-C charging, and multi-device connectivity.",
    features: ["MagSpeed Scroll", "8K DPI", "USB-C", "Multi-Device"],
    colors: ["#1a1a2e", "#d4d4d8"],
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
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Classic aviator sunglasses with polarized lenses and lightweight metal frame. UV400 protection.",
    features: ["Polarized Lenses", "Metal Frame", "UV400 Protection", "Iconic Design"],
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
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ultralight running shoes with Boost midsole technology. Primeknit upper for sock-like fit.",
    features: ["Boost Midsole", "Primeknit Upper", "Continental Outsole", "Torsion System"],
    colors: ["#f5f5f5", "#1a1a2e", "#3b82f6"],
    inStock: true,
    auction: false
  },
  {
    id: "16",
    name: "DJI Mavic 3 Pro Drone",
    price: 899,
    originalPrice: 1049,
    category: "Tech",
    badge: "Hot",
    rating: 4.7,
    reviewCount: 312,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Professional drone with Hasselblad camera, 46-min flight time, and omnidirectional obstacle sensing.",
    features: ["Hasselblad Camera", "46min Flight", "5.1K Video", "Obstacle Avoidance"],
    colors: ["#374151"],
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
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Rare vintage 1968 Rolex Submariner in exceptional condition. Original dial with patina, complete with box and papers.",
    features: ["Original 1968 Dial", "Patina Bezel", "Box & Papers", "Service History"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 8500,
    startingBid: 5000,
    bidCount: 23,
    endTime: "2026-04-13T18:00:00.000Z",
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
    image: "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Authentic Chicago Bulls #23 jersey signed by Michael Jordan. Includes COA from PSA/DNA authentication.",
    features: ["PSA/DNA Authenticated", "Original Tags", "Display Case Included", "Certificate of Authenticity"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 3200,
    startingBid: 1000,
    bidCount: 41,
    endTime: "2026-04-12T06:00:00.000Z",
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
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Factory-sealed original iPhone from 2007. 8GB model in pristine, unopened condition. Museum-quality collectible.",
    features: ["Factory Sealed", "8GB Model", "Original Packaging", "Investment Grade"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 25000,
    startingBid: 15000,
    bidCount: 18,
    endTime: "2026-04-14T22:00:00.000Z",
    sellerId: "tech_collectors"
  },
  {
    id: "20",
    name: "Leica M6 Film Camera",
    price: null,
    originalPrice: null,
    category: "Tech",
    badge: "Auction",
    rating: 4.9,
    reviewCount: 8,
    image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Classic Leica M6 rangefinder in black chrome. Recently CLA'd, light meter accurate. The photographer's dream.",
    features: ["Black Chrome", "CLA Serviced", "Accurate Meter", "Original Strap"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 2800,
    startingBid: 2000,
    bidCount: 15,
    endTime: "2026-04-12T18:00:00.000Z",
    sellerId: "analog_photo_shop"
  },
  {
    id: "21",
    name: "Vintage Gibson Les Paul 1959",
    price: null,
    originalPrice: null,
    category: "Audio",
    badge: "Auction",
    rating: 5.0,
    reviewCount: 6,
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Holy grail 1959 Gibson Les Paul Standard in Sunburst finish. All original parts with case.",
    features: ["All Original Parts", "Sunburst Finish", "PAF Pickups", "Original Case"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 185000,
    startingBid: 100000,
    bidCount: 12,
    endTime: "2026-04-18T20:00:00.000Z",
    sellerId: "vintage_guitar_vault"
  },
  {
    id: "22",
    name: "Le Creuset Dutch Oven 5.5qt",
    price: 369,
    originalPrice: null,
    category: "Home",
    badge: "Best Seller",
    rating: 4.9,
    reviewCount: 1876,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Iconic enameled cast iron Dutch oven. Superior heat retention for braising, roasting, and baking.",
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
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Flagship smartphone with titanium frame, 200MP camera, AI-powered features, and S Pen built in.",
    features: ["200MP Camera", "Titanium Frame", "S Pen", "AI Features"],
    colors: ["#1a1a2e", "#374151", "#7c3aed"],
    inStock: true,
    auction: false
  },
  {
    id: "24",
    name: "Vintage Polaroid SX-70 Camera",
    price: null,
    originalPrice: null,
    category: "Tech",
    badge: "Auction",
    rating: 4.9,
    reviewCount: 4,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Iconic Polaroid SX-70 instant camera in chrome and tan leather. Fully refurbished, tested and working.",
    features: ["Fully Refurbished", "Chrome Finish", "Original Leather", "Tested Working"],
    colors: [],
    inStock: true,
    auction: true,
    currentBid: 350,
    startingBid: 150,
    bidCount: 28,
    endTime: "2026-04-13T10:00:00.000Z",
    sellerId: "retro_camera_shop"
  }
];

export const categories = ["All", ...new Set(products.map((p) => p.category))];

export default products;
