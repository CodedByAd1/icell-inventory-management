import { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "I Cell Inventory Management System",
  description: "Inventory management system for Innovation Cell, NIT Raipur",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Suspense fallback={<div style={{ width: 240, minHeight: "100vh", background: "var(--bg-sidebar)", flexShrink: 0 }} />}>
          <Sidebar />
        </Suspense>
        <main style={{
          flex: 1,
          overflowY: "auto",
          background: "var(--bg-primary)",
          position: "relative",
        }}>
          <div className="bg-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
