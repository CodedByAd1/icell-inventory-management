"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Search, Plus, Filter, MapPin, Tag, Eye, EyeOff } from "lucide-react";
import { ITEMS, CATEGORIES, CURRENT_USER, STATUS_COLORS, canManage, formatDate } from "@/lib/data";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [showAdmin, setShowAdmin] = useState(false);
  const isAdmin = canManage(CURRENT_USER.role);

  const filtered = ITEMS.filter(item =>
    item.status === "Active" &&
    (catFilter === "All" || item.category === catFilter) &&
    (item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1200 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Package size={22} color="#60a5fa" />
            <h1 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Inventory</h1>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Browse and manage I Cell equipment
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {isAdmin && (
            <button className="btn btn-ghost" onClick={() => setShowAdmin(!showAdmin)}>
              {showAdmin ? <EyeOff size={14} /> : <Eye size={14} />}
              {showAdmin ? "Hide Admin Info" : "Show Admin Info"}
            </button>
          )}
          {isAdmin && (
            <Link href="/inventory/new" className="btn btn-primary">
              <Plus size={14} /> Add Item
            </Link>
          )}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            className="form-input"
            style={{ paddingLeft: 32 }}
            placeholder="Search items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Filter size={14} color="var(--text-muted)" />
          <select className="form-input" style={{ width: "auto" }} value={catFilter} onChange={e => setCatFilter(e.target.value)}>
            <option value="All">All Categories</option>
            {CATEGORIES.filter(c => c.active).map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Items Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {filtered.map(item => {
          const pct = item.totalQuantity > 0 ? (item.availableQuantity / item.totalQuantity) * 100 : 0;
          const barColor = pct > 50 ? "#10b981" : pct > 20 ? "#f59e0b" : "#ef4444";
          return (
            <Link key={item.id} href={`/inventory/${item.id}`} style={{ textDecoration: "none" }}>
              <div className="glass-card" style={{ padding: "18px", cursor: "pointer", height: "100%" }}>
                {/* Category badge */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <span className="badge" style={{ background: "rgba(99,179,237,0.1)", color: "#93c5fd", borderColor: "rgba(99,179,237,0.2)", fontSize: "0.65rem" }}>
                    <Tag size={9} style={{ marginRight: 3 }} />
                    {item.category}
                  </span>
                  <span className={`badge ${STATUS_COLORS[item.status]}`}>{item.status}</span>
                </div>

                <h3 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: 6, color: "var(--text-primary)" }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: 14, lineHeight: 1.5,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {item.description}
                </p>

                {/* Qty stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                  {[
                    { label: "Total", val: item.totalQuantity, color: "var(--text-secondary)" },
                    { label: "Issued", val: item.issuedQuantity, color: "#f59e0b" },
                    { label: "Available", val: item.availableQuantity, color: barColor },
                  ].map(s => (
                    <div key={s.label} style={{ textAlign: "center", padding: "6px", background: "rgba(255,255,255,0.03)", borderRadius: 6 }}>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: s.color }}>{s.val}</div>
                      <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", marginTop: 1 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Progress */}
                <div className="progress-bar" style={{ marginBottom: 12 }}>
                  <div className="progress-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
                </div>

                {/* Admin info */}
                {isAdmin && showAdmin && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                    <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginBottom: 4, fontWeight: 600, letterSpacing: "0.05em" }}>LOCATIONS</p>
                    {item.locations.map((loc, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-secondary)", padding: "2px 0" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <MapPin size={10} /> {loc.location}
                        </span>
                        <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{loc.quantity}</span>
                      </div>
                    ))}
                    <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 6 }}>Updated {formatDate(item.updatedAt)}</p>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
          <Package size={40} style={{ opacity: 0.3, margin: "0 auto 12px" }} />
          <p>No items match your search.</p>
        </div>
      )}
    </div>
  );
}
