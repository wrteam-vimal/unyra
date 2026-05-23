"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    updateCartItemQty,
    cartTotalQty,
    cartSubtotal,
    promoCode,
    promoDiscount,
    applyPromoCode,
    checkoutTotal,
  } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const router = useRouter();

  const handleApplyPromo = () => {
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      alert(res.message);
      setPromoInput("");
    } else {
      alert(res.message);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    toggleCart(); // close sidebar
    router.push("/checkout");
  };

  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? "active" : ""}`}
        id="cartOverlay"
        onClick={toggleCart}
      ></div>
      <div className={`cart-sidebar ${isCartOpen ? "active" : ""}`} id="cartSidebar">
        <div className="cart-header">
          <h2>Your Cart ({cartTotalQty})</h2>
          <button className="cart-close" onClick={toggleCart} aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="cart-items" id="cartItemsContainer">
          {cart.length === 0 ? (
            <div className="cart-empty">Your cart is currently empty.</div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.product.id}>
                <img src={item.product.image} className="cart-item-img" alt={item.product.name} />
                <div className="cart-item-info">
                  <div>
                    <div className="cart-item-name">{item.product.name}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      {item.product.size}
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="cart-item-price">{item.product.price}</div>
                    <div className="cart-qty-controls">
                      <button onClick={() => updateCartItemQty(item.product.id, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateCartItemQty(item.product.id, 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="promo-code-section">
            <input
              type="text"
              placeholder="Promo Code (WELCOME10)"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
            />
            <button className="btn-apply" onClick={handleApplyPromo}>Apply</button>
          </div>
          
          <div className="available-promos">
            <span className="promo-tag" onClick={() => setPromoInput("WELCOME10")}>WELCOME10 (10% OFF)</span>
            <span className="promo-tag" onClick={() => setPromoInput("FREESHIP")}>FREESHIP (5% OFF)</span>
          </div>

          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${cartSubtotal.toFixed(2)}</span>
          </div>
          
          {promoDiscount > 0 && (
            <div className="cart-summary-row" style={{ color: "var(--accent-gold)" }}>
              <span>Discount ({promoCode})</span>
              <span>-${(cartSubtotal * promoDiscount).toFixed(2)}</span>
            </div>
          )}

          <div className="cart-summary-row total">
            <span>Total</span>
            <span>${checkoutTotal.toFixed(2)}</span>
          </div>

          <button className="btn-checkout" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
      
      {/* Notification toast */}
      <div id="cartNotification" className="cart-notification">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        Item added to cart!
      </div>
    </>
  );
}
