"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Checkout() {
  const { cart, cartSubtotal, promoDiscount, promoCode, checkoutTotal, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    // Simulate order placement
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="section-wrapper" style={{ minHeight: "80vh", paddingTop: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="modal-content" style={{ textAlign: "center", padding: "4rem", maxWidth: "600px", transform: "none" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(197, 154, 111, 0.1)", color: "var(--accent-gold)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", color: "var(--primary-dark)", marginBottom: "1rem" }}>Order Confirmed!</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem", lineHeight: "1.6" }}>
            Thank you for your purchase. We've received your order and will email you with shipping details shortly.
          </p>
          <button 
            className="cta-button" 
            style={{ backgroundColor: "var(--primary-dark)", color: "var(--white)", border: "none" }}
            onClick={() => router.push("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-wrapper" style={{ minHeight: "80vh", paddingTop: "120px" }}>
      <div className="modal-content checkout-modal" style={{ margin: "0 auto", position: "relative", transform: "none", width: "100%", maxWidth: "1000px" }}>
        <div className="checkout-header">
          <h2>Secure Checkout</h2>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Return to Shop</Link>
        </div>
        
        <div className="checkout-body">
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <div className="checkout-section-title">1. Shipping Information</div>
            
            <div className="form-row">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="First Name" required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Last Name" required />
              </div>
            </div>
            
            <div className="form-group">
              <input type="email" className="form-control" placeholder="Email Address" required />
            </div>
            
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Street Address" required />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="City" required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="State/Province" required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Zip/Postal Code" required />
              </div>
            </div>
            
            <div className="delivery-info">
              <strong>Standard Delivery (3-5 Business Days)</strong> - Free for orders over $50
            </div>
            
            <div className="checkout-section-title" style={{ marginTop: "3rem" }}>2. Payment Method</div>
            
            <div className="payment-options">
              <div className={`payment-option ${selectedPayment === "card" ? "selected" : ""}`} onClick={() => setSelectedPayment("card")}>
                <input type="radio" name="payment" id="pay-card" checked={selectedPayment === "card"} onChange={() => setSelectedPayment("card")} />
                <label htmlFor="pay-card">Credit / Debit Card</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none"><rect width="32" height="20" rx="4" fill="#EAE6E1"/><circle cx="11" cy="10" r="6" fill="#EB001B"/><circle cx="21" cy="10" r="6" fill="#F79E1B"/></svg>
                </div>
              </div>
              
              {selectedPayment === "card" && (
                <div style={{ padding: "1.5rem", border: "1px solid var(--border-color)", borderTop: "none", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", marginTop: "-0.8rem", marginBottom: "1rem" }}>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Card Number" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="MM/YY" required />
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="CVC" required />
                    </div>
                  </div>
                </div>
              )}
              
              <div className={`payment-option ${selectedPayment === "paypal" ? "selected" : ""}`} onClick={() => setSelectedPayment("paypal")}>
                <input type="radio" name="payment" id="pay-paypal" checked={selectedPayment === "paypal"} onChange={() => setSelectedPayment("paypal")} />
                <label htmlFor="pay-paypal">PayPal</label>
              </div>
              
              <div className={`payment-option ${selectedPayment === "apple" ? "selected" : ""}`} onClick={() => setSelectedPayment("apple")}>
                <input type="radio" name="payment" id="pay-apple" checked={selectedPayment === "apple"} onChange={() => setSelectedPayment("apple")} />
                <label htmlFor="pay-apple">Apple Pay</label>
              </div>
            </div>
            
            <button type="submit" className="btn-checkout" style={{ marginTop: "3rem" }}>
              Place Order — ${checkoutTotal.toFixed(2)}
            </button>
          </form>
          
          <div className="checkout-summary">
            <div className="checkout-section-title">Order Summary</div>
            
            <div className="checkout-items" id="checkoutItemsList">
              {cart.map(item => (
                <div className="checkout-item" key={item.product.id}>
                  <span className="checkout-item-name">{item.qty}x {item.product.name}</span>
                  <span>${(parseFloat(item.product.price.replace("$", "")) * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              {promoDiscount > 0 && (
                <div className="cart-summary-row" id="checkoutDiscountRow" style={{ color: "var(--accent-gold)" }}>
                  <span>Discount ({promoCode})</span>
                  <span>-${(cartSubtotal * promoDiscount).toFixed(2)}</span>
                </div>
              )}
              
              <div className="cart-summary-row total">
                <span>Total</span>
                <span>${checkoutTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
