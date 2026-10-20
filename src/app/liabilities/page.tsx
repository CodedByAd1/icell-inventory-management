"use client";

import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { LIABILITIES, STATUS_COLORS, formatDate } from "@/lib/data";

export default function LiabilitiesPage() {
  const pending = LIABILITIES.filter(l => l.status === "Pending");
  const resolved = LIABILITIES.filter(l => l.status === "Resolved");

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1000 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <AlertTriangle size={22} color="#ef4444" />
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Damage &amp; Loss Liabilities</h1>
      </div>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: 24 }}>
        Track equipment damage and loss records and their resolution status
      </p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Pending", count: pending.length, color: "#ef4444" },
          { label: "Resolved", count: resolved.length, color: "#10b981" },
          { label: "Total", count: LIABILITIES.length, color: "#94a3b8" },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <AlertTriangle size={14} color="#ef4444" /> Pending Liabilities
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pending.map(l => (
              <div key={l.id} className="glass-card" style={{ padding: "16px 20px", borderColor: "rgba(239,68,68,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                      <span className="badge" style={{ background: "rgba(239,68,68,0.1)", color: "#fca5a5", borderColor: "rgba(239,68,68,0.2)" }}>
                        {l.type}
                      </span>
                      <span className={`badge ${STATUS_COLORS[l.status]}`}>{l.status}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{l.memberName}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: 2 }}>
                      {l.itemName} &times; {l.quantity}
                    </div>
                    {l.remarks && (
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 6 }}>{l.remarks}</div>
                    )}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Recorded {formatDate(l.createdAt)}</div>
                    <button className="btn btn-success" style={{ marginTop: 10 }}>
                      <CheckCircle2 size={12} /> Mark Resolved
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resolved */}
      {resolved.length > 0 && (
        <div>
          <h2 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle2 size={14} color="#10b981" /> Resolved
          </h2>
          <div className="glass-card" style={{ overflow: "hidden" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Type</th>
                  <th>Resolution</th>
                  <th>Resolved At</th>
                </tr>
              </thead>
              <tbody>
                {resolved.map(l => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 500, fontSize: "0.83rem" }}>{l.memberName}</td>
                    <td style={{ fontSize: "0.83rem" }}>{l.itemName}</td>
                    <td>{l.quantity}</td>
                    <td><span className={`badge ${STATUS_COLORS[l.type]}`}>{l.type}</span></td>
                    <td><span className="badge" style={{ background: "rgba(16,185,129,0.1)", color: "#6ee7b7", borderColor: "rgba(16,185,129,0.2)" }}>{l.resolutionType}</span></td>
                    <td style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{l.resolvedAt ? formatDate(l.resolvedAt) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
