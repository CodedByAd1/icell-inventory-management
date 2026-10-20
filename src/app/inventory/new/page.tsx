"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Package, Plus, Trash2 } from "lucide-react";
import { CATEGORIES } from "@/lib/data";

export default function NewItemPage() {
  const [locations, setLocations] = useState([{ location: "", quantity: 0 }]);

  const addLoc = () => setLocations(p => [...p, { location: "", quantity: 0 }]);
  const removeLoc = (i: number) => setLocations(p => p.filter((_, j) => j !== i));
  const updateLoc = (i: number, field: "location" | "quantity", val: string | number) =>
    setLocations(p => p.map((l, j) => j === i ? { ...l, [field]: val } : l));

  return (
    <div style={{ padding: "28px 32px", maxWidth: 700 }}>
      <Link href="/inventory" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--text-muted)", textDecoration: "none", marginBottom: 20 }}>
        <ArrowLeft size={14} /> Back to Inventory
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <Package size={22} color="#60a5fa" />
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Add Inventory Item</h1>
      </div>

      <div className="glass-card" style={{ padding: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Item Name *</label>
            <input className="form-input" placeholder="e.g. Arduino Uno R3" />
          </div>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Category *</label>
            <select className="form-input">
              <option value="">Select category...</option>
              {CATEGORIES.filter(c => c.active).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Quantity *</label>
            <input className="form-input" type="number" min={1} placeholder="0" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Description</label>
            <textarea className="form-input" rows={3} placeholder="Specifications, notes..." style={{ resize: "vertical" }} />
          </div>
        </div>

        {/* Locations */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Storage Locations
            </label>
            <button className="btn btn-ghost" onClick={addLoc} style={{ padding: "4px 10px", fontSize: "0.75rem" }}>
              <Plus size={12} /> Add Location
            </button>
          </div>
          {locations.map((loc, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
              <input className="form-input" placeholder="e.g. Lab A – Shelf 1" value={loc.location} onChange={e => updateLoc(i, "location", e.target.value)} style={{ flex: 1 }} />
              <input className="form-input" type="number" min={0} placeholder="Qty" value={loc.quantity || ""} onChange={e => updateLoc(i, "quantity", parseInt(e.target.value) || 0)} style={{ width: 80 }} />
              <button onClick={() => removeLoc(i)} disabled={locations.length === 1} style={{ padding: "8px", background: "transparent", border: "none", cursor: locations.length === 1 ? "not-allowed" : "pointer", color: locations.length === 1 ? "var(--text-muted)" : "#ef4444" }}>
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Link href="/inventory" className="btn btn-ghost">Cancel</Link>
          <button className="btn btn-primary" onClick={() => alert("Item added! (Prototype — no backend)")}>
            Add to Inventory
          </button>
        </div>
      </div>
    </div>
  );
}
