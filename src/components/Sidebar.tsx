"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  ArrowUpFromLine,
  ArrowDownToLine,
  AlertTriangle,
  Users,
  Tag,
  ScrollText,
  LogOut,
  ChevronRight,
  Zap,
} from "lucide-react";
import { CURRENT_USER, ROLE_COLORS, canManage } from "@/lib/data";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/inventory", icon: Package, label: "Inventory" },
  { href: "/requests", icon: ClipboardList, label: "Requests" },
  { href: "/issues", icon: ArrowUpFromLine, label: "Issues" },
  { href: "/returns", icon: ArrowDownToLine, label: "Returns" },
  { href: "/liabilities", icon: AlertTriangle, label: "Liabilities" },
];

const ADMIN_NAV_ITEMS = [
  { href: "/users", icon: Users, label: "User Management" },
  { href: "/categories", icon: Tag, label: "Categories" },
  { href: "/audit-logs", icon: ScrollText, label: "Audit Logs" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isAdmin = canManage(CURRENT_USER.role);

  if (pathname === "/login" || pathname?.startsWith("/login")) {
    return null;
  }

  return (
    <aside
      style={{
        width: 240,
        minHeight: "100vh",
        background: "var(--bg-sidebar)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid var(--border)" }}>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 14px rgba(59,130,246,0.4)",
            }}>
              <Zap size={18} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>I Cell</div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 500 }}>Inventory System</div>
            </div>
          </div>
        </Link>
      </div>

      {/* User chip */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "8px 10px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "linear-gradient(135deg,#60a5fa,#a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.75rem", fontWeight: 700, color: "white", flexShrink: 0,
          }}>
            {CURRENT_USER.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {CURRENT_USER.name}
            </div>
            <span className={`badge ${ROLE_COLORS[CURRENT_USER.role]}`} style={{ fontSize: "0.6rem", marginTop: 2 }}>
              {CURRENT_USER.role === "OC" ? "Overall Coordinator" : CURRENT_USER.role}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        <div style={{ marginBottom: 4 }}>
          <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", padding: "4px 8px 8px" }}>
            Main
          </p>
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className={`nav-item ${pathname.startsWith(href) ? "active" : ""}`}>
              <Icon size={16} />
              <span>{label}</span>
              {pathname.startsWith(href) && <ChevronRight size={12} style={{ marginLeft: "auto", opacity: 0.5 }} />}
            </Link>
          ))}
        </div>

        {isAdmin && (
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", padding: "4px 8px 8px" }}>
              Admin
            </p>
            {ADMIN_NAV_ITEMS.map(({ href, icon: Icon, label }) => (
              <Link key={href} href={href} className={`nav-item ${pathname.startsWith(href) ? "active" : ""}`}>
                <Icon size={16} />
                <span>{label}</span>
                {pathname.startsWith(href) && <ChevronRight size={12} style={{ marginLeft: "auto", opacity: 0.5 }} />}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid var(--border)" }}>
        <Link href="/login" className="nav-item" style={{ color: "var(--text-muted)" }}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </Link>
        <p style={{ fontSize: "0.6rem", color: "var(--text-muted)", textAlign: "center", marginTop: 8 }}>
          IMS v0.1 · NIT Raipur
        </p>
      </div>
    </aside>
  );
}
