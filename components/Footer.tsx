"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t    = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "40px 28px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "60%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.15), transparent)",
        pointerEvents: "none",
      }} />

      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 2 }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text-1)" }}>{"<"}</span>
            <span style={{
              fontWeight: 800, fontSize: 16,
              background: "linear-gradient(135deg, var(--green), var(--blue))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>dev</span>
            <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text-1)" }}>{" />"}</span>
          </a>

          {/* Status */}
          <p style={{ color: "var(--text-3)", fontSize: 13 }}>
            {t("status").replace("{year}", String(year))}
          </p>

          {/* Built with */}
          <p style={{ color: "var(--text-3)", fontSize: 11 }}>
            {t("built")}
          </p>
        </div>
      </div>
    </footer>
  );
}
