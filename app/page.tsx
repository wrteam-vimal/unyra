"use client";

import React, { useState, useEffect } from "react";
import { bannerMessages, products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerMessages.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const msg = bannerMessages[bannerIndex];
  
  const filteredProducts = filterType === "all" 
    ? products 
    : products.filter(p => p.category === filterType);

  const scrollToShop = () => {
    const el = document.getElementById("shop");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <section id="home" className="hero-wrapper">
        <div id="heroBgSlider" className="hero-bg-slider">
          {[1, 2, 3, 4].map((num, i) => (
            <div 
              key={num} 
              className={`hero-bg-slide ${i === bannerIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(/images/${num}.jpeg)` }}
            ></div>
          ))}
        </div>
        
        <div className="hero-overlay"></div>
        
        <div className="hero-banner">
          <div className="banner-carousel" id="bannerCarousel">
            <div className="carousel-content" key={bannerIndex} style={{ animation: "fadeIn 0.5s" }}>
              <span className="carousel-tag">{msg.tag}</span>
              <div className="carousel-text">{msg.text}</div>
              <div className="carousel-subtitle">{msg.subtitle}</div>
              <button className="cta-button hero-cta" onClick={scrollToShop}>Explore Shop</button>
            </div>
          </div>
          
          <div className="carousel-nav" id="carouselNav">
            {bannerMessages.map((_, i) => (
              <div 
                key={i} 
                className={`carousel-dot ${i === bannerIndex ? "active" : ""}`}
                onClick={() => setBannerIndex(i)}
              ></div>
            ))}
          </div>

          <div className="scroll-down-indicator" onClick={scrollToShop}>
            <div className="mouse-icon">
              <div className="mouse-wheel"></div>
            </div>
            <span className="scroll-text">Scroll Down</span>
          </div>
        </div>
      </section>

      <section id="shop" className="section-wrapper">
        <h2 className="section-title">Our Collection</h2>
        <div className="section-subtitle">Discover Your Ritual</div>
        
        <div className="product-filter">
          <button className={`filter-btn ${filterType === "all" ? "active" : ""}`} onClick={() => setFilterType("all")}>All Products</button>
          <button className={`filter-btn ${filterType === "face" ? "active" : ""}`} onClick={() => setFilterType("face")}>Face Care</button>
          <button className={`filter-btn ${filterType === "body" ? "active" : ""}`} onClick={() => setFilterType("body")}>Body Care</button>
        </div>

        <div id="productsGridContainer">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="about" className="section-wrapper">
        <div className="about-grid">
          <div className="about-image">
            <img src="/images/6.jpeg" alt="Natural ingredients" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
          </div>
          <div className="about-content">
            <h3>Clean Beauty, Defined.</h3>
            <p>At <strong>Unyra</strong>, we believe skincare should be an uncomplicated ritual of self-love. Born from the desire to create effective, inclusive, and clean products, we meticulously formulate everything to work with your skin&apos;s natural intelligence.</p>
            <p>We say no to harsh chemicals, artificial fragrances, and unnecessary fillers. Instead, we embrace the power of nature combined with clean science.</p>
          </div>
        </div>
        
        <div className="about-grid">
          <div className="about-content">
            <h3>Care Beyond Gender.</h3>
            <p>Skin is skin. Our formulations are designed around concerns, not gender labels. Whether you&apos;re targeting hydration, brightening, or anti-aging, our products deliver results for everyone.</p>
            <p>Embrace a routine that celebrates you, exactly as you are.</p>
          </div>
          <div className="about-image">
            <img src="/images/7.jpeg" alt="Inclusive skincare" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
          </div>
        </div>
      </section>

      <section id="reviews" className="section-wrapper">
        <h2 className="section-title">Real Results</h2>
        <div className="section-subtitle">What Our Community Says</div>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p className="testimonial-text">&ldquo;I&apos;ve struggled with finding a moisturizer that doesn&apos;t feel heavy but actually hydrates. The Unyra Moisturiser is a game-changer. My skin feels plump and looks radiant all day.&rdquo;</p>
            <div className="testimonial-author">Alex D.</div>
          </div>
          
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p className="testimonial-text">&ldquo;Finally, a brand that understands skincare shouldn&apos;t be complicated or gendered. The Face Serum has completely transformed my evening routine.&rdquo;</p>
            <div className="testimonial-author">Sam R.</div>
          </div>
          
          <div className="testimonial-card">
            <div className="rating">★★★★☆</div>
            <p className="testimonial-text">&ldquo;The Body Wash is incredibly refreshing. I love the subtle, natural scent. It cleanses beautifully without leaving my skin feeling tight or dry.&rdquo;</p>
            <div className="testimonial-author">Jordan P.</div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-wrapper">
        <h2 className="section-title">Get in Touch</h2>
        <div className="section-subtitle">We&apos;re here to help with your skincare journey</div>
        
        <div className="contact-wrapper">
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" required placeholder="Your full name" />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required placeholder="your@email.com" />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" required placeholder="How can we help you?"></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </section>
      
      <button 
        id="backToTop" 
        className="back-to-top" 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
      </button>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </>
  );
}
