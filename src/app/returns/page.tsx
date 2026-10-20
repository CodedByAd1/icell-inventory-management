"use client";

import { ArrowDownToLine } from "lucide-react";
import { RETURNS, STATUS_COLORS, formatDateTime } from "@/lib/data";
import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div style={{ padding: "28px 32px", maxWidth: 1000 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <ArrowDownToLine size={22} color="#60a5fa" />
            <h1 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Returns</h1>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Equipment return records</p>
        </div>
        <button className="btn btn-primary" onClick={() => alert("Select an active issue from the Issues page to process a return.")}>
          Process Return
        </button>
      </div>

      <div className="glass-card" style={{ overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Item</th>
              <th>Qty Returned</th>
              <th>Condition</th>
              <th>Processed By</th>
              <th>Returned At</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {RETURNS.map(ret => (
              <tr key={ret.id}>
                <td style={{ fontWeight: 500, fontSize: "0.83rem" }}>{ret.memberName}</td>
                <td>
                  <Link href={`/inventory/${ret.itemId}`} style={{ color: "#60a5fa", textDecoration: "none", fontSize: "0.83rem" }}>
                    {ret.itemName}
                  </Link>
                </td>
                <td style={{ fontWeight: 600 }}>{ret.returnedQty}</td>
                <td><span className={`badge ${STATUS_COLORS[ret.condition]}`}>{ret.condition}</span></td>
                <td style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{ret.processedByName}</td>
                <td style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{formatDateTime(ret.returnedAt)}</td>
                <td style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{ret.remarks || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {RETURNS.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
            <ArrowDownToLine size={36} style={{ opacity: 0.3, margin: "0 auto 10px" }} />
            <p>No return records yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
