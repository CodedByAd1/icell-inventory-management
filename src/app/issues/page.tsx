"use client";

import Link from "next/link";
import { ArrowUpFromLine, ChevronRight } from "lucide-react";
import { ISSUES, CURRENT_USER, STATUS_COLORS, canManage, formatDateTime } from "@/lib/data";

export default function IssuesPage() {
  const isAdmin = canManage(CURRENT_USER.role);
  const issues = isAdmin ? ISSUES : ISSUES.filter(i => i.memberId === CURRENT_USER.id);

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1000 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <ArrowUpFromLine size={22} color="#60a5fa" />
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Equipment Issues</h1>
      </div>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: 24 }}>
        {isAdmin ? "All issued equipment records" : "Equipment currently issued to you"}
      </p>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Active", count: issues.filter(i => i.status === "Active").length, color: "#10b981" },
          { label: "Partially Returned", count: issues.filter(i => i.status === "PartiallyReturned").length, color: "#f59e0b" },
          { label: "Fully Returned", count: issues.filter(i => i.status === "Returned").length, color: "#94a3b8" },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              {isAdmin && <th>Member</th>}
              <th>Item</th>
              <th>Issued</th>
              <th>Returned</th>
              <th>Outstanding</th>
              <th>Status</th>
              <th>Issued At</th>
              {isAdmin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {issues.map(iss => (
              <tr key={iss.id}>
                {isAdmin && (
                  <td>
                    <div style={{ fontWeight: 500, fontSize: "0.83rem" }}>{iss.memberName}</div>
                  </td>
                )}
                <td>
                  <Link href={`/inventory/${iss.itemId}`} style={{ fontWeight: 500, fontSize: "0.83rem", color: "#60a5fa", textDecoration: "none" }}>
                    {iss.itemName}
                  </Link>
                </td>
                <td><span style={{ fontWeight: 600 }}>{iss.issuedQty}</span></td>
                <td style={{ color: "#10b981" }}>{iss.returnedQty}</td>
                <td>
                  <span style={{ color: iss.outstandingQty > 0 ? "#f59e0b" : "var(--text-muted)", fontWeight: 600 }}>
                    {iss.outstandingQty}
                  </span>
                </td>
                <td><span className={`badge ${STATUS_COLORS[iss.status]}`}>{iss.status}</span></td>
                <td style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{formatDateTime(iss.issuedAt)}</td>
                {isAdmin && (
                  <td>
                    {iss.status !== "Returned" && (
                      <Link href="/returns" className="btn btn-ghost" style={{ padding: "5px 10px", fontSize: "0.72rem" }}>
                        Record Return <ChevronRight size={11} />
                      </Link>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {issues.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
            <ArrowUpFromLine size={36} style={{ opacity: 0.3, margin: "0 auto 10px" }} />
            <p>No issue records found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
