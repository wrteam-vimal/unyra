"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { login, currentUser } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const redirect = searchParams.get("redirect") || "/dashboard";

  useEffect(() => {
    // If already logged in, redirect away
    if (currentUser) {
      router.push(redirect);
    }
  }, [currentUser, router, redirect]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const successVal = login(email, password);
    if (successVal) {
      setSuccess("Successfully logged in! Redirecting...");
      setTimeout(() => {
        router.push(redirect);
      }, 1000);
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleDemoLogin = () => {
    setEmail("vimal@unyra.com");
    setPassword("password123");
    
    // Simulate direct login for ease
    const successVal = login("vimal@unyra.com", "password123");
    if (successVal) {
      setSuccess("Successfully logged in as Demo User! Redirecting...");
      setTimeout(() => {
        router.push(redirect);
      }, 1000);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Unyra.</h1>
        <p className="auth-subtitle">Sign in to your premium self-care account</p>

        {error && (
          <div style={{
            background: "rgba(245, 101, 101, 0.1)",
            border: "1px solid rgba(245, 101, 101, 0.3)",
            color: "#f56565",
            padding: "0.8rem 1.2rem",
            borderRadius: "30px",
            fontSize: "0.85rem",
            marginBottom: "1.5rem",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            background: "rgba(72, 187, 120, 0.1)",
            border: "1px solid rgba(72, 187, 120, 0.3)",
            color: "#48bb78",
            padding: "0.8rem 1.2rem",
            borderRadius: "30px",
            fontSize: "0.85rem",
            marginBottom: "1.5rem",
            textAlign: "center"
          }}>
            {success}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-group">
            <label className="auth-label" htmlFor="email-input">Email Address</label>
            <input
              type="email"
              id="email-input"
              className="auth-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-group">
            <label className="auth-label" htmlFor="pass-input">Password</label>
            <input
              type="password"
              id="pass-input"
              className="auth-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>

        <div className="demo-login-box">
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
            Want to test without registering?
          </p>
          <button className="demo-btn" onClick={handleDemoLogin}>
            Log In as Demo User (Vimal Patel)
          </button>
        </div>

        <div className="auth-footer">
          Don&apos;t have an account? 
          <Link href={`/register${searchParams.toString() ? '?' + searchParams.toString() : ''}`} className="auth-link">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
