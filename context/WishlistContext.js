"use client";

import { createContext, useContext, useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const WishlistContext = createContext(null);

const STORAGE_KEY = "fluxbid-wishlist";

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate on client only
  useEffect(() => {
    if (user) {
      fetch("/api/wishlist")
        .then((r) => r.json())
        .then((data) => setWishlist(data.items || []))
        .catch(() => {});
    } else {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setWishlist(JSON.parse(raw));
      } catch {}
    }
    setHydrated(true);
  }, [user]);

  const toggle = useCallback(
    async (productId) => {
      const has = wishlist.includes(productId);
      // Optimistic flip
      const optimistic = has ? wishlist.filter((id) => id !== productId) : [...wishlist, productId];
      setWishlist(optimistic);
      if (!user && typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(optimistic));
      }

      if (user) {
        try {
          const res = await fetch("/api/wishlist", {
            method: has ? "DELETE" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId })
          });
          if (!res.ok) throw new Error("failed");
        } catch {
          // rollback on failure
          setWishlist(wishlist);
        }
      }
    },
    [user, wishlist]
  );

  const isWishlisted = useCallback(
    (productId) => wishlist.includes(productId),
    [wishlist]
  );

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
