"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");
  const [form, setForm]   = useState({ name: "", email: "", message: "" });
  const [sent, setSent]   = useState(false);

  const prices = [
    { icon: "📄", label: t("price1_label"), val: t("price1_val"), color: "var(--green)" },
    { icon: "🛒", label: t("price2_label"), val: t("price2_val"), color: "var(--blue)" },
    { icon: "⚡", label: t("price3_label"), val: t("price3_val"), color: "var(--purple)" },
    { icon: "🤖", label: t("price4_label"), val: t("price4_val"), color: "var(--green)" },
  ];

  const links = [
    { icon: "✈️", label: "Telegram", val: "@yourhandle", href: "https://t.me/yourhandle", color: "var(--blue)" },
    { icon: "📧", label: "Email",    val: "your@email.com", href: "mailto:your@email.com", color: "var(--green)" },
    { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/you", href: "#", color: "var(--purple)" },
  ];

  return (
    <section id="contact" className="section-wrap">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <div className="section-label">{t("section_num")} contact</div>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.5px", marginBottom: 12 }}>
            {t("title")}
          </h2>
          <p style={{ color: "var(--text-2)", fontSize: 15, maxWidth: 480 }}>{t("subtitle")}</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48 }} className="contact-grid">
          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{
                  background: "var(--bg-card)", border: "1px solid rgba(0,255,136,0.25)",
                  borderRadius: 16, padding: 48, textAlign: "center",
                  boxShadow: "0 0 32px rgba(0,255,136,0.08)",
                }}
              >
                <div style={{ fontSize: 52, marginBottom: 18 }}>✅</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--green)", marginBottom: 10 }}>
                  {t("success_title")}
                </h3>
                <p style={{ color: "var(--text-2)", fontSize: 14 }}>{t("success_text")}</p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                style={{
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  borderRadius: 16, padding: 32, boxShadow: "var(--shadow-card)",
                  display: "flex", flexDirection: "column", gap: 18,
                }}
              >
                {[
                  { key: "name",  label: t("field_name"),  ph: t("field_name_placeholder"),  type: "text" },
                  { key: "email", label: t("field_email"), ph: t("field_email_placeholder"), type: "email" },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontSize: 12, color: "var(--text-3)", marginBottom: 7, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type} placeholder={f.ph} required
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="field"
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--text-3)", marginBottom: 7, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {t("field_message")}
                  </label>
                  <textarea
                    placeholder={t("field_message_placeholder")}
                    required rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="field"
                    style={{ resize: "vertical" }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px 28px" }}>
                  {t("submit")}
                </button>
              </form>
            )}
          </motion.div>

          {/* ── Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: 28 }}
          >
            {/* Direct links */}
            <div>
              <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
                {t("direct_label")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "13px 16px",
                      background: "var(--bg-card)", border: "1px solid var(--border)",
                      borderRadius: 10, textDecoration: "none", transition: "all 0.2s", color: "inherit",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,255,136,0.3)";
                      e.currentTarget.style.background = "var(--bg-card-h)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.background = "var(--bg-card)";
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{l.icon}</span>
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 1 }}>{l.label}</div>
                      <div style={{ fontSize: 13, color: l.color, fontWeight: 600 }}>{l.val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div>
              <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
                {t("pricing_label")}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {prices.map((p) => (
                  <div
                    key={p.label}
                    style={{
                      padding: "13px 14px",
                      background: "var(--bg-card)", border: "1px solid var(--border)",
                      borderRadius: 10,
                    }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 5 }}>{p.icon}</div>
                    <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 3 }}>{p.label}</div>
                    <div style={{ fontSize: 13, color: p.color, fontWeight: 700 }}>{p.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </section>
  );
}
