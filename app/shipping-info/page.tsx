"use client";

import React from "react";

export default function ShippingInfo() {
  return (
    <div className="section-wrapper" style={{ minHeight: "80vh", paddingTop: "120px" }}>
      <div style={{ margin: "0 auto", width: "100%", maxWidth: "800px" }}>
        <h2 className="section-title" style={{ marginBottom: "2rem", textAlign: "left", fontSize: "2.5rem" }}>Shipping Information</h2>
        <div className="policy-content">
          <h3>Domestic Shipping</h3>
          <p>We offer standard and expedited shipping options for all domestic orders. Standard shipping typically takes 3-5 business days, while expedited shipping takes 1-2 business days.</p>

          <h3>International Shipping</h3>
          <p>We ship worldwide! International standard shipping takes 7-14 business days. Please note that customs duties and taxes may apply and are the responsibility of the customer.</p>

          <h3>Order Processing Time</h3>
          <p>All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the following business day.</p>

          <h3>Shipping Rates</h3>
          <p>Shipping rates are calculated at checkout based on your location and chosen shipping method. Free standard shipping is available for all domestic orders over $50.</p>

          <h3>Order Tracking</h3>
          <p>Once your order has shipped, you will receive a confirmation email with a tracking number so you can monitor your package&apos;s progress.</p>
        </div>
      </div>
    </div>
  );
}
