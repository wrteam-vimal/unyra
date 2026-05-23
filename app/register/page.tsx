"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const { register, currentUser } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const redirect = searchParams.get("redirect") || "/dashboard";

  useEffect(() => {
    if (currentUser) {
      router.push(redirect);
    }
  }, [currentUser, router, redirect]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const successVal = register(name, email, password);
    if (successVal) {
      setSuccess("Account created successfully! Credited $100 Welcome Bonus to your wallet. Redirecting...");
      setTimeout(() => {
        router.push(redirect);
      }, 1500);
    } else {
      setError("An account with this email address already exists.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ maxWidth: "520px" }}>
        <h1 className="auth-title">Unyra.</h1>
        <p className="auth-subtitle">Create your premium self-care account</p>

        <div style={{
          background: "rgba(197, 154, 111, 0.08)",
          border: "1px solid rgba(197, 154, 111, 0.2)",
          borderRadius: "16px",
          padding: "1rem 1.2rem",
          marginBottom: "1.5rem",
          fontSize: "0.85rem",
          color: "var(--accent-gold)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          textAlign: "left"
        }}>
          <span style={{ fontSize: "1.5rem" }}>🎁</span>
          <div>
            <strong>Welcome Sign-Up Bonus!</strong>
            <p style={{ margin: "0.15rem 0 0", color: "var(--text-muted)", fontSize: "0.75rem" }}>
              Register today and get <strong>$100.00</strong> credited instantly to your virtual wallet.
            </p>
          </div>
        </div>

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
            <label className="auth-label" htmlFor="reg-name">Full Name</label>
            <input
              type="text"
              id="reg-name"
              className="auth-control"
              placeholder="Vimal Patel"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="auth-group">
            <label className="auth-label" htmlFor="reg-email">Email Address</label>
            <input
              type="email"
              id="reg-email"
              className="auth-control"
              placeholder="vimal@unyra.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", textAlign: "left" }}>
            <div className="auth-group">
              <label className="auth-label" htmlFor="reg-pass">Password</label>
              <input
                type="password"
                id="reg-pass"
                className="auth-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-group">
              <label className="auth-label" htmlFor="reg-conf">Confirm</label>
              <input
                type="password"
                id="reg-conf"
                className="auth-control"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-btn">
            Register Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? 
          <Link href={`/login${searchParams.toString() ? '?' + searchParams.toString() : ''}`} className="auth-link">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
