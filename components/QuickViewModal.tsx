"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";

type QuickViewModalProps = {
  product: Product;
  onClose: () => void;
};

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [activeImg, setActiveImg] = useState(product.details.images[0]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleAdd = () => {
    addToCart(product, qty);
    onClose();
  };

  return (
    <div className="modal active" style={{ display: "flex", zIndex: 3000 }} onClick={(e) => {
      if ((e.target as HTMLElement).classList.contains("modal")) onClose();
    }}>
      <div className="modal-content quick-view-modal">
        <button className="close-modal" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="qv-container">
          <div className="qv-top">
            <div className="qv-gallery">
              <div className="qv-main-img-container">
                <img src={activeImg} alt={product.name} />
              </div>
              <div className="qv-thumbnails">
                {product.details.images.map((img, i) => (
                  <div
                    key={i}
                    className={`qv-thumb ${img === activeImg ? "active" : ""}`}
                    onClick={() => setActiveImg(img)}
                  >
                    <img src={img} alt={`Thumbnail ${i}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="qv-info">
              <h2 className="qv-title">{product.name}</h2>
              <div className="qv-rating">
                <span>{product.details.reviews.average}</span>
                <span>★</span>
                <span className="qv-rating-count">({product.details.reviews.total} reviews)</span>
              </div>
              <div className="qv-price">
                {product.price.startsWith("$") ? (
                  <>
                    <span className="price-currency">$</span>
                    {product.price.slice(1)}
                  </>
                ) : (
                  product.price
                )}
              </div>
              
              <div className="qv-desc" dangerouslySetInnerHTML={{ __html: product.details.description }} />
              
              <div className="qv-actions">
                <div className="qv-qty">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                  <input type="text" value={qty} readOnly />
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
                <button className="btn-add-cart" onClick={handleAdd}>Add to Cart</button>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", borderBottom: "1px solid var(--border-color)" }}>
                  <button 
                    style={{ background: "none", border: "none", padding: "0.5rem 0", cursor: "pointer", borderBottom: activeTab === "details" ? "2px solid var(--accent-gold)" : "2px solid transparent", color: activeTab === "details" ? "var(--primary-dark)" : "var(--text-muted)", fontWeight: activeTab === "details" ? 600 : 400 }}
                    onClick={() => setActiveTab("details")}
                  >
                    Details
                  </button>
                  <button 
                    style={{ background: "none", border: "none", padding: "0.5rem 0", cursor: "pointer", borderBottom: activeTab === "reviews" ? "2px solid var(--accent-gold)" : "2px solid transparent", color: activeTab === "reviews" ? "var(--primary-dark)" : "var(--text-muted)", fontWeight: activeTab === "reviews" ? 600 : 400 }}
                    onClick={() => setActiveTab("reviews")}
                  >
                    Reviews
                  </button>
                </div>
                
                {activeTab === "details" && (
                  <table className="qv-specs-table">
                    <tbody>
                      {Object.entries(product.details.specs).map(([key, value]) => (
                        <tr key={key}>
                          <th>{key}</th>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === "reviews" && (
                  <div>
                    {product.details.reviews.list.slice(0, 2).map((rev, i) => (
                      <div key={i} className="review-item" style={{ padding: "1rem 0", borderBottom: "1px solid var(--border-color)" }}>
                        <div className="reviewer-profile">
                          <img src={rev.avatar} className="reviewer-avatar" alt={rev.name} />
                          <div className="reviewer-name">{rev.name}</div>
                        </div>
                        <div className="review-stars" style={{ color: "var(--accent-gold)" }}>
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <span key={idx}>{idx < rev.rating ? "★" : "☆"}</span>
                          ))}
                        </div>
                        <div className="review-meta">
                          {rev.verified && <span className="verified-badge">Verified Purchase</span>} | {rev.date}
                        </div>
                        <div className="review-text">{rev.text}</div>
                        {rev.images && rev.images.length > 0 && (
                          <div className="review-images">
                            {rev.images.map((img, idx) => (
                              <img key={idx} src={img} alt="Review image" style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }} />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
