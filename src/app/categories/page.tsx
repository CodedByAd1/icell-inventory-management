"use client";

import { useState } from "react";
import { Tag, Plus, Edit2, Trash2 } from "lucide-react";
import { CATEGORIES } from "@/lib/data";

export default function CategoriesPage() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div style={{ padding: "28px 32px", maxWidth: 800 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Tag size={22} color="#60a5fa" />
            <h1 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Categories</h1>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Manage equipment categories for inventory organization
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={14} /> {showForm ? "Cancel" : "New Category"}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="glass-card" style={{ padding: "20px", marginBottom: 20, borderColor: "rgba(59,130,246,0.2)" }}>
          <h3 style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: 14 }}>Create New Category</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Category Name *</label>
              <input className="form-input" placeholder="e.g. Microcontrollers" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Description</label>
              <input className="form-input" placeholder="Brief description..." value={desc} onChange={e => setDesc(e.target.value)} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            <button className="btn btn-primary" disabled={!name.trim()} onClick={() => { alert("Category created! (Prototype)"); setShowForm(false); setName(""); setDesc(""); }}>
              Create Category
            </button>
          </div>
        </div>
      )}

      {/* Categories list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="glass-card" style={{ padding: "16px 20px", opacity: cat.active ? 1 : 0.6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(99,179,237,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Tag size={16} color="#60a5fa" />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{cat.name}</span>
                    {!cat.active && (
                      <span className="badge" style={{ background: "rgba(100,116,139,0.2)", color: "#94a3b8", borderColor: "rgba(100,116,139,0.2)", fontSize: "0.6rem" }}>
                        Inactive
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>{cat.description}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>{cat.itemCount}</strong> item{cat.itemCount !== 1 ? "s" : ""}
                </span>
                <button className="btn btn-ghost" style={{ padding: "5px 10px" }}>
                  <Edit2 size={13} />
                </button>
                <button className="btn btn-danger" style={{ padding: "5px 10px" }} disabled={cat.itemCount > 0}
                  title={cat.itemCount > 0 ? "Cannot delete category with items" : "Delete"}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
