"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

function TypingText({ roles }: { roles: string[] }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx, roles]);

  return (
    <span style={{ color: "#00d4ff", fontWeight: 600 }}>
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: 2,
          height: "1em",
          background: "#00ff88",
          marginLeft: 2,
          verticalAlign: "middle",
          animation: "blink 1s infinite",
        }}
      />
    </span>
  );
}

export default function Hero() {
  const t = useTranslations("hero");

  const ROLES = [
    "Fullstack Developer",
    "Python Automation",
    "Next.js Developer",
    "Scripts & Bots",
  ];

  const terminalLines = [
    { delay: 0,   text: t("terminal_line1"), color: "#00ff88" },
    { delay: 0.4, text: t("terminal_line2"), color: "#e2e8f0" },
    { delay: 0.8, text: t("terminal_line3"), color: "#00ff88" },
    { delay: 1.2, text: t("terminal_line4"), color: "#00d4ff" },
    { delay: 1.6, text: t("terminal_line5"), color: "#00ff88" },
    { delay: 2.0, text: t("terminal_line6"), color: "#a855f7" },
    { delay: 2.4, text: t("terminal_line7"), color: "#00ff88" },
    { delay: 2.8, text: t("terminal_line8"), color: "#00ff88" },
  ];

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px 24px 40px",
        maxWidth: 1200,
        margin: "0 auto",
        gap: 60,
      }}
    >
      {/* Left */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0,255,136,0.08)",
              border: "1px solid rgba(0,255,136,0.2)",
              borderRadius: 20,
              padding: "4px 14px",
              marginBottom: 24,
              fontSize: 12,
              color: "#00ff88",
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#00ff88",
                boxShadow: "0 0 6px #00ff88",
                animation: "blink 2s infinite",
                display: "inline-block",
              }}
            />
            {t("badge")}
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4.5vw, 54px)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 16,
              color: "#e2e8f0",
            }}
          >
            {t("headline").split("save you time and money").length > 1 ? (
              <>
                {t("headline").split("save you time and money")[0]}
                <span className="neon-text">save you time and money</span>
              </>
            ) : (
              <span>{t("headline")}</span>
            )}
          </h1>

          <p style={{ fontSize: 18, color: "#64748b", marginBottom: 8, fontWeight: 400 }}>
            <TypingText roles={ROLES} />
          </p>

          <p
            style={{
              fontSize: 15,
              color: "#64748b",
              lineHeight: 1.7,
              maxWidth: 500,
              marginBottom: 36,
              marginTop: 16,
            }}
          >
            {t("subheadline")}
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#projects" className="btn-primary">{t("cta_primary")}</a>
            <a href="#contact" className="btn-outline">{t("cta_secondary")}</a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            style={{ display: "flex", gap: 40, marginTop: 48, flexWrap: "wrap" }}
          >
            {[
              { num: t("stats_projects_num"), label: t("stats_projects_label") },
              { num: t("stats_years_num"), label: t("stats_years_label") },
              { num: t("stats_clients_num"), label: t("stats_clients_label") },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#00ff88",
                    textShadow: "0 0 10px rgba(0,255,136,0.4)",
                  }}
                >
                  {s.num}
                </div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Right — Terminal */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ flex: "0 0 420px", maxWidth: "100%" }}
        className="hide-on-mobile"
      >
        <div
          style={{
            background: "#0d0d14",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 0 40px rgba(0,255,136,0.08), 0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              background: "#111118",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: "1px solid #1e1e2e",
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <span style={{ fontSize: 12, color: "#64748b", marginLeft: 8 }}>terminal — bash</span>
          </div>

          <div style={{ padding: "20px 20px 24px", fontFamily: "JetBrains Mono, monospace" }}>
            {terminalLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: line.delay + 0.5, duration: 0.3 }}
                style={{ fontSize: 13, color: line.color, marginBottom: 6, lineHeight: 1.6 }}
              >
                {line.text}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
              style={{ fontSize: 13, color: "#00ff88", marginTop: 4 }}
            >
              $ <span className="cursor-blink" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) { .hide-on-mobile { display: none !important; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </section>
  );
}
