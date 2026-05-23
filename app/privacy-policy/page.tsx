"use client";

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="section-wrapper" style={{ minHeight: "80vh", paddingTop: "120px" }}>
      <div style={{ margin: "0 auto", width: "100%", maxWidth: "800px" }}>
        <h2 className="section-title" style={{ marginBottom: "2rem", textAlign: "left", fontSize: "2.5rem" }}>Privacy Policy</h2>
        <div className="policy-content">
          <h3>Introduction</h3>
          <p>At Unyra, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

          <h3>Information We Collect</h3>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
          <ul>
            <li><strong>Personal Data:</strong> Name, email address, phone number, mailing address</li>
            <li><strong>Payment Information:</strong> Credit card details (processed securely through third-party processors)</li>
            <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time spent on pages</li>
            <li><strong>Communication Data:</strong> Messages you send us through our contact forms</li>
          </ul>

          <h3>How We Use Your Information</h3>
          <p>Unyra uses the information we collect in the following ways:</p>
          <ul>
            <li>To process your orders and deliver our products</li>
            <li>To send you marketing communications (with your consent)</li>
            <li>To respond to your inquiries and support requests</li>
            <li>To improve our website and services</li>
            <li>To prevent fraud and ensure security</li>
          </ul>

          <h3>Data Security</h3>
          <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>

          <h3>Third-Party Disclosure</h3>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business, subject to strict confidentiality agreements.</p>

          <h3>Your Rights</h3>
          <p>You have the right to access, correct, or delete your personal data. You may also have the right to restrict or object to certain processing activities. To exercise these rights, please contact us using the information provided in the Contact section.</p>

          <h3>Cookies</h3>
          <p>Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, although this may limit your ability to use certain features of our website.</p>

          <h3>Changes to This Privacy Policy</h3>
          <p>We may update this Privacy Policy periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy regularly.</p>

          <h3>Contact Us</h3>
          <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us at privacy@unyra.com or through our contact form.</p>
        </div>
      </div>
    </div>
  );
}
