"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const getHref = (hash: string) => {
    return isHome ? `#${hash}` : `/#${hash}`;
  };

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-column">
            <h2 className="logo" style={{ marginBottom: "1.5rem" }}>Unyra.</h2>
            <p>
              Premium skincare formulated with organic, bio-compatible ingredients.
              Designed for all skin types and identities because self-care has no gender.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href={getHref("home")}>Home</Link></li>
              <li><Link href={getHref("shop")}>Shop</Link></li>
              <li><Link href={getHref("about")}>About Us</Link></li>
              <li><Link href={getHref("reviews")}>Reviews</Link></li>
              <li><Link href={getHref("contact")}>Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/refund-policy">Refund Policy</Link></li>
              <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
              <li><Link href="/shipping-info">Shipping Info</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Newsletter</h4>
            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <input type="email" placeholder="Enter your email address" style={{ marginBottom: "1rem" }} />
              <button className="submit-btn" style={{ padding: "0.8rem 1.5rem" }}>Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Unyra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
