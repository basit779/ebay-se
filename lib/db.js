import crypto from "crypto";

// In-memory database that works on Vercel (read-only filesystem)
// For production, replace with a real database (PostgreSQL, MongoDB, etc.)

let db = {
  users: [],
  carts: {},
  orders: [],
  wishlists: {},
  reviews: [],
  bids: {},
  products: []
};

// Try to load from filesystem in development
if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
  try {
    const fs = require("fs");
    const path = require("path");
    const DB_PATH = path.join(process.cwd(), "data", "db.json");
    if (fs.existsSync(DB_PATH)) {
      const loaded = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
      db = { ...db, ...loaded };
      if (!Array.isArray(db.products)) db.products = [];
    }
  } catch {}
}

function persistToDisk() {
  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    try {
      const fs = require("fs");
      const path = require("path");
      const DB_PATH = path.join(process.cwd(), "data", "db.json");
      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    } catch {}
  }
}

export function generateId() {
  return crypto.randomUUID();
}

// ── Users ────────────────────────────────────────────────
function withDefaults(user) {
  if (!user) return user;
  if (!user.accountType) user.accountType = "buyer";
  return user;
}

export function findUserByEmail(email) {
  return withDefaults(db.users.find((u) => u.email === email)) || null;
}

export function findUserById(id) {
  return withDefaults(db.users.find((u) => u.id === id)) || null;
}

export function createUser({
  name,
  email,
  passwordHash,
  isVerified = false,
  verificationToken = null,
  verificationTokenExpiry = null,
  accountType = "buyer",
  storeName = null,
  storeBio = null
}) {
  const user = {
    id: generateId(),
    name,
    email,
    passwordHash,
    isVerified,
    verificationToken,
    verificationTokenExpiry,
    accountType: accountType === "seller" ? "seller" : "buyer",
    storeName: accountType === "seller" ? (storeName || name) : null,
    storeBio,
    createdAt: new Date().toISOString()
  };
  db.users.push(user);
  persistToDisk();
  return user;
}

export function findOrCreateOAuthUser({ provider, providerId, email, name, accountType = "buyer" }) {
  if (!email) return null;
  let user = db.users.find((u) => u.email === email);
  if (user) {
    let touched = false;
    if (!user.providers) { user.providers = {}; touched = true; }
    if (!user.providers[provider]) { user.providers[provider] = providerId; touched = true; }
    if (!user.isVerified) { user.isVerified = true; touched = true; }
    if (touched) persistToDisk();
    return withDefaults(user);
  }
  user = {
    id: generateId(),
    name: name || email.split("@")[0],
    email,
    passwordHash: null,
    providers: { [provider]: providerId },
    isVerified: true,
    verificationToken: null,
    verificationTokenExpiry: null,
    accountType: accountType === "seller" ? "seller" : "buyer",
    storeName: null,
    storeBio: null,
    createdAt: new Date().toISOString()
  };
  db.users.push(user);
  persistToDisk();
  return user;
}

export function upgradeToSeller(userId, { storeName, storeBio = null } = {}) {
  const user = db.users.find((u) => u.id === userId);
  if (!user) return null;
  user.accountType = "seller";
  user.storeName = storeName || user.storeName || user.name;
  user.storeBio = storeBio ?? user.storeBio ?? null;
  persistToDisk();
  return user;
}

export function updateUser(id, patch) {
  const user = db.users.find((u) => u.id === id);
  if (!user) return null;
  Object.assign(user, patch);
  persistToDisk();
  return user;
}

export function findUserByVerificationToken(token) {
  return db.users.find((u) => u.verificationToken === token) || null;
}

// ── Cart ─────────────────────────────────────────────────
export function getCart(userId) {
  return db.carts[userId] || [];
}

export function saveCart(userId, items) {
  db.carts[userId] = items;
  persistToDisk();
}

export function clearCart(userId) {
  db.carts[userId] = [];
  persistToDisk();
}

// ── Orders ───────────────────────────────────────────────
export function createOrder({ userId, items, total, shipping, payment = null }) {
  const order = {
    id: generateId(),
    userId,
    items,
    total,
    shipping,
    payment, // { brand, last4 } — never raw card data
    status: "confirmed",
    createdAt: new Date().toISOString()
  };
  db.orders.push(order);
  persistToDisk();
  return order;
}

export function getOrdersByUser(userId) {
  return db.orders
    .filter((o) => o.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// ── Wishlist ─────────────────────────────────────────────
export function getWishlist(userId) {
  return db.wishlists[userId] || [];
}

export function addToWishlist(userId, productId) {
  if (!db.wishlists[userId]) db.wishlists[userId] = [];
  if (!db.wishlists[userId].includes(productId)) {
    db.wishlists[userId].push(productId);
    persistToDisk();
  }
  return db.wishlists[userId];
}

export function removeFromWishlist(userId, productId) {
  if (!db.wishlists[userId]) return [];
  db.wishlists[userId] = db.wishlists[userId].filter((id) => id !== productId);
  persistToDisk();
  return db.wishlists[userId];
}

// ── Reviews ──────────────────────────────────────────────
export function getReviewsByProduct(productId) {
  return db.reviews
    .filter((r) => r.productId === productId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function createReview({ productId, userId, userName, rating, comment }) {
  const review = {
    id: generateId(),
    productId,
    userId,
    userName,
    rating,
    comment,
    createdAt: new Date().toISOString()
  };
  db.reviews.push(review);
  persistToDisk();
  return review;
}

// ── Bids ─────────────────────────────────────────────────
export function getBids(productId) {
  return (db.bids[productId] || [])
    .sort((a, b) => b.amount - a.amount);
}

export function getHighestBid(productId) {
  const bids = db.bids[productId] || [];
  if (bids.length === 0) return null;
  return bids.reduce((max, b) => (b.amount > max.amount ? b : max), bids[0]);
}

// ── Seller Products ──────────────────────────────────────
export function createSellerProduct({ sellerId, sellerName, data }) {
  const product = {
    id: "s_" + generateId(),
    source: "seller",
    sellerId,
    sellerName,
    status: "active",
    name: data.name,
    price: Number(data.price) || 0,
    originalPrice: data.originalPrice ? Number(data.originalPrice) : null,
    category: data.category || "Other",
    badge: data.badge || null,
    rating: 0,
    reviewCount: 0,
    image: data.image,
    images: Array.isArray(data.images) && data.images.length ? data.images : [data.image],
    description: data.description || "",
    features: Array.isArray(data.features) ? data.features : [],
    colors: Array.isArray(data.colors) ? data.colors : [],
    inStock: data.inStock !== false,
    auction: !!data.auction,
    startingBid: data.auction ? Number(data.startingBid) || 0 : null,
    currentBid: data.auction ? Number(data.startingBid) || 0 : null,
    bidCount: 0,
    endTime: data.auction ? data.endTime : null,
    createdAt: new Date().toISOString()
  };
  db.products.push(product);
  persistToDisk();
  return product;
}

export function getActiveSellerProducts() {
  return db.products.filter((p) => p.status === "active");
}

export function getSellerProducts(sellerId) {
  return db.products
    .filter((p) => p.sellerId === sellerId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getSellerProductById(id) {
  return db.products.find((p) => p.id === id) || null;
}

export function updateSellerProduct(id, sellerId, patch) {
  const p = db.products.find((x) => x.id === id && x.sellerId === sellerId);
  if (!p) return null;
  const allowed = [
    "name", "price", "originalPrice", "category", "badge", "image",
    "images", "description", "features", "colors", "inStock", "status",
    "auction", "startingBid", "endTime"
  ];
  for (const key of allowed) {
    if (patch[key] !== undefined) p[key] = patch[key];
  }
  if (patch.price !== undefined) p.price = Number(patch.price) || 0;
  persistToDisk();
  return p;
}

export function deleteSellerProduct(id, sellerId) {
  const idx = db.products.findIndex((x) => x.id === id && x.sellerId === sellerId);
  if (idx === -1) return false;
  db.products.splice(idx, 1);
  persistToDisk();
  return true;
}

export function placeBid({ productId, userId, userName, amount }) {
  if (!db.bids[productId]) db.bids[productId] = [];

  const highest = getHighestBid(productId);
  if (highest && amount <= highest.amount) {
    return { error: `Bid must be higher than $${highest.amount.toLocaleString()}` };
  }

  const bid = {
    id: generateId(),
    productId,
    userId,
    userName,
    amount,
    createdAt: new Date().toISOString()
  };

  db.bids[productId].push(bid);
  persistToDisk();

  return { bid, currentBid: amount, bidCount: db.bids[productId].length };
}
