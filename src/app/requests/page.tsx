"use client";

import { useState } from "react";
import Link from "next/link";
import { ClipboardList, Plus, Filter, Search, ChevronRight } from "lucide-react";
import { REQUESTS, CURRENT_USER, STATUS_COLORS, canManage, formatDateTime } from "@/lib/data";
import type { RequestStatus } from "@/lib/data";

const STATUSES: (RequestStatus | "All")[] = ["All", "Pending", "Approved", "Issued", "Returned", "Rejected", "Cancelled"];

export default function RequestsPage() {
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "All">("All");
  const [search, setSearch] = useState("");
  const isAdmin = canManage(CURRENT_USER.role);

  const visible = isAdmin ? REQUESTS : REQUESTS.filter(r => r.requesterId === CURRENT_USER.id);
  const filtered = visible.filter(r =>
    (statusFilter === "All" || r.status === statusFilter) &&
    (r.requesterName.toLowerCase().includes(search.toLowerCase()) ||
      r.purpose.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1000 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <ClipboardList size={22} color="#60a5fa" />
            <h1 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Equipment Requests</h1>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            {isAdmin ? "All member equipment requests" : "Your equipment requests"}
          </p>
        </div>
        <Link href="/requests/new" className="btn btn-primary">
          <Plus size={14} /> New Request
        </Link>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input className="form-input" style={{ paddingLeft: 32 }} placeholder="Search requests..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {STATUSES.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className="btn btn-ghost"
              style={statusFilter === s ? { background: "rgba(59,130,246,0.15)", color: "#60a5fa", borderColor: "rgba(59,130,246,0.3)" } : {}}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              {isAdmin && <th>Requester</th>}
              <th>Purpose</th>
              <th>Items</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(req => (
              <tr key={req.id}>
                {isAdmin && (
                  <td>
                    <div style={{ fontWeight: 500, fontSize: "0.83rem" }}>{req.requesterName}</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{req.requesterId}</div>
                  </td>
                )}
                <td>
                  <div style={{ fontWeight: 500, fontSize: "0.83rem", maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {req.purpose}
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {req.items.map((it, i) => (
                      <div key={i} style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                        {it.itemName} <span style={{ color: "var(--text-muted)" }}>×{it.requestedQty}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td><span className={`badge ${STATUS_COLORS[req.status]}`}>{req.status}</span></td>
                <td style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{formatDateTime(req.createdAt)}</td>
                <td>
                  <Link href={`/requests/${req.id}`} className="btn btn-ghost" style={{ padding: "5px 10px" }}>
                    <ChevronRight size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
            <ClipboardList size={36} style={{ opacity: 0.3, margin: "0 auto 10px" }} />
            <p>No requests found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
