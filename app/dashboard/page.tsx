"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

type TabType = "orders" | "wallet" | "profile";

export default function DashboardPage() {
  const { currentUser, logout, addWalletFunds } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("orders");
  const [topupAmount, setTopupAmount] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!currentUser) {
      router.push("/login?redirect=/dashboard");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return (
      <div className="section-wrapper" style={{ minHeight: "80vh", paddingTop: "140px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", fontFamily: "'Outfit', sans-serif" }}>
          <div className="loader" style={{ width: "50px", height: "50px", border: "3px solid rgba(197, 154, 111, 0.1)", borderTopColor: "var(--accent-gold)", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 1.5rem" }}></div>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Verifying session, please wait...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleQuickTopup = (amt: number) => {
    addWalletFunds(amt);
    setFeedback(`Successfully added $${amt.toFixed(2)} to your wallet!`);
    setTimeout(() => setFeedback(""), 3000);
  };

  const handleCustomTopup = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(topupAmount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }
    addWalletFunds(amt);
    setFeedback(`Successfully added $${amt.toFixed(2)} to your wallet!`);
    setTopupAmount("");
    setTimeout(() => setFeedback(""), 3000);
  };

  // Helper to extract initials
  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="section-wrapper dashboard-wrapper">
      <div className="pd-container" style={{ gridTemplateColumns: "280px 1fr", gap: "3rem", margin: "0 auto", maxWidth: "1200px", width: "100%" }}>
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <div className="user-avatar-card">
            <div className="user-initials">{getInitials(currentUser.name)}</div>
            <h2 className="user-name-title">{currentUser.name}</h2>
            <p className="user-email-subtitle">{currentUser.email}</p>
          </div>

          <ul className="db-menu">
            <li>
              <button 
                className={`db-menu-btn ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                📦 Order History
              </button>
            </li>
            <li>
              <button 
                className={`db-menu-btn ${activeTab === "wallet" ? "active" : ""}`}
                onClick={() => setActiveTab("wallet")}
              >
                💳 Wallet & Funds
              </button>
            </li>
            <li>
              <button 
                className={`db-menu-btn ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                👤 Profile Settings
              </button>
            </li>
            <li style={{ marginTop: "2rem", borderTop: "1px solid rgba(197, 154, 111, 0.12)", paddingTop: "1rem" }}>
              <button 
                className="db-menu-btn"
                style={{ color: "#f56565" }}
                onClick={handleLogout}
              >
                🔒 Sign Out
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="db-content-card">
          {/* Tab 1: Orders */}
          {activeTab === "orders" && (
            <div>
              <h3 className="db-tab-title">Order History</h3>
              {currentUser.orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                  <span style={{ fontSize: "3rem", display: "block", marginBottom: "1.5rem" }}>🛍️</span>
                  <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "2rem" }}>
                    You haven&apos;t placed any orders yet.
                  </p>
                  <Link href="/" className="cta-button" style={{ display: "inline-flex", textDecoration: "none", backgroundColor: "var(--primary-dark)", color: "var(--white)", border: "none" }}>
                    Explore Products
                  </Link>
                </div>
              ) : (
                <div className="uny-table-container">
                  <table className="uny-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUser.orders.map((order) => {
                        const itemsCount = order.items.reduce((acc, it) => acc + it.qty, 0);
                        return (
                          <tr key={order.id}>
                            <td style={{ fontWeight: 600, color: "var(--primary-dark)" }}>{order.id}</td>
                            <td>{order.date}</td>
                            <td>
                              <span className={`badge-status ${order.status.toLowerCase()}`}>
                                {order.status}
                              </span>
                            </td>
                            <td>{itemsCount} {itemsCount === 1 ? "item" : "items"}</td>
                            <td style={{ fontWeight: 600 }}>${order.total.toFixed(2)}</td>
                            <td>
                              <Link 
                                href={`/dashboard/orders/${order.id}`}
                                className="topup-amt-btn"
                                style={{ 
                                  padding: "0.35rem 0.85rem", 
                                  fontSize: "0.8rem", 
                                  textDecoration: "none", 
                                  display: "inline-block" 
                                }}
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Wallet */}
          {activeTab === "wallet" && (
            <div>
              <h3 className="db-tab-title">Wallet & Transactions</h3>

              {feedback && (
                <div style={{
                  background: "rgba(72, 187, 120, 0.1)",
                  border: "1px solid rgba(72, 187, 120, 0.3)",
                  color: "#48bb78",
                  padding: "0.8rem 1.2rem",
                  borderRadius: "30px",
                  fontSize: "0.85rem",
                  marginBottom: "2rem",
                  textAlign: "center"
                }}>
                  {feedback}
                </div>
              )}

              <div className="wallet-section">
                {/* Virtual Card Graphic */}
                <div className="virtual-card">
                  <div>
                    <div className="card-chip"></div>
                    <span className="card-logo">Unyra.</span>
                  </div>
                  <div className="card-balance-block">
                    <div className="card-balance-lbl">Available Balance</div>
                    <div className="card-balance">${currentUser.walletBalance.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="card-number">•••• •••• •••• {currentUser.id.slice(-4)}</div>
                    <div className="card-holder">{currentUser.name}</div>
                  </div>
                </div>

                {/* Top Up Form */}
                <div className="topup-card">
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "var(--primary-dark)", marginBottom: "1rem", fontWeight: 500 }}>
                    Add Balance instantly
                  </h4>
                  <div className="topup-grid">
                    <button className="topup-amt-btn" onClick={() => handleQuickTopup(50)}>+$50</button>
                    <button className="topup-amt-btn" onClick={() => handleQuickTopup(100)}>+$100</button>
                    <button className="topup-amt-btn" onClick={() => handleQuickTopup(200)}>+$200</button>
                  </div>
                  <form className="topup-form" onSubmit={handleCustomTopup}>
                    <input 
                      type="number" 
                      className="topup-input" 
                      placeholder="Custom Amount ($)" 
                      value={topupAmount}
                      onChange={(e) => setTopupAmount(e.target.value)}
                      min="1"
                      step="any"
                      required
                    />
                    <button type="submit" className="topup-submit">Recharge</button>
                  </form>
                </div>
              </div>

              {/* Transactions list */}
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "var(--primary-dark)", marginBottom: "1.25rem", fontWeight: 500 }}>
                Transaction History
              </h4>
              {currentUser.transactions.length === 0 ? (
                <p style={{ color: "var(--text-muted)", fontStyle: "italic", textAlign: "center", padding: "2rem" }}>
                  No transactions logged yet.
                </p>
              ) : (
                <div className="uny-table-container">
                  <table className="uny-table">
                    <thead>
                      <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUser.transactions.map((tx) => (
                        <tr key={tx.id}>
                          <td style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{tx.id}</td>
                          <td>{tx.date}</td>
                          <td style={{ fontWeight: 500 }}>{tx.description}</td>
                          <td>
                            <span 
                              style={{ 
                                fontSize: "0.75rem", 
                                fontWeight: "bold", 
                                textTransform: "uppercase",
                                padding: "0.15rem 0.5rem",
                                borderRadius: "4px",
                                background: tx.type === "Credit" ? "rgba(72,187,120,0.1)" : "rgba(0,0,0,0.03)",
                                color: tx.type === "Credit" ? "#48bb78" : "var(--primary-dark)"
                              }}
                            >
                              {tx.type}
                            </span>
                          </td>
                          <td className={`tx-amt ${tx.type.toLowerCase()}`}>
                            {tx.type === "Credit" ? "+" : "-"}${tx.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Profile */}
          {activeTab === "profile" && (
            <div>
              <h3 className="db-tab-title">Profile Settings</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "1rem", borderBottom: "1px solid rgba(197, 154, 111, 0.08)", paddingBottom: "1rem" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-muted)" }}>User ID</span>
                  <span style={{ fontFamily: "monospace", color: "var(--primary-dark)" }}>{currentUser.id}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "1rem", borderBottom: "1px solid rgba(197, 154, 111, 0.08)", paddingBottom: "1rem" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-muted)" }}>Full Name</span>
                  <span style={{ color: "var(--primary-dark)", fontWeight: 500 }}>{currentUser.name}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "1rem", borderBottom: "1px solid rgba(197, 154, 111, 0.08)", paddingBottom: "1rem" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-muted)" }}>Email Address</span>
                  <span style={{ color: "var(--primary-dark)", fontWeight: 500 }}>{currentUser.email}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "1rem", borderBottom: "1px solid rgba(197, 154, 111, 0.08)", paddingBottom: "1rem" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-muted)" }}>Wallet Type</span>
                  <span style={{ color: "var(--accent-gold)", fontWeight: 600 }}>Unyra Gold Wallet Member</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "1rem", paddingBottom: "1rem" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-muted)" }}>Account Tier</span>
                  <span style={{ color: "var(--primary-dark)" }}>Verified Customer</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
