"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const prices = [
    { icon: "📄", label: t("price1_label"), val: t("price1_val"), color: "#00ff88" },
    { icon: "🛒", label: t("price2_label"), val: t("price2_val"), color: "#00d4ff" },
    { icon: "⚡", label: t("price3_label"), val: t("price3_val"), color: "#a855f7" },
    { icon: "🤖", label: t("price4_label"), val: t("price4_val"), color: "#00ff88" },
  ];

  return (
    <section id="contact" style={{ maxWidth: 1200, margin: "0 auto", padding: "90px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 48 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span style={{ color: "#00ff88", fontSize: 14, fontWeight: 600 }}>{"// "}</span>
          <span style={{ color: "#64748b", fontSize: 13 }}>{t("section_num")}</span>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#e2e8f0" }}>
            {t("title")}
          </h2>
        </div>
        <p style={{ color: "#64748b", fontSize: 14, maxWidth: 480 }}>{t("subtitle")}</p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="contact-grid">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {sent ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card"
              style={{ padding: 40, textAlign: "center" }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#00ff88", marginBottom: 8 }}>
                {t("success_title")}
              </h3>
              <p style={{ color: "#64748b", fontSize: 14 }}>{t("success_text")}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { key: "name", label: t("field_name"), placeholder: t("field_name_placeholder"), type: "text" },
                { key: "email", label: t("field_email"), placeholder: t("field_email_placeholder"), type: "email" },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: 12, color: "#64748b", marginBottom: 6, fontWeight: 500 }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    required
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#111118",
                      border: "1px solid #1e1e2e",
                      borderRadius: 8,
                      padding: "12px 16px",
                      color: "#e2e8f0",
                      fontSize: 14,
                      fontFamily: "inherit",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#00ff8866")}
                    onBlur={(e) => (e.target.style.borderColor = "#1e1e2e")}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#64748b", marginBottom: 6, fontWeight: 500 }}>
                  {t("field_message")}
                </label>
                <textarea
                  placeholder={t("field_message_placeholder")}
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: "100%",
                    background: "#111118",
                    border: "1px solid #1e1e2e",
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: "#e2e8f0",
                    fontSize: 14,
                    fontFamily: "inherit",
                    outline: "none",
                    resize: "vertical",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#00ff8866")}
                  onBlur={(e) => (e.target.style.borderColor = "#1e1e2e")}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%" }}>
                {t("submit")}
              </button>
            </form>
          )}
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 16, fontWeight: 500 }}>
              {t("direct_label")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "✈️", label: "Telegram", val: "@yourhandle", href: "https://t.me/yourhandle", color: "#00d4ff" },
                { icon: "📧", label: "Email", val: "your@email.com", href: "mailto:your@email.com", color: "#00ff88" },
                { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/you", href: "#", color: "#a855f7" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    background: "#111118",
                    border: "1px solid #1e1e2e",
                    borderRadius: 8,
                    textDecoration: "none",
                    transition: "all 0.2s",
                    color: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = link.color + "44";
                    e.currentTarget.style.background = "#1a1a25";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#1e1e2e";
                    e.currentTarget.style.background = "#111118";
                  }}
                >
                  <span style={{ fontSize: 18 }}>{link.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{link.label}</div>
                    <div style={{ fontSize: 13, color: link.color, fontWeight: 500 }}>{link.val}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 16, fontWeight: 500 }}>
              {t("pricing_label")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {prices.map((p) => (
                <div
                  key={p.label}
                  style={{
                    padding: "12px 14px",
                    background: "#111118",
                    border: "1px solid #1e1e2e",
                    borderRadius: 8,
                  }}
                >
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{p.icon}</div>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>{p.label}</div>
                  <div style={{ fontSize: 13, color: p.color, fontWeight: 600 }}>{p.val}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
