"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

function TypingText({ roles }: { roles: string[] }) {
  const [idx, setIdx]           = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const role = roles[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < role.length)
      t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 75);
    else if (!deleting && displayed.length === role.length)
      t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    else { setDeleting(false); setIdx((i) => (i + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, idx, roles]);

  return (
    <span style={{ color: "var(--blue)", fontWeight: 600 }}>
      {displayed}
      <span style={{
        display: "inline-block", width: 2, height: "1em",
        background: "var(--green)", marginLeft: 3, verticalAlign: "middle",
        animation: "blink 1s infinite",
      }} />
    </span>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  const t = useTranslations("hero");

  const ROLES = ["Fullstack Developer", "Python Automation", "Next.js Developer", "Scripts & Bots"];

  const termLines = [
    { delay: 0.5, text: t("terminal_line1"), color: "var(--green)" },
    { delay: 0.9, text: t("terminal_line2"), color: "var(--text-1)" },
    { delay: 1.3, text: t("terminal_line3"), color: "var(--green)" },
    { delay: 1.7, text: t("terminal_line4"), color: "var(--blue)" },
    { delay: 2.1, text: t("terminal_line5"), color: "var(--green)" },
    { delay: 2.5, text: t("terminal_line6"), color: "var(--purple)" },
    { delay: 2.9, text: t("terminal_line7"), color: "var(--green)" },
    { delay: 3.3, text: t("terminal_line8"), color: "var(--green)" },
  ];

  const stats = [
    { num: t("stats_projects_num"), label: t("stats_projects_label") },
    { num: t("stats_years_num"),    label: t("stats_years_label") },
    { num: t("stats_clients_num"),  label: t("stats_clients_label") },
  ];

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "96px 28px 56px",
        position: "relative",
      }}
    >
      {/* Decorative glow orb */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "15%", left: "50%",
          transform: "translateX(-50%)",
          width: "70vw", height: "60vh",
          background: "radial-gradient(ellipse at center, rgba(0,255,136,0.055) 0%, rgba(0,212,255,0.03) 50%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", alignItems: "center", gap: 64 }}>
        {/* ── Left ──────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ flex: 1, minWidth: 0 }}
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(0,255,136,0.07)",
                border: "1px solid rgba(0,255,136,0.18)",
                borderRadius: 100,
                padding: "5px 14px",
                marginBottom: 28,
                fontSize: 11,
                color: "var(--green)",
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "var(--green)",
                boxShadow: "0 0 8px var(--green)",
                animation: "blink 2s infinite",
                display: "inline-block",
              }} />
              {t("badge")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            style={{
              fontSize: "clamp(30px, 4.8vw, 58px)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 20,
              color: "var(--text-1)",
              letterSpacing: "-0.5px",
            }}
          >
            {t("headline")}
          </motion.h1>

          {/* Typing */}
          <motion.p variants={item} style={{ fontSize: 18, marginBottom: 10, fontWeight: 500, minHeight: 28 }}>
            <TypingText roles={ROLES} />
          </motion.p>

          {/* Subheadline */}
          <motion.p
            variants={item}
            style={{
              fontSize: 15,
              color: "var(--text-2)",
              lineHeight: 1.75,
              maxWidth: 520,
              marginBottom: 40,
              marginTop: 12,
            }}
          >
            {t("subheadline")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#projects" className="btn-primary">{t("cta_primary")}</a>
            <a href="#contact" className="btn-outline">{t("cta_secondary")}</a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            style={{
              display: "flex",
              gap: 0,
              marginTop: 56,
              flexWrap: "wrap",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  paddingRight: 32,
                  paddingLeft: i === 0 ? 0 : 32,
                  borderLeft: i > 0 ? "1px solid var(--border)" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    background: "linear-gradient(135deg, var(--green), var(--blue))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                    marginBottom: 5,
                  }}
                >
                  {s.num}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-3)", letterSpacing: "0.3px" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Terminal ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hero-terminal"
          style={{ flex: "0 0 430px", maxWidth: "100%" }}
        >
          <div
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px rgba(0,255,136,0.05)",
            }}
          >
            {/* Title bar */}
            <div style={{
              background: "rgba(0,0,0,0.3)",
              padding: "11px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: "1px solid var(--border)",
            }}>
              <div style={{ display: "flex", gap: 7 }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.85 }} />
                ))}
              </div>
              <span style={{ fontSize: 12, color: "var(--text-3)", marginLeft: 8, letterSpacing: "0.3px" }}>
                ~/portfolio — zsh
              </span>
              <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                {["var(--green)", "var(--blue)"].map((c, i) => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: c, opacity: 0.5 }} />
                ))}
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "20px 22px 26px" }}>
              {termLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: line.delay, duration: 0.35, ease: "easeOut" }}
                  style={{ fontSize: 13, color: line.color, marginBottom: 7, lineHeight: 1.6 }}
                >
                  {line.text}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.7 }}
                style={{ fontSize: 13, color: "var(--green)", marginTop: 6 }}
              >
                <span style={{ opacity: 0.5 }}>$ </span>
                <span className="cursor-blink" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) { .hero-terminal { display: none !important; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </section>
  );
}
