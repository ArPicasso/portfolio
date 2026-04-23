"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const SKILLS = [
  { name: "Next.js / React", level: 95, color: "var(--green)" },
  { name: "TypeScript",      level: 88, color: "var(--blue)" },
  { name: "Python / FastAPI",level: 92, color: "var(--purple)" },
  { name: "Docker / DevOps", level: 80, color: "var(--green)" },
  { name: "PostgreSQL / Redis", level: 82, color: "var(--blue)" },
  { name: "Node.js / API",   level: 85, color: "var(--purple)" },
];

const TECH = ["React", "Next.js", "TypeScript", "Python", "FastAPI", "Docker",
              "PostgreSQL", "Redis", "Tailwind", "Framer Motion", "Git", "Linux"];

function SkillBar({ name, level, color, i }: { name: string; level: number; color: string; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: 18 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontSize: 13, color: "var(--text-1)", fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: 12, color, fontWeight: 700 }}>{level}%</span>
      </div>
      <div style={{
        height: 5, background: "rgba(255,255,255,0.05)",
        borderRadius: 3, overflow: "hidden",
      }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 + 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "100%", borderRadius: 3,
            background: `linear-gradient(90deg, ${color}, ${color === "var(--green)" ? "var(--blue)" : color === "var(--blue)" ? "var(--purple)" : "var(--green)"})`,
            boxShadow: `0 0 10px ${color}66`,
          }}
        />
      </div>
    </motion.div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function About() {
  const t = useTranslations("about");

  // ✅ Proper next-intl rich text — fixes the FORMATTING_ERROR
  const p1 = t.rich("p1", {
    highlight: (chunks) => (
      <span key="h" className="neon-text">{chunks}</span>
    ),
  });

  const facts = [
    { icon: t("fact_location_icon"), label: t("fact_location_label"), val: t("fact_location_val") },
    { icon: t("fact_exp_icon"),      label: t("fact_exp_label"),      val: t("fact_exp_val") },
    { icon: t("fact_work_icon"),     label: t("fact_work_label"),     val: t("fact_work_val") },
    { icon: t("fact_lang_icon"),     label: t("fact_lang_label"),     val: t("fact_lang_val") },
  ];

  return (
    <section id="about" className="section-wrap">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={sectionVariants}
          style={{ marginBottom: 60 }}
        >
          <div className="section-label">{t("section_num")} about</div>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.5px" }}>
            {t("title")}
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }} className="about-grid">
          {/* ── Left: Story ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Code window */}
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              overflow: "hidden",
              marginBottom: 20,
              boxShadow: "var(--shadow-card)",
            }}>
              {/* Tab bar */}
              <div style={{
                background: "rgba(0,0,0,0.25)",
                padding: "0 16px",
                display: "flex",
                alignItems: "stretch",
                borderBottom: "1px solid var(--border)",
                gap: 0,
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px 10px 0",
                  borderBottom: "2px solid var(--green)",
                  marginBottom: -1,
                }}>
                  <span style={{ fontSize: 11, color: "var(--text-3)" }}>📄</span>
                  <span style={{ fontSize: 12, color: "var(--text-1)", fontWeight: 500 }}>{t("file_label")}</span>
                  <span style={{
                    fontSize: 9, background: "var(--green-dim)", color: "var(--green)",
                    padding: "1px 6px", borderRadius: 3, border: "1px solid rgba(0,255,136,0.2)",
                    fontWeight: 600,
                  }}>
                    md
                  </span>
                </div>
              </div>

              {/* Content with line numbers */}
              <div style={{ padding: "22px 24px", display: "flex", gap: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "calc(1.8em - 1px)", paddingTop: 1 }}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1, userSelect: "none", textAlign: "right", minWidth: 14 }}>
                      {n}
                    </span>
                  ))}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "var(--text-1)", lineHeight: 1.8, fontSize: 14, marginBottom: 14 }}>
                    {p1}
                  </p>
                  <p style={{ color: "var(--text-2)", lineHeight: 1.8, fontSize: 14, marginBottom: 14 }}>
                    {t("p2")}
                  </p>
                  <p style={{ color: "var(--text-2)", lineHeight: 1.8, fontSize: 14 }}>
                    {t("p3")}
                  </p>
                </div>
              </div>
            </div>

            {/* Fact cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {facts.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="card"
                  style={{ padding: "14px 16px" }}
                >
                  <div style={{ fontSize: 17, marginBottom: 5 }}>{f.icon}</div>
                  <div style={{ fontSize: 10, color: "var(--text-3)", marginBottom: 3, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                    {f.label}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-1)", fontWeight: 600 }}>{f.val}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Stack ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "24px 24px 28px",
              boxShadow: "var(--shadow-card)",
            }}>
              <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 24, letterSpacing: "0.5px" }}>
                <span style={{ color: "var(--green)" }}>// </span>
                {t("skills_label").replace("// ", "")}
              </div>
              {SKILLS.map((s, i) => <SkillBar key={s.name} {...s} i={i} />)}
            </div>

            <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TECH.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="badge"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </section>
  );
}
