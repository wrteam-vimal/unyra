"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Checkout() {
  const { cart, cartSubtotal, promoDiscount, promoCode, checkoutTotal, clearCart } = useCart();
  const { currentUser, placeOrder } = useUser();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
      // Auto-fill from name if possible
      const nameParts = currentUser.name.split(" ");
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");

      // If user has past orders, auto-fill from the last order
      if (currentUser.orders.length > 0) {
        const lastOrder = currentUser.orders[0];
        setFirstName(lastOrder.shippingAddress.firstName);
        setLastName(lastOrder.shippingAddress.lastName);
        setStreet(lastOrder.shippingAddress.street);
        setCity(lastOrder.shippingAddress.city);
        setState(lastOrder.shippingAddress.state);
        setZip(lastOrder.shippingAddress.zip);
      }
    }
  }, [currentUser]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty!");
      return;
    }

    const shippingAddress = {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zip
    };

    if (!currentUser) {
      // Redirect to login if user clicks place order without login
      alert("Please sign in or create an account to complete your checkout.");
      router.push(`/login?redirect=/checkout`);
      return;
    }

    const cartItems = cart.map(item => ({
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        size: item.product.size
      },
      qty: item.qty
    }));

    const result = placeOrder(
      cartItems,
      cartSubtotal,
      cartSubtotal * promoDiscount,
      checkoutTotal,
      shippingAddress,
      selectedPayment
    );

    if (result.success && result.orderId) {
      setPlacedOrderId(result.orderId);
      setOrderPlaced(true);
      clearCart();
    } else {
      setError(result.error || "Failed to place your order. Please try again.");
    }
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
          <p style={{ color: "var(--text-muted)", marginBottom: "0.5rem", lineHeight: "1.6" }}>
            Thank you for your purchase. We&apos;ve received your order and will email you with shipping details shortly.
          </p>
          <p style={{ fontSize: "0.95rem", color: "var(--accent-gold)", fontWeight: "bold", marginBottom: "2.5rem" }}>
            Order ID: {placedOrderId}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link
              href={`/dashboard/orders/${placedOrderId}`}
              className="cta-button"
              style={{ backgroundColor: "var(--accent-gold)", color: "var(--white)", border: "none", textDecoration: "none", display: "inline-flex", alignItems: "center" }}
            >
              View Invoice Details
            </Link>
            <Link
              href="/"
              className="cta-button"
              style={{ backgroundColor: "var(--primary-dark)", color: "var(--white)", border: "none", textDecoration: "none", display: "inline-flex", alignItems: "center" }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isWalletInsufficient = currentUser && selectedPayment === "wallet" && currentUser.walletBalance < checkoutTotal;

  return (
    <div className="section-wrapper" style={{ minHeight: "80vh", paddingTop: "120px" }}>
      <div className="modal-content checkout-modal" style={{ margin: "0 auto", position: "relative", transform: "none", width: "100%", maxWidth: "1000px" }}>
        <div className="checkout-header">
          <h2>Secure Checkout</h2>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Return to Shop</Link>
        </div>

        {!currentUser && (
          <div style={{
            background: "rgba(197, 154, 111, 0.08)",
            border: "1px solid rgba(197, 154, 111, 0.15)",
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            marginBottom: "2rem",
            fontSize: "0.9rem",
            color: "var(--primary-dark)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <span>Already have an account? Sign in for saved addresses and wallet payments.</span>
            <Link href="/login?redirect=/checkout" className="topup-amt-btn" style={{ textDecoration: "none", display: "inline-block" }}>
              Sign In
            </Link>
          </div>
        )}
        
        <div className="checkout-body">
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            {error && (
              <div style={{
                background: "rgba(245, 101, 101, 0.1)",
                border: "1px solid rgba(245, 101, 101, 0.3)",
                color: "#f56565",
                padding: "0.8rem 1.2rem",
                borderRadius: "30px",
                fontSize: "0.85rem",
                marginBottom: "2rem",
                textAlign: "center"
              }}>
                {error}
              </div>
            )}

            <div className="checkout-section-title">1. Shipping Information</div>
            
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="First Name" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Last Name" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Street Address" 
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="City" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="State/Province" 
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Zip/Postal Code" 
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required 
                />
              </div>
            </div>
            
            <div className="delivery-info">
              <strong>Standard Delivery (3-5 Business Days)</strong> - Free for orders over $50
            </div>
            
            <div className="checkout-section-title" style={{ marginTop: "3rem" }}>2. Payment Method</div>
            
            <div className="payment-options">
              {/* Wallet payment option */}
              {currentUser && (
                <div 
                  className={`payment-option ${selectedPayment === "wallet" ? "selected" : ""}`} 
                  onClick={() => setSelectedPayment("wallet")}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    id="pay-wallet" 
                    checked={selectedPayment === "wallet"} 
                    onChange={() => setSelectedPayment("wallet")} 
                  />
                  <label htmlFor="pay-wallet" style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center", cursor: "pointer" }}>
                    <span>Pay with Unyra Wallet</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: currentUser.walletBalance >= checkoutTotal ? "#48bb78" : "#f56565" }}>
                      Balance: ${currentUser.walletBalance.toFixed(2)}
                    </span>
                  </label>
                </div>
              )}

              {isWalletInsufficient && (
                <div style={{
                  background: "rgba(245, 101, 101, 0.08)",
                  border: "1px solid rgba(245, 101, 101, 0.2)",
                  borderRadius: "8px",
                  padding: "1rem 1.25rem",
                  marginTop: "-0.8rem",
                  marginBottom: "1rem",
                  fontSize: "0.85rem",
                  color: "#f56565"
                }}>
                  ⚠️ <strong>Insufficient Balance</strong>. You need another <strong>${(checkoutTotal - currentUser.walletBalance).toFixed(2)}</strong> in your wallet.
                  <div style={{ marginTop: "0.75rem" }}>
                    <Link href="/dashboard" className="topup-amt-btn" style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", textDecoration: "none", display: "inline-block" }}>
                      Recharge Wallet
                    </Link>
                  </div>
                </div>
              )}

              <div className={`payment-option ${selectedPayment === "card" ? "selected" : ""}`} onClick={() => setSelectedPayment("card")}>
                <input type="radio" name="payment" id="pay-card" checked={selectedPayment === "card"} onChange={() => setSelectedPayment("card")} />
                <label htmlFor="pay-card" style={{ cursor: "pointer" }}>Credit / Debit Card</label>
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
                <label htmlFor="pay-paypal" style={{ cursor: "pointer" }}>PayPal</label>
              </div>
              
              <div className={`payment-option ${selectedPayment === "apple" ? "selected" : ""}`} onClick={() => setSelectedPayment("apple")}>
                <input type="radio" name="payment" id="pay-apple" checked={selectedPayment === "apple"} onChange={() => setSelectedPayment("apple")} />
                <label htmlFor="pay-apple" style={{ cursor: "pointer" }}>Apple Pay</label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn-checkout" 
              style={{ marginTop: "3rem" }} 
              disabled={!!isWalletInsufficient}
            >
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
