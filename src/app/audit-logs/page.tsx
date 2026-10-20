"use client";

import { useState } from "react";
import { ScrollText, Search, Filter } from "lucide-react";
import { AUDIT_LOGS, formatDateTime } from "@/lib/data";
import type { AuditAction } from "@/lib/data";

const ACTION_COLORS: Partial<Record<AuditAction, string>> = {
  REQUEST_CREATED: "rgba(59,130,246,0.15)",
  REQUEST_APPROVED: "rgba(16,185,129,0.15)",
  REQUEST_REJECTED: "rgba(239,68,68,0.15)",
  REQUEST_CANCELLED: "rgba(100,116,139,0.15)",
  EQUIPMENT_ISSUED: "rgba(139,92,246,0.15)",
  EQUIPMENT_RETURNED: "rgba(20,184,166,0.15)",
  USER_APPROVED: "rgba(6,182,212,0.15)",
  USER_DEACTIVATED: "rgba(239,68,68,0.15)",
  LIABILITY_RESOLVED: "rgba(16,185,129,0.15)",
  ITEM_ADDED: "rgba(245,158,11,0.15)",
  DAMAGE_RECORDED: "rgba(239,68,68,0.15)",
  LOSS_RECORDED: "rgba(239,68,68,0.15)",
};

const ACTION_TEXT: Partial<Record<AuditAction, string>> = {
  REQUEST_CREATED: "#60a5fa",
  REQUEST_APPROVED: "#34d399",
  REQUEST_REJECTED: "#f87171",
  REQUEST_CANCELLED: "#94a3b8",
  EQUIPMENT_ISSUED: "#a78bfa",
  EQUIPMENT_RETURNED: "#2dd4bf",
  USER_APPROVED: "#22d3ee",
  USER_DEACTIVATED: "#f87171",
  LIABILITY_RESOLVED: "#34d399",
  ITEM_ADDED: "#fbbf24",
  DAMAGE_RECORDED: "#f87171",
  LOSS_RECORDED: "#f87171",
};

const ACTION_GROUPS = [
  "All",
  "Authentication",
  "Inventory",
  "Requests",
  "Equipment",
  "Users",
  "Liability",
];

const GROUP_ACTIONS: Record<string, AuditAction[]> = {
  Authentication: ["USER_REGISTERED", "USER_APPROVED", "USER_DEACTIVATED", "ROLE_CHANGED"],
  Inventory: ["ITEM_ADDED", "ITEM_EDITED", "ITEM_DELETED", "QUANTITY_ADJUSTED", "CATEGORY_CREATED", "CATEGORY_EDITED"],
  Requests: ["REQUEST_CREATED", "REQUEST_APPROVED", "REQUEST_REJECTED", "REQUEST_CANCELLED"],
  Equipment: ["EQUIPMENT_ISSUED", "EQUIPMENT_RETURNED", "DAMAGE_RECORDED", "LOSS_RECORDED"],
  Users: ["USER_REGISTERED", "USER_APPROVED", "USER_DEACTIVATED", "ROLE_CHANGED"],
  Liability: ["LIABILITY_RESOLVED"],
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("All");

  const sorted = AUDIT_LOGS.slice().reverse();

  const filtered = sorted.filter(log =>
    (group === "All" || GROUP_ACTIONS[group]?.includes(log.action)) &&
    (log.detail.toLowerCase().includes(search.toLowerCase()) ||
      log.actorName.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <ScrollText size={22} color="#60a5fa" />
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Audit Logs</h1>
      </div>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: 24 }}>
        Immutable record of all significant system actions
      </p>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input className="form-input" style={{ paddingLeft: 32 }} placeholder="Search logs..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Filter size={14} color="var(--text-muted)" style={{ alignSelf: "center" }} />
          {ACTION_GROUPS.map(g => (
            <button key={g} onClick={() => setGroup(g)} className="btn btn-ghost"
              style={group === g ? { background: "rgba(59,130,246,0.15)", color: "#60a5fa", borderColor: "rgba(59,130,246,0.3)" } : {}}>
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Log table */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Actor</th>
              <th>Action</th>
              <th>Entity</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(log => (
              <tr key={log.id}>
                <td style={{ fontSize: "0.72rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                  {formatDateTime(log.timestamp)}
                </td>
                <td style={{ fontWeight: 500, fontSize: "0.82rem" }}>{log.actorName}</td>
                <td>
                  <span className="badge" style={{
                    background: ACTION_COLORS[log.action] ?? "rgba(100,116,139,0.15)",
                    color: ACTION_TEXT[log.action] ?? "#94a3b8",
                    borderColor: "transparent",
                    fontSize: "0.6rem",
                    letterSpacing: "0.06em",
                  }}>
                    {log.action.replace(/_/g, " ")}
                  </span>
                </td>
                <td style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--text-muted)" }}>{log.entity}</span> #{log.entityId}
                </td>
                <td style={{ fontSize: "0.78rem", color: "var(--text-secondary)", maxWidth: 400 }}>
                  {log.detail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
            <ScrollText size={36} style={{ opacity: 0.3, margin: "0 auto 10px" }} />
            <p>No audit logs found.</p>
          </div>
        )}
      </div>

      <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 10, textAlign: "right" }}>
        {filtered.length} record{filtered.length !== 1 ? "s" : ""} shown
      </p>
    </div>
  );
}
