"use client";

import {
  Package, ClipboardList, ArrowUpFromLine, AlertTriangle,
  Users, TrendingUp, Activity, Clock, CheckCircle2,
  XCircle, RefreshCw, Layers, BarChart3,
} from "lucide-react";
import Link from "next/link";
import {
  ITEMS, REQUESTS, ISSUES, LIABILITIES, USERS,
  AUDIT_LOGS, formatDateTime, CURRENT_USER,
} from "@/lib/data";

function StatCard({
  label, value, sub, icon: Icon, color, href, glowClass,
}: {
  label: string; value: number | string; sub?: string;
  icon: React.ElementType; color: string; href: string; glowClass?: string;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div className={`glass-card ${glowClass ?? ""}`} style={{ padding: "20px", cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {label}
            </p>
            <p className="stat-number" style={{ marginTop: 6, color }}>{value}</p>
            {sub && <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>{sub}</p>}
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: `${color}20`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={18} color={color} />
          </div>
        </div>
      </div>
    </Link>
  );
}

const ACTION_ICONS: Record<string, React.ElementType> = {
  REQUEST_CREATED: ClipboardList,
  REQUEST_APPROVED: CheckCircle2,
  REQUEST_REJECTED: XCircle,
  REQUEST_CANCELLED: XCircle,
  EQUIPMENT_ISSUED: ArrowUpFromLine,
  EQUIPMENT_RETURNED: RefreshCw,
  USER_APPROVED: Users,
  LIABILITY_RESOLVED: CheckCircle2,
  ITEM_ADDED: Package,
  default: Activity,
};

export default function DashboardPage() {
  const totalItems = ITEMS.reduce((s, i) => s + i.totalQuantity, 0);
  const totalAvailable = ITEMS.reduce((s, i) => s + i.availableQuantity, 0);
  const totalIssued = ITEMS.reduce((s, i) => s + i.issuedQuantity, 0);
  const pendingRequests = REQUESTS.filter(r => r.status === "Pending").length;
  const activeIssues = ISSUES.filter(i => i.status === "Active" || i.status === "PartiallyReturned").length;
  const pendingLiabilities = LIABILITIES.filter(l => l.status === "Pending").length;
  const pendingUsers = USERS.filter(u => u.status === "Pending").length;
  const recentLogs = AUDIT_LOGS.slice().reverse().slice(0, 8);

  const isOC = CURRENT_USER.role === "OC" || CURRENT_USER.role === "Faculty";

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1200 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }} className="animate-in">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <BarChart3 size={22} color="#60a5fa" />
          <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text-primary)" }}>Dashboard</h1>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          Welcome back, <strong style={{ color: "var(--text-primary)" }}>{CURRENT_USER.name}</strong> — here's the current inventory overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }} className="animate-in">
        <StatCard label="Total Equipment" value={ITEMS.length} sub={`${totalItems} units total`} icon={Package} color="#60a5fa" href="/inventory" glowClass="glow-blue" />
        <StatCard label="Available Units" value={totalAvailable} sub={`${totalIssued} currently issued`} icon={Layers} color="#10b981" href="/inventory" glowClass="glow-green" />
        <StatCard label="Pending Requests" value={pendingRequests} sub="Awaiting approval" icon={ClipboardList} color="#f59e0b" href="/requests" glowClass="glow-amber" />
        <StatCard label="Active Issues" value={activeIssues} sub="Equipment out" icon={ArrowUpFromLine} color="#a78bfa" href="/issues" />
      </div>

      {isOC && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }} className="animate-in">
          <StatCard label="Pending Liabilities" value={pendingLiabilities} sub="Damage/Loss records" icon={AlertTriangle} color="#ef4444" href="/liabilities" glowClass="glow-red" />
          <StatCard label="Pending Registrations" value={pendingUsers} sub="Awaiting approval" icon={Users} color="#06b6d4" href="/users" />
          <StatCard label="Equipment Types" value={ITEMS.length} sub="Active items" icon={TrendingUp} color="#f472b6" href="/inventory" />
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Inventory Overview */}
        <div className="glass-card animate-in" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: "0.9rem", fontWeight: 600 }}>Inventory Overview</h2>
            <Link href="/inventory" style={{ fontSize: "0.75rem", color: "#60a5fa", textDecoration: "none" }}>View all →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ITEMS.slice(0, 6).map(item => {
              const pct = item.totalQuantity > 0 ? (item.availableQuantity / item.totalQuantity) * 100 : 0;
              const barColor = pct > 50 ? "#10b981" : pct > 20 ? "#f59e0b" : "#ef4444";
              return (
                <Link key={item.id} href={`/inventory/${item.id}`} style={{ textDecoration: "none" }}>
                  <div style={{ padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-primary)" }}>{item.name}</span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        <strong style={{ color: barColor }}>{item.availableQuantity}</strong>/{item.totalQuantity}
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card animate-in" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: "0.9rem", fontWeight: 600 }}>Recent Activity</h2>
            {isOC && <Link href="/audit-logs" style={{ fontSize: "0.75rem", color: "#60a5fa", textDecoration: "none" }}>Full log →</Link>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {recentLogs.map(log => {
              const Icon = ACTION_ICONS[log.action] ?? ACTION_ICONS.default;
              return (
                <div key={log.id} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6, background: "rgba(99,179,237,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
                  }}>
                    <Icon size={13} color="#60a5fa" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-primary)", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {log.detail}
                    </p>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 2 }}>
                      <Clock size={10} color="var(--text-muted)" />
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{formatDateTime(log.timestamp)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      {pendingRequests > 0 && isOC && (
        <div className="glass-card animate-in" style={{ marginTop: 20, padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: "0.9rem", fontWeight: 600 }}>
              <span style={{ color: "#f59e0b" }}>{pendingRequests}</span> Pending Request{pendingRequests > 1 ? "s" : ""} Awaiting Approval
            </h2>
            <Link href="/requests" style={{ fontSize: "0.75rem", color: "#60a5fa", textDecoration: "none" }}>View all →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {REQUESTS.filter(r => r.status === "Pending").map(req => (
              <Link key={req.id} href={`/requests/${req.id}`} style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)", cursor: "pointer" }}>
                  <div>
                    <p style={{ fontSize: "0.83rem", fontWeight: 500 }}>{req.requesterName}</p>
                    <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{req.purpose}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="badge" style={{ background: "rgba(245,158,11,0.2)", color: "#fbbf24", borderColor: "rgba(245,158,11,0.3)" }}>
                      {req.items.length} item{req.items.length > 1 ? "s" : ""}
                    </span>
                    <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 3 }}>
                      {formatDateTime(req.createdAt)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
