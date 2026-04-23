"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid #1e1e2e", padding: "32px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#e2e8f0" }}>
            {"<"}<span className="neon-text">dev</span>{" />"}
          </span>
        </div>
        <p style={{ color: "#64748b", fontSize: 13 }}>
          {t("status").replace("{year}", String(year))}
        </p>
        <p style={{ color: "#374151", fontSize: 11, marginTop: 8 }}>{t("built")}</p>
      </div>
    </footer>
  );
}
