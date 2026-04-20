"use client";

import { useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import AuthModal from "@/components/AuthModal";
import ToastContainer from "@/components/Toast";
import BackToTop from "@/components/BackToTop";

export default function Providers({ children }) {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <Navbar onAuthOpen={() => setAuthOpen(true)} />
            <CartDrawer />
            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
            <ToastContainer />
            <PageTransition>{children}</PageTransition>
            <Footer />
            <BackToTop />
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
