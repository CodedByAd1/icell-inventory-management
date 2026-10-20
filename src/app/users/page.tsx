"use client";

import { useState } from "react";
import { Users, Search, UserCheck, UserX, Shield } from "lucide-react";
import { USERS, ROLE_COLORS, STATUS_COLORS, formatDate } from "@/lib/data";
import type { Role, UserStatus } from "@/lib/data";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All");

  const filtered = USERS.filter(u =>
    (statusFilter === "All" || u.status === statusFilter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const pending = USERS.filter(u => u.status === "Pending");

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <Users size={22} color="#60a5fa" />
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700 }}>User Management</h1>
      </div>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: 24 }}>
        Manage I Cell members, registrations, and roles
      </p>

      {/* Pending registrations alert */}
      {pending.length > 0 && (
        <div style={{ padding: "14px 18px", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fbbf24" }}>
              {pending.length} Pending Registration{pending.length > 1 ? "s" : ""}
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>
              {pending.map(u => u.name).join(", ")}
            </p>
          </div>
          <button className="btn btn-ghost" style={{ fontSize: "0.8rem" }}>Review →</button>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total Users", count: USERS.length, color: "var(--text-primary)" },
          { label: "Active", count: USERS.filter(u => u.status === "Active").length, color: "#10b981" },
          { label: "Pending", count: pending.length, color: "#f59e0b" },
          { label: "Inactive", count: USERS.filter(u => u.status === "Inactive").length, color: "#94a3b8" },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input className="form-input" style={{ paddingLeft: 32 }} placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {(["All", "Active", "Pending", "Inactive"] as const).map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className="btn btn-ghost"
            style={statusFilter === s ? { background: "rgba(59,130,246,0.15)", color: "#60a5fa", borderColor: "rgba(59,130,246,0.3)" } : {}}>
            {s}
          </button>
        ))}
      </div>

      <div className="glass-card" style={{ overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Year</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#60a5fa,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
                      {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <span style={{ fontWeight: 500, fontSize: "0.83rem" }}>{user.name}</span>
                  </div>
                </td>
                <td style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{user.email}</td>
                <td><span className={`badge ${ROLE_COLORS[user.role as Role]}`}>{user.role === "OC" ? "Overall Coord." : user.role}</span></td>
                <td style={{ fontSize: "0.83rem", color: "var(--text-muted)" }}>{user.year === 0 ? "Faculty" : `Year ${user.year}`}</td>
                <td><span className={`badge ${STATUS_COLORS[user.status]}`}>{user.status}</span></td>
                <td style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{formatDate(user.joinedAt)}</td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    {user.status === "Pending" && (
                      <button className="btn btn-success" style={{ padding: "4px 8px", fontSize: "0.7rem" }}>
                        <UserCheck size={11} /> Approve
                      </button>
                    )}
                    {user.status === "Active" && (
                      <>
                        <button className="btn btn-ghost" style={{ padding: "4px 8px", fontSize: "0.7rem" }}>
                          <Shield size={11} /> Role
                        </button>
                        <button className="btn btn-danger" style={{ padding: "4px 8px", fontSize: "0.7rem" }}>
                          <UserX size={11} /> Deactivate
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
