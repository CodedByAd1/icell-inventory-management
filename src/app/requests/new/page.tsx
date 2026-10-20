"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, ClipboardList } from "lucide-react";
import { ITEMS, CURRENT_USER } from "@/lib/data";

export default function NewRequestPage() {
  const [purpose, setPurpose] = useState("");
  const [items, setItems] = useState([{ itemId: "", qty: 1 }]);

  const addItem = () => setItems(prev => [...prev, { itemId: "", qty: 1 }]);
  const removeItem = (i: number) => setItems(prev => prev.filter((_, j) => j !== i));
  const updateItem = (i: number, field: "itemId" | "qty", val: string | number) =>
    setItems(prev => prev.map((it, j) => j === i ? { ...it, [field]: val } : it));

  const availableItems = ITEMS.filter(i => i.status === "Active");

  return (
    <div style={{ padding: "28px 32px", maxWidth: 700 }}>
      <Link href="/requests" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--text-muted)", textDecoration: "none", marginBottom: 20 }}>
        <ArrowLeft size={14} /> Back to Requests
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <ClipboardList size={22} color="#60a5fa" />
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700 }}>New Equipment Request</h1>
      </div>

      <div className="glass-card" style={{ padding: "24px" }}>
        {/* Requester info */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "12px 14px", background: "rgba(59,130,246,0.06)", borderRadius: 8, border: "1px solid rgba(59,130,246,0.15)", marginBottom: 24 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#60a5fa,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "white" }}>
            {CURRENT_USER.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <div style={{ fontSize: "0.83rem", fontWeight: 600 }}>{CURRENT_USER.name}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{CURRENT_USER.email}</div>
          </div>
        </div>

        {/* Purpose */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Purpose / Project Description *
          </label>
          <textarea
            className="form-input"
            rows={3}
            placeholder="Briefly describe why you need this equipment..."
            value={purpose}
            onChange={e => setPurpose(e.target.value)}
            style={{ resize: "vertical" }}
          />
        </div>

        {/* Equipment Items */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Equipment Items *
            </label>
            <button className="btn btn-ghost" onClick={addItem} style={{ padding: "4px 10px", fontSize: "0.75rem" }}>
              <Plus size={12} /> Add Item
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((it, i) => {
              const selected = availableItems.find(ai => ai.id === it.itemId);
              return (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <select className="form-input" value={it.itemId} onChange={e => updateItem(i, "itemId", e.target.value)}>
                      <option value="">Select equipment...</option>
                      {availableItems.map(ai => (
                        <option key={ai.id} value={ai.id}>
                          {ai.name} (Available: {ai.availableQuantity})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ width: 90 }}>
                    <input
                      className="form-input"
                      type="number"
                      min={1}
                      max={selected?.availableQuantity ?? 99}
                      value={it.qty}
                      onChange={e => updateItem(i, "qty", parseInt(e.target.value) || 1)}
                      placeholder="Qty"
                    />
                  </div>
                  <button
                    onClick={() => removeItem(i)}
                    disabled={items.length === 1}
                    style={{ padding: "8px", background: "transparent", border: "none", cursor: items.length === 1 ? "not-allowed" : "pointer", color: items.length === 1 ? "var(--text-muted)" : "#ef4444" }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div style={{ padding: "10px 12px", background: "rgba(245,158,11,0.06)", borderRadius: 8, border: "1px solid rgba(245,158,11,0.15)", marginBottom: 20 }}>
          <p style={{ fontSize: "0.75rem", color: "#fbbf24" }}>
            ⚠️ Requests cannot be edited after submission. Cancel and create a new request if changes are needed.
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Link href="/requests" className="btn btn-ghost">Cancel</Link>
          <button
            className="btn btn-primary"
            disabled={!purpose.trim() || items.some(it => !it.itemId || it.qty < 1)}
            onClick={() => alert("Request submitted! (Prototype — no backend)")}
            style={{ opacity: (!purpose.trim() || items.some(it => !it.itemId)) ? 0.5 : 1 }}>
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}
