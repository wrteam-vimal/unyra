"use client";

import React, { use } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

type OrderDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = use(params);
  const { currentUser } = useUser();
  const router = useRouter();

  if (!currentUser) {
    return (
      <div className="section-wrapper" style={{ minHeight: "80vh", paddingTop: "140px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", fontFamily: "'Outfit', sans-serif" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Please log in to view order details.</p>
        </div>
      </div>
    );
  }

  const order = currentUser.orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="section-wrapper" style={{ minHeight: "80vh", paddingTop: "140px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem", color: "var(--primary-dark)", marginBottom: "1.5rem" }}>Order Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2.5rem", fontSize: "1.1rem" }}>This order does not exist or belongs to another user.</p>
        <Link href="/dashboard" className="cta-button" style={{ backgroundColor: "var(--primary-dark)", color: "var(--white)", border: "none", textDecoration: "none" }}>
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // Shipping progress indicator mapping
  const statuses = ["Placed", "Processing", "Shipped", "Delivered"];
  const currentStatusIndex = statuses.indexOf(order.status === "Cancelled" ? "Placed" : order.status);

  // Compute progress line width percentage
  const getProgressWidth = () => {
    if (order.status === "Cancelled") return "0%";
    return `${(currentStatusIndex / (statuses.length - 1)) * 100}%`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="section-wrapper dashboard-wrapper print-area" style={{ minHeight: "100vh", paddingTop: "140px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem", width: "100%" }}>
        {/* Back Link */}
        <div className="no-print" style={{ marginBottom: "2rem" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", fontWeight: 500, transition: "var(--transition-smooth)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}><polyline points="9 18 15 12 9 6"></polyline></svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Card wrapper */}
        <div className="db-content-card order-details-card" style={{ padding: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid rgba(197, 154, 111, 0.12)", paddingBottom: "1.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <span className="no-print" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--accent-gold)", fontWeight: 600 }}>Official Invoice</span>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "var(--primary-dark)", marginTop: "0.25rem", marginBottom: "0.5rem" }}>Order Details</h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Placed on <strong style={{ color: "var(--primary-dark)" }}>{order.date}</strong> | Order ID: <strong style={{ color: "var(--primary-dark)" }}>{order.id}</strong>
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <span className={`badge-status ${order.status.toLowerCase()}`} style={{ fontSize: "0.9rem", padding: "0.4rem 1.2rem" }}>
                {order.status}
              </span>
              <button 
                className="topup-amt-btn no-print" 
                onClick={handlePrint}
                style={{ 
                  display: "block", 
                  marginTop: "1rem", 
                  padding: "0.4rem 1rem", 
                  fontSize: "0.85rem",
                  marginLeft: "auto"
                }}
              >
                🖨️ Print Invoice
              </button>
            </div>
          </div>

          {/* SHIPPING TRACKER ROADMAP */}
          {order.status !== "Cancelled" && (
            <div className="no-print" style={{ margin: "3.5rem 0 4.5rem" }}>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "var(--primary-dark)", fontWeight: 500, marginBottom: "1.5rem", textAlign: "center" }}>
                Delivery Roadmap
              </h4>
              <div 
                className="tracker-steps" 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  position: "relative", 
                  margin: "2.5rem 0 3.5rem", 
                  padding: "0 1rem" 
                }}
              >
                {/* Background progress track */}
                <div 
                  style={{ 
                    position: "absolute", 
                    top: "20px", 
                    left: "1rem", 
                    right: "1rem", 
                    height: "2px", 
                    background: "rgba(197, 154, 111, 0.12)", 
                    zIndex: 1 
                  }}
                ></div>
                
                {/* Active progress line */}
                <div 
                  className="tracker-progress-line" 
                  style={{ 
                    position: "absolute", 
                    top: "20px", 
                    left: "1rem", 
                    height: "2px", 
                    backgroundColor: "var(--accent-gold)", 
                    zIndex: 2, 
                    transition: "width 0.5s ease", 
                    width: `calc(${getProgressWidth()} - 2rem)` 
                  }}
                ></div>
                
                {statuses.map((step, idx) => {
                  const isActive = idx <= currentStatusIndex;
                  const isCurrent = idx === currentStatusIndex;
                  return (
                    <div 
                      key={step} 
                      className={`tracker-step ${isCurrent ? "active" : ""} ${isActive && !isCurrent ? "completed" : ""}`}
                      style={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        position: "relative", 
                        zIndex: 3, 
                        width: "120px" 
                      }}
                    >
                      <div 
                        className="tracker-circle"
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          backgroundColor: isCurrent ? "var(--accent-gold)" : "var(--white)",
                          border: isCurrent ? "2px solid var(--accent-gold)" : isActive ? "2px solid var(--accent-gold)" : "2px solid rgba(197, 154, 111, 0.2)",
                          color: isCurrent ? "var(--white)" : isActive ? "var(--accent-gold)" : "var(--text-muted)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "600",
                          boxShadow: isCurrent ? "0 0 15px rgba(197, 154, 111, 0.3)" : "none",
                          transition: "all 0.4s ease"
                        }}
                      >
                        {isActive && !isCurrent ? "✓" : idx + 1}
                      </div>
                      <span 
                        className="tracker-lbl"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          color: isCurrent ? "var(--primary-dark)" : isActive ? "var(--accent-gold)" : "var(--text-muted)",
                          marginTop: "0.75rem",
                          textAlign: "center",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {step === "Placed" ? "Order Placed" : step === "Processing" ? "Processing" : step === "Shipped" ? "Out for Shipping" : "Delivered"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ORDER ITEMS LIST */}
          <div style={{ marginTop: "2rem" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "var(--primary-dark)", fontWeight: 500, marginBottom: "1.5rem" }}>Items Summary</h3>
            <div className="uny-table-container">
              <table className="uny-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Size</th>
                    <th style={{ textAlign: "center" }}>Qty</th>
                    <th style={{ textAlign: "right" }}>Price</th>
                    <th style={{ textAlign: "right" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => {
                    const priceNum = parseFloat(item.product.price.replace("$", ""));
                    return (
                      <tr key={i}>
                        <td style={{ display: "flex", alignItems: "center", gap: "1rem", borderBottom: "none" }}>
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            style={{ 
                              width: "50px", 
                              height: "50px", 
                              borderRadius: "6px", 
                              objectFit: "cover",
                              background: "#EAE6E1",
                              border: "1px solid rgba(197, 154, 111, 0.1)"
                            }} 
                          />
                          <span style={{ fontWeight: 500, color: "var(--primary-dark)" }}>{item.product.name}</span>
                        </td>
                        <td>{item.product.size}</td>
                        <td style={{ textAlign: "center" }}>{item.qty}</td>
                        <td style={{ textAlign: "right" }}>{item.product.price}</td>
                        <td style={{ textAlign: "right", fontWeight: 600 }}>${(priceNum * item.qty).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* SHIPPING & BILLING COLUMNS */}
          <div 
            className="invoice-grid" 
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
              gap: "2.5rem", 
              borderTop: "1px solid rgba(197, 154, 111, 0.12)", 
              paddingTop: "2.5rem", 
              marginTop: "2.5rem" 
            }}
          >
            {/* Delivery address */}
            <div>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "var(--primary-dark)", fontWeight: 500, marginBottom: "1.25rem" }}>
                Delivery Address
              </h4>
              <div style={{ fontSize: "0.9rem", color: "var(--text-dark)", lineHeight: "1.7" }}>
                <p style={{ fontWeight: 600, fontSize: "0.95rem" }}>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                <p style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>{order.shippingAddress.email}</p>
              </div>
            </div>

            {/* Financial summaries */}
            <div style={{ background: "rgba(197, 154, 111, 0.02)", border: "1px solid rgba(197, 154, 111, 0.08)", padding: "1.75rem", borderRadius: "16px" }}>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "var(--primary-dark)", fontWeight: 500, marginBottom: "1.25rem" }}>
                Payment & Billing
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Method</span>
                  <span style={{ fontWeight: 500 }}>{order.paymentMethod}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Ref ID</span>
                  <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-muted)" }}>{order.transactionId}</span>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid rgba(197, 154, 111, 0.12)", margin: "0.5rem 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--accent-gold)" }}>
                    <span>Promo Discount</span>
                    <span>-${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Shipping</span>
                  <span style={{ color: "#48bb78", fontWeight: "bold" }}>Free</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem", fontWeight: "bold", borderTop: "1.5px solid var(--accent-gold)", paddingTop: "0.75rem", marginTop: "0.5rem" }}>
                  <span style={{ color: "var(--primary-dark)" }}>Grand Total</span>
                  <span style={{ color: "var(--accent-gold)" }}>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styled Print Sheet overrides */}
      <style jsx global>{`
        @media print {
          body {
            background: #FFFFFF !important;
            color: #000000 !important;
          }
          header, footer, .no-print, .theme-toggle, .cart-sidebar, .hamburger {
            display: none !important;
          }
          .print-area {
            padding-top: 0 !important;
            min-height: auto !important;
          }
          .order-details-card {
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
            padding: 0 !important;
          }
          .uny-table th {
            background: rgba(0, 0, 0, 0.05) !important;
            color: #000000 !important;
            border-bottom: 2px solid #000000 !important;
          }
          .uny-table td {
            color: #000000 !important;
            border-bottom: 1px solid #DDDDDD !important;
          }
          .badge-status {
            border: 1px solid #000000 !important;
            color: #000000 !important;
            background: transparent !important;
          }
        }
      `}</style>
    </div>
  );
}
