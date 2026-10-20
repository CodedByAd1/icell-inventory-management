"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPw, setShowPw] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg-primary)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background decorations */}
      <div style={{ position: "absolute", inset: 0 }} className="bg-grid" />
      <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420, padding: "0 16px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
            boxShadow: "0 8px 24px rgba(59,130,246,0.35)",
          }}>
            <Zap size={24} color="white" />
          </div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 700 }}>I Cell Inventory</h1>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 4 }}>Innovation Cell, NIT Raipur</p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: "28px 28px" }}>
          {/* Tab switcher */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 3, marginBottom: 24 }}>
            {(["login", "register"] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: "7px", borderRadius: 6, border: "none", cursor: "pointer",
                background: mode === m ? "rgba(59,130,246,0.2)" : "transparent",
                color: mode === m ? "#60a5fa" : "var(--text-muted)",
                fontSize: "0.83rem", fontWeight: 600, transition: "all 0.2s",
              }}>
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          {mode === "login" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: 6 }}>Institutional Email</label>
                <div style={{ position: "relative" }}>
                  <Mail size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input className="form-input" style={{ paddingLeft: 32 }} type="email" placeholder="you@nitrraipur.ac.in" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: 6 }}>Password</label>
                <div style={{ position: "relative" }}>
                  <Lock size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input className="form-input" style={{ paddingLeft: 32, paddingRight: 36 }} type={showPw ? "text" : "password"} placeholder="••••••••" />
                  <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0 }}>
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <Link href="/dashboard" className="btn btn-primary" style={{ justifyContent: "center", marginTop: 6, textDecoration: "none" }}>
                Sign In
              </Link>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center" }}>
                Only NIT Raipur institutional email addresses are accepted.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: 6 }}>Full Name</label>
                <div style={{ position: "relative" }}>
                  <User size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input className="form-input" style={{ paddingLeft: 32 }} placeholder="Your full name" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: 6 }}>Institutional Email</label>
                <div style={{ position: "relative" }}>
                  <Mail size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input className="form-input" style={{ paddingLeft: 32 }} type="email" placeholder="you@nitrraipur.ac.in" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: 6 }}>Academic Year</label>
                <select className="form-input">
                  <option value="">Select your year...</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <button className="btn btn-primary" style={{ justifyContent: "center", marginTop: 6 }} onClick={() => alert("Registration submitted! An admin will review and approve your account.")}>
                Submit Registration
              </button>
              <div style={{ padding: "10px 12px", background: "rgba(59,130,246,0.06)", borderRadius: 8, border: "1px solid rgba(59,130,246,0.15)" }}>
                <p style={{ fontSize: "0.72rem", color: "#93c5fd", lineHeight: 1.5 }}>
                  Your registration will be reviewed by an Overall Coordinator or Faculty Advisor. You'll receive your credentials via institutional email upon approval.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
