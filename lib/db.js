import crypto from "crypto";

// In-memory database that works on Vercel (read-only filesystem)
// For production, replace with a real database (PostgreSQL, MongoDB, etc.)

let db = {
  users: [],
  carts: {},
  orders: [],
  wishlists: {},
  reviews: [],
  bids: {}
};

// Try to load from filesystem in development
if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
  try {
    const fs = require("fs");
    const path = require("path");
    const DB_PATH = path.join(process.cwd(), "data", "db.json");
    if (fs.existsSync(DB_PATH)) {
      db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
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
export function findUserByEmail(email) {
  return db.users.find((u) => u.email === email) || null;
}

export function findUserById(id) {
  return db.users.find((u) => u.id === id) || null;
}

export function createUser({ name, email, passwordHash }) {
  const user = {
    id: generateId(),
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString()
  };
  db.users.push(user);
  persistToDisk();
  return user;
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
export function createOrder({ userId, items, total, shipping }) {
  const order = {
    id: generateId(),
    userId,
    items,
    total,
    shipping,
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
