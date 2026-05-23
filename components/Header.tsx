"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { toggleCart, cartTotalQty } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const isHome = pathname === "/";

  // Since Next.js has separate routes now, the smooth scrolling to sections 
  // only works if we are on the home page. Otherwise, we navigate to the home page with a hash.
  const getHref = (hash: string) => {
    return isHome ? `#${hash}` : `/#${hash}`;
  };

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <nav>
        <Link href="/" className="logo">
          Unyra.
        </Link>

        <ul className={`nav-center ${menuActive ? "active" : ""}`} id="navCenter">
          <li><Link href={getHref("home")} onClick={() => setMenuActive(false)}>Home</Link></li>
          <li><Link href={getHref("shop")} onClick={() => setMenuActive(false)}>Shop</Link></li>
          <li><Link href={getHref("about")} onClick={() => setMenuActive(false)}>About</Link></li>
          <li><Link href={getHref("reviews")} onClick={() => setMenuActive(false)}>Reviews</Link></li>
          <li><Link href={getHref("contact")} onClick={() => setMenuActive(false)}>Contact</Link></li>
        </ul>

        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            <svg className="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            <svg className="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </button>

          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <button className="theme-toggle" onClick={toggleCart} aria-label="Open cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
            {cartTotalQty > 0 && (
              <span className="cart-badge" style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                background: 'var(--accent-gold)',
                color: 'white',
                fontSize: '0.7rem',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                pointerEvents: 'none',
                zIndex: 10
              }}>
                {cartTotalQty}
              </span>
            )}
          </div>

          <button className={`hamburger ${menuActive ? "active" : ""}`} onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
