"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const SKILLS = [
  { name: "Next.js / React", level: 95, color: "#00ff88" },
  { name: "TypeScript", level: 88, color: "#00d4ff" },
  { name: "Python / FastAPI", level: 92, color: "#a855f7" },
  { name: "Docker / DevOps", level: 80, color: "#00ff88" },
  { name: "PostgreSQL / Redis", level: 82, color: "#00d4ff" },
  { name: "Node.js / API", level: 85, color: "#a855f7" },
];

function SkillBar({ name, level, color, i }: { name: string; level: number; color: string; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08, duration: 0.5 }}
      style={{ marginBottom: 16 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: 12, color, fontWeight: 600 }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 + 0.3, duration: 0.8, ease: "easeOut" }}
          style={{
            height: "100%",
            borderRadius: 2,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function About() {
  const t = useTranslations("about");

  const facts = [
    { icon: t("fact_location_icon"), label: t("fact_location_label"), val: t("fact_location_val") },
    { icon: t("fact_exp_icon"), label: t("fact_exp_label"), val: t("fact_exp_val") },
    { icon: t("fact_work_icon"), label: t("fact_work_label"), val: t("fact_work_val") },
    { icon: t("fact_lang_icon"), label: t("fact_lang_label"), val: t("fact_lang_val") },
  ];

  const p1 = t("p1");
  const [before, after] = p1.split("<highlight>");
  const [highlighted, rest] = after ? after.split("</highlight>") : ["", ""];

  return (
    <section id="about" style={{ maxWidth: 1200, margin: "0 auto", padding: "90px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <span style={{ color: "#00ff88", fontSize: 14, fontWeight: 600 }}>{"// "}</span>
          <span style={{ color: "#64748b", fontSize: 13 }}>{t("section_num")}</span>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#e2e8f0" }}>
            {t("title")}
          </h2>
        </div>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="about-grid">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              background: "#111118",
              border: "1px solid #1e1e2e",
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                background: "#0d0d14",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                borderBottom: "1px solid #1e1e2e",
              }}
            >
              <span style={{ fontSize: 12, color: "#64748b" }}>{t("file_label")}</span>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 10,
                  background: "rgba(0,255,136,0.1)",
                  color: "#00ff88",
                  padding: "1px 6px",
                  borderRadius: 3,
                  border: "1px solid rgba(0,255,136,0.2)",
                }}
              >
                markdown
              </span>
            </div>
            <div style={{ padding: 24 }}>
              <p style={{ color: "#e2e8f0", lineHeight: 1.8, fontSize: 14, marginBottom: 16 }}>
                {before}
                {highlighted && <span className="neon-text">{highlighted}</span>}
                {rest}
              </p>
              <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: 14, marginBottom: 16 }}>
                {t("p2")}
              </p>
              <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: 14 }}>
                {t("p3")}
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {facts.map((f) => (
              <div key={f.label} className="card" style={{ padding: "14px 16px" }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{f.icon}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>{f.label}</div>
                <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>{f.val}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div style={{ marginBottom: 20, fontSize: 13, color: "#64748b" }}>
            <span className="neon-text">{"// "}</span>{t("skills_label").replace("// ", "")}
          </div>
          {SKILLS.map((s, i) => (
            <SkillBar key={s.name} {...s} i={i} />
          ))}
          <div style={{ marginTop: 32, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["React", "Next.js", "TypeScript", "Python", "FastAPI", "Docker",
              "PostgreSQL", "Redis", "Tailwind", "Framer Motion", "Git", "Linux"].map((tag) => (
              <span key={tag} className="badge">{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
