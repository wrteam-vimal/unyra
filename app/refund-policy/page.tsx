"use client";

import React from "react";

export default function RefundPolicy() {
  return (
    <div className="section-wrapper" style={{ minHeight: "80vh", paddingTop: "120px" }}>
      <div className="modal-content" style={{ margin: "0 auto", position: "relative", transform: "none", width: "100%", maxWidth: "800px" }}>
        <h2 className="section-title" style={{ marginBottom: "2rem", textAlign: "left", fontSize: "2.2rem" }}>Returns & Refund Policy</h2>
        <div className="policy-content">
          <h3>Our Commitment to Your Satisfaction</h3>
          <p>At Unyra, customer satisfaction is our top priority. We stand behind the quality of our products and offer a comprehensive refund policy to ensure you're completely happy with your purchase.</p>

          <h3>30-Day Satisfaction Guarantee</h3>
          <p>We offer a 30-day refund guarantee on all purchases. If you're not completely satisfied with your Unyra product for any reason, you can return it for a full refund or exchange.</p>

          <h3>How to Request a Refund</h3>
          <p>Contact our customer service team at refunds@unyra.com, provide your order number and reason for return, ship the product back to us (return shipping is free), and once received and inspected, we'll process your refund within 5-7 business days.</p>

          <h3>Refund Eligibility</h3>
          <p>To be eligible for a refund, the product must be unused or minimally used, the original packaging must be intact, the request must be made within 30 days of purchase, and proof of purchase is required.</p>

          <h3>Refund Processing</h3>
          <p>Refunds will be credited to the original payment method within 5-7 business days of receiving and inspecting the returned product. Please note that the time it takes for the credit to appear on your account may vary depending on your financial institution.</p>

          <h3>Damaged or Defective Products</h3>
          <p>If you receive a damaged or defective product, please contact us immediately with photos of the damage. We'll arrange for a replacement or full refund without requiring the return of the damaged item.</p>

          <h3>Exchanges</h3>
          <p>If you'd prefer to exchange your product for a different size, variant, or item, we'll be happy to help. Please contact us to arrange your exchange.</p>
        </div>
      </div>
    </div>
  );
}
