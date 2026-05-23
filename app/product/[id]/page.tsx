"use client";

import React, { useState, use, useEffect } from "react";
import { products } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    if (product) {
      setTimeout(() => {
        setActiveImg(product.details.images[0] || product.image);
        setQty(1);
      }, 0);
      // Scroll to top on mount
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="section-wrapper" style={{ minHeight: "80vh", paddingTop: "140px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem", color: "var(--primary-dark)", marginBottom: "1.5rem" }}>Product Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2.5rem", fontSize: "1.1rem" }}>The product you are looking for does not exist or has been removed.</p>
        <Link href="/" className="cta-button" style={{ backgroundColor: "var(--primary-dark)", color: "var(--white)", border: "none", textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          Return to Shop
        </Link>
      </div>
    );
  }

  const otherProducts = products;

  const displayPrice = () => {
    if (product.price.startsWith("$")) {
      return (
        <>
          <span className="price-currency">$</span>
          {product.price.slice(1)}
        </>
      );
    }
    return product.price;
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  return (
    <div className="section-wrapper" style={{ minHeight: "100vh", paddingTop: "140px" }}>
      {/* Back link */}
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", fontWeight: 500, transition: "var(--transition-smooth)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}><polyline points="9 18 15 12 9 6"></polyline></svg>
          Back to Shop
        </Link>
      </div>

      {/* Main product columns */}
      <div className="pd-container">
        {/* Left Column: Image gallery */}
        <div className="pd-gallery">
          <div className="pd-main-img">
            {activeImg && <img src={activeImg} alt={product.name} />}
          </div>
          <div className="pd-thumbnails">
            {product.details.images.map((img, i) => (
              <button
                key={i}
                className={`pd-thumb ${img === activeImg ? "active" : ""}`}
                onClick={() => setActiveImg(img)}
                aria-label={`View thumbnail ${i + 1}`}
              >
                <img src={img} alt={`Thumbnail ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Information & specs */}
        <div className="pd-info">
          <span className="pd-category">{product.type}</span>
          <h1 className="pd-title">{product.name}</h1>
          <div className="pd-benefits">{product.benefits}</div>

          <div className="pd-price-row">
            <div className="pd-price">{displayPrice()}</div>
          </div>

          <div className="pd-desc" dangerouslySetInnerHTML={{ __html: product.details.description }} />

          <div className="pd-size-row">
            <div className="pd-label">Size</div>
            <div className="pd-size-badge">{product.size}</div>
          </div>

          {/* Actions */}
          <div className="pd-actions-row">
            <div className="pd-qty-selector">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">-</button>
              <input type="text" value={qty} readOnly aria-label="Selected quantity" />
              <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button>
            </div>
            <button className="pd-add-btn" onClick={handleAddToCart}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              Add to Cart
            </button>
          </div>

          {/* Specs Table */}
          <div style={{ borderTop: "1px solid rgba(197, 154, 111, 0.12)", paddingTop: "2rem", marginTop: "1rem" }}>
            <div className="pd-label">Specifications</div>
            <table className="pd-specs-table">
              <tbody>
                {Object.entries(product.details.specs).map(([key, value]) => (
                  <tr key={key}>
                    <th>{key}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reviews Dashboard section */}
      <div className="pd-reviews-wrapper">
        <h2 className="section-title" style={{ textAlign: "left", marginBottom: "3rem" }}>Customer Reviews</h2>
        
        <div className="pd-reviews-dashboard">
          {/* Summary average */}
          <div className="pd-reviews-summary">
            <div className="pd-reviews-score">{product.details.reviews.average}</div>
            <div className="pd-reviews-stars">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx}>
                  {idx < Math.round(parseFloat(product.details.reviews.average)) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <div className="pd-reviews-total">{product.details.reviews.total} Verified Reviews</div>
          </div>

          {/* Distribution progress bars */}
          <div className="pd-reviews-distribution">
            {Object.entries(product.details.reviews.distribution)
              .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
              .map(([rating, percent]) => (
                <div className="pd-dist-row" key={rating}>
                  <div className="pd-dist-label">{rating} star</div>
                  <div className="pd-dist-track">
                    <div className="pd-dist-fill" style={{ width: `${percent}%` }}></div>
                  </div>
                  <div className="pd-dist-count">{percent}%</div>
                </div>
              ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="pd-reviews-list">
          {product.details.reviews.list.map((rev, i) => (
            <div className="pd-review-card" key={i}>
              <div className="pd-review-header">
                <div className="pd-reviewer">
                  <img src={rev.avatar} className="pd-reviewer-avatar" alt={rev.name} />
                  <div className="pd-reviewer-info">
                    <div className="pd-reviewer-name">{rev.name}</div>
                    <div className="pd-review-meta">
                      {rev.verified && <span className="pd-verified-badge">Verified Purchase</span>} | {rev.date}
                    </div>
                  </div>
                </div>
                <div className="pd-review-stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx}>{idx < rev.rating ? "★" : "☆"}</span>
                  ))}
                </div>
              </div>
              <p className="pd-review-text">{rev.text}</p>
              {rev.images && rev.images.length > 0 && (
                <div className="pd-review-gallery">
                  {rev.images.map((img, idx) => (
                    <div className="pd-review-img" key={idx}>
                      <img src={img} alt="User upload" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* All Products horizontal scrollable section */}
      {otherProducts.length > 0 && (
        <div className="pd-similar-wrapper">
          <h2 className="section-title" style={{ textAlign: "left", marginBottom: "3rem" }}>Explore Our Collection</h2>
          <div className="horizontal-scroll-container">
            {otherProducts.map((simProd) => (
              <div className="horizontal-scroll-item" key={simProd.id}>
                <ProductCard product={simProd} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
