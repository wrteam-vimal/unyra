"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/data";

export type CartItem = {
  product: Product;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, qty?: number) => void;
  updateCartItemQty: (productId: string, change: number) => void;
  toggleCart: () => void;
  cartTotalQty: number;
  cartSubtotal: number;
  promoCode: string;
  promoDiscount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  clearCart: () => void;
  checkoutTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Load from localStorage if needed (omitted for simplicity, but can be added)
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setTimeout(() => {
          setCart(JSON.parse(savedCart));
        }, 0);
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prevCart, { product, qty }];
    });
    
    // Show notification could be triggered via an event or separate state
    const notification = document.getElementById("cartNotification");
    if (notification) {
      notification.classList.add("show");
      setTimeout(() => {
        notification.classList.remove("show");
      }, 3000);
    }
  };

  const updateCartItemQty = (productId: string, change: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            return { ...item, qty: item.qty + change };
          }
          return item;
        })
        .filter((item) => item.qty > 0);
    });
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const applyPromoCode = (code: string) => {
    const upperCode = code.trim().toUpperCase();
    if (upperCode === "WELCOME10") {
      setPromoDiscount(0.1);
      setPromoCode("WELCOME10");
      return { success: true, message: "Promo code applied successfully!" };
    } else if (upperCode === "FREESHIP") {
      setPromoDiscount(0.05);
      setPromoCode("FREESHIP");
      return { success: true, message: "Promo code applied successfully!" };
    }
    return { success: false, message: "Invalid promo code" };
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode("");
    setPromoDiscount(0);
  };

  const cartTotalQty = cart.reduce((total, item) => total + item.qty, 0);
  const cartSubtotal = cart.reduce((total, item) => {
    const price = parseFloat(item.product.price.replace("$", ""));
    return total + price * item.qty;
  }, 0);
  const checkoutTotal = cartSubtotal - cartSubtotal * promoDiscount;

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        addToCart,
        updateCartItemQty,
        toggleCart,
        cartTotalQty,
        cartSubtotal,
        promoCode,
        promoDiscount,
        applyPromoCode,
        clearCart,
        checkoutTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
