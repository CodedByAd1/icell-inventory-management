"use client";

import { use, Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle2, XCircle, Ban, Clock,
  User, ClipboardList, Package
} from "lucide-react";
import { REQUESTS, CURRENT_USER, STATUS_COLORS, canManage, formatDateTime } from "@/lib/data";

function RequestDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const req = REQUESTS.find(r => r.id === id);
  const isAdmin = canManage(CURRENT_USER.role);

  if (!req) {
    return (
      <div style={{ padding: "60px 32px", textAlign: "center", color: "var(--text-muted)" }}>
        <ClipboardList size={48} style={{ opacity: 0.3, margin: "0 auto 12px" }} />
        <p>Request not found.</p>
        <Link href="/requests" className="btn btn-ghost" style={{ marginTop: 16, display: "inline-flex" }}>
          <ArrowLeft size={14} /> Back
        </Link>
      </div>
    );
  }

  const canApprove = isAdmin && req.status === "Pending";
  const canCancel = req.requesterId === CURRENT_USER.id && req.status === "Pending";

  return (
    <div style={{ padding: "28px 32px", maxWidth: 800 }}>
      <Link href="/requests" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--text-muted)", textDecoration: "none", marginBottom: 20 }}>
        <ArrowLeft size={14} /> Back to Requests
      </Link>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span className={`badge ${STATUS_COLORS[req.status]}`} style={{ fontSize: "0.75rem" }}>{req.status}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>#{req.id}</span>
          </div>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 700 }}>{req.purpose}</h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {canCancel && (
            <button className="btn btn-danger">
              <Ban size={14} /> Cancel Request
            </button>
          )}
          {canApprove && (
            <>
              <button className="btn btn-danger">
                <XCircle size={14} /> Reject
              </button>
              <button className="btn btn-success">
                <CheckCircle2 size={14} /> Approve
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>
        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="glass-card" style={{ padding: "18px" }}>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>
              <Package size={12} style={{ display: "inline", marginRight: 6 }} />Requested Items
            </h3>
            {req.items.map((it, i) => (
              <div key={i} style={{ padding: "14px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--border)", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <Link href={`/inventory/${it.itemId}`} style={{ fontSize: "0.875rem", fontWeight: 600, color: "#60a5fa", textDecoration: "none" }}>
                      {it.itemName}
                    </Link>
                    <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                      <div style={{ textAlign: "center", padding: "6px", background: "rgba(255,255,255,0.03)", borderRadius: 6 }}>
                        <div style={{ fontSize: "1rem", fontWeight: 700 }}>{it.requestedQty}</div>
                        <div style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>Requested</div>
                      </div>
                      <div style={{ textAlign: "center", padding: "6px", background: "rgba(255,255,255,0.03)", borderRadius: 6 }}>
                        <div style={{ fontSize: "1rem", fontWeight: 700, color: it.approvedQty !== null ? (it.approvedQty > 0 ? "#10b981" : "#ef4444") : "var(--text-muted)" }}>
                          {it.approvedQty !== null ? it.approvedQty : "—"}
                        </div>
                        <div style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>Approved</div>
                      </div>
                      <div style={{ textAlign: "center", padding: "6px", background: "rgba(255,255,255,0.03)", borderRadius: 6 }}>
                        <span className={`badge ${STATUS_COLORS[it.status]}`}>{it.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {it.rejectionReason && (
                  <div style={{ marginTop: 10, padding: "8px 10px", background: "rgba(239,68,68,0.06)", borderRadius: 6, border: "1px solid rgba(239,68,68,0.15)" }}>
                    <p style={{ fontSize: "0.75rem", color: "#fca5a5" }}>
                      <strong>Rejection reason:</strong> {it.rejectionReason}
                    </p>
                  </div>
                )}

                {/* Admin approval UI (mocked) */}
                {canApprove && (
                  <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Approve Qty:</label>
                    <input className="form-input" type="number" defaultValue={it.requestedQty} min={0} max={it.requestedQty} style={{ width: 70 }} />
                    <select className="form-input" style={{ width: "auto" }}>
                      <option value="Approved">Approve</option>
                      <option value="Rejected">Reject</option>
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Requester */}
          <div className="glass-card" style={{ padding: "18px" }}>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
              <User size={12} style={{ display: "inline", marginRight: 6 }} />Requester
            </h3>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#60a5fa,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, color: "white" }}>
                {req.requesterName.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{req.requesterName}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{req.requesterId}</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-card" style={{ padding: "18px" }}>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>
              <Clock size={12} style={{ display: "inline", marginRight: 6 }} />Timeline
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", marginTop: 5, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 500 }}>Request Created</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{formatDateTime(req.createdAt)}</div>
                </div>
              </div>
              {req.approvedAt && (
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6", marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 500 }}>
                      {req.status === "Rejected" ? "Rejected" : "Approved"} by {req.approvedByName}
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{formatDateTime(req.approvedAt)}</div>
                  </div>
                </div>
              )}
              {(req.status === "Issued" || req.status === "Returned") && (
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#8b5cf6", marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 500 }}>Equipment Issued</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{formatDateTime(req.updatedAt)}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Admin actions */}
          {isAdmin && req.status === "Approved" && (
            <div className="glass-card" style={{ padding: "18px" }}>
              <h3 style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Actions</h3>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Record Equipment Issue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RequestDetailPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div style={{ padding: "32px", color: "var(--text-muted)" }}>Loading request details...</div>}>
      <RequestDetailContent {...props} />
    </Suspense>
  );
}
