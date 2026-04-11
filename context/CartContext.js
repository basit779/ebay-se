"use client";

import { createContext, useContext, useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

const CartContext = createContext(null);

const STORAGE_KEY = "ebay-cart";

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const synced = useRef(false);

  // Hydrate from localStorage ONLY on client after mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCartItems(parsed);
        }
      }
    } catch {}
    setHydrated(true);
  }, []);

  // Sync with server when user logs in
  useEffect(() => {
    if (!user || !hydrated || synced.current) return;
    synced.current = true;

    fetch("/api/cart")
      .then((r) => r.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setCartItems((prev) => {
            const merged = [...data.items];
            prev.forEach((localItem) => {
              if (!merged.find((i) => i.id === localItem.id)) {
                merged.push(localItem);
              }
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            return merged;
          });
        }
      })
      .catch(() => {});
  }, [user, hydrated]);

  // Persist changes
  const persist = useCallback(
    (items) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
      if (user) {
        fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items })
        }).catch(() => {});
      }
    },
    [user]
  );

  const addToCart = useCallback(
    (product) => {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        let next;
        if (existing) {
          next = prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          next = [...prev, { ...product, quantity: 1 }];
        }
        persist(next);
        return next;
      });
      setIsCartOpen(true);
    },
    [persist]
  );

  const removeFromCart = useCallback(
    (id) => {
      setCartItems((prev) => {
        const next = prev.filter((item) => item.id !== id);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const updateQuantity = useCallback(
    (id, quantity) => {
      if (quantity < 1) {
        removeFromCart(id);
        return;
      }
      setCartItems((prev) => {
        const next = prev.map((item) => (item.id === id ? { ...item, quantity } : item));
        persist(next);
        return next;
      });
    },
    [removeFromCart, persist]
  );

  const clearAll = useCallback(() => {
    setCartItems([]);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "[]");
    }
    if (user) {
      fetch("/api/cart", { method: "DELETE" }).catch(() => {});
    }
  }, [user]);

  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearAll,
    itemCount,
    total,
    isCartOpen,
    setIsCartOpen
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
