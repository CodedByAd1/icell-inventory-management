"use client";

import { use, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Package, MapPin, Tag, Edit2, Clock, Layers } from "lucide-react";
import { ITEMS, ISSUES, REQUESTS, CURRENT_USER, STATUS_COLORS, canManage, formatDate, formatDateTime } from "@/lib/data";

function ItemDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const item = ITEMS.find(i => i.id === id);
  const isAdmin = canManage(CURRENT_USER.role);

  if (!item) {
    return (
      <div style={{ padding: "60px 32px", textAlign: "center", color: "var(--text-muted)" }}>
        <Package size={48} style={{ opacity: 0.3, margin: "0 auto 12px" }} />
        <p>Item not found.</p>
        <Link href="/inventory" className="btn btn-ghost" style={{ marginTop: 16, display: "inline-flex" }}>
          <ArrowLeft size={14} /> Back to Inventory
        </Link>
      </div>
    );
  }

  const pct = item.totalQuantity > 0 ? (item.availableQuantity / item.totalQuantity) * 100 : 0;
  const barColor = pct > 50 ? "#10b981" : pct > 20 ? "#f59e0b" : "#ef4444";
  const activeIssues = ISSUES.filter(iss => iss.itemId === id && (iss.status === "Active" || iss.status === "PartiallyReturned"));

  return (
    <div style={{ padding: "28px 32px", maxWidth: 900 }}>
      {/* Back */}
      <Link href="/inventory" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--text-muted)", textDecoration: "none", marginBottom: 20 }}
        onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
        <ArrowLeft size={14} /> Back to Inventory
      </Link>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span className="badge" style={{ background: "rgba(99,179,237,0.1)", color: "#93c5fd", borderColor: "rgba(99,179,237,0.2)" }}>
              <Tag size={10} style={{ marginRight: 4 }} />{item.category}
            </span>
            <span className={`badge ${STATUS_COLORS[item.status]}`}>{item.status}</span>
          </div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 700 }}>{item.name}</h1>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>ID: {item.id}</p>
        </div>
        {isAdmin && (
          <button className="btn btn-ghost">
            <Edit2 size={14} /> Edit Item
          </button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Description */}
          <div className="glass-card" style={{ padding: "18px" }}>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Description</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.description}</p>
          </div>

          {/* Quantity breakdown */}
          <div className="glass-card" style={{ padding: "18px" }}>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Quantity</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 14 }}>
              {[
                { label: "Total", val: item.totalQuantity, color: "var(--text-primary)" },
                { label: "Issued", val: item.issuedQuantity, color: "#f59e0b" },
                { label: "Available", val: item.availableQuantity, color: barColor },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center", padding: "14px 10px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 700, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 6 }}>
              <span>Availability</span>
              <span style={{ color: barColor }}>{pct.toFixed(0)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
            </div>
          </div>

          {/* Active issues */}
          {activeIssues.length > 0 && (
            <div className="glass-card" style={{ padding: "18px" }}>
              <h3 style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Currently Issued To</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {activeIssues.map(iss => (
                  <div key={iss.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--border)" }}>
                    <div>
                      <p style={{ fontSize: "0.83rem", fontWeight: 500 }}>{iss.memberName}</p>
                      <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
                        <Clock size={10} color="var(--text-muted)" />
                        <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{formatDateTime(iss.issuedAt)}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: "#f59e0b" }}>{iss.outstandingQty}</div>
                      <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>outstanding</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Admin: Locations */}
          {isAdmin && (
            <div className="glass-card" style={{ padding: "18px" }}>
              <h3 style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
                <Layers size={12} style={{ display: "inline", marginRight: 6 }} />Storage Locations
              </h3>
              {item.locations.map((loc, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "rgba(255,255,255,0.03)", borderRadius: 6, marginBottom: 6, border: "1px solid var(--border)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                    <MapPin size={11} color="#60a5fa" /> {loc.location}
                  </span>
                  <strong style={{ fontSize: "0.83rem" }}>{loc.quantity}</strong>
                </div>
              ))}
            </div>
          )}

          {/* Metadata */}
          <div className="glass-card" style={{ padding: "18px" }}>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Metadata</h3>
            {[
              { label: "Item ID", val: item.id },
              { label: "Category", val: item.category },
              { label: "Status", val: item.status },
              { label: "Created", val: formatDate(item.createdAt) },
              { label: "Last Updated", val: formatDate(item.updatedAt) },
            ].map(m => (
              <div key={m.label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--border)", fontSize: "0.8rem" }}>
                <span style={{ color: "var(--text-muted)" }}>{m.label}</span>
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{m.val}</span>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="glass-card" style={{ padding: "18px" }}>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Quick Actions</h3>
            <Link href="/requests/new" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginBottom: 8 }}>
              Request This Item
            </Link>
            {isAdmin && (
              <>
                <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginBottom: 8 }}>
                  Adjust Quantity
                </button>
                <button className="btn btn-danger" style={{ width: "100%", justifyContent: "center" }}>
                  Retire Item
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ItemDetailPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div style={{ padding: "32px", color: "var(--text-muted)" }}>Loading item details...</div>}>
      <ItemDetailContent {...props} />
    </Suspense>
  );
}
