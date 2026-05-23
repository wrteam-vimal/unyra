"use client";

import React, { useState } from "react";
import { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import QuickViewModal from "./QuickViewModal";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <>
      <Link href={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        <div className="product-card">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
            <div className="product-hover-overlay">
              <button
                className="btn-action"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                Add to Cart
              </button>
              <button
                className="btn-action"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsQuickViewOpen(true);
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                Quick View
              </button>
            </div>
          </div>
          <div className="product-content">
            <div className="product-benefits">{product.benefits}</div>
            <div className="product-name">{product.name}</div>
            <div className="product-size">{product.size}</div>
            <div className="product-price">
              {product.price.startsWith("$") ? (
                <>
                  <span className="price-currency">$</span>
                  {product.price.slice(1)}
                </>
              ) : (
                product.price
              )}
            </div>
          </div>
        </div>
      </Link>
      
      {isQuickViewOpen && (
        <QuickViewModal product={product} onClose={() => setIsQuickViewOpen(false)} />
      )}
    </>
  );
}
