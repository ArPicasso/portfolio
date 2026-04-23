"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

type Category = "site" | "script" | "fullstack";
type FilterKey = "all" | Category;

type ProjectDef = {
  id: number; key: string; category: Category;
  tags: string[]; emoji: string; color: string;
};

const DEFS: ProjectDef[] = [
  { id: 1, key: "p1", category: "fullstack", tags: ["Next.js","PostgreSQL","Stripe","Docker"],         emoji: "🛒", color: "var(--green)" },
  { id: 2, key: "p2", category: "script",    tags: ["Python","aiogram","PostgreSQL","FastAPI"],         emoji: "🤖", color: "var(--blue)" },
  { id: 3, key: "p3", category: "fullstack", tags: ["React","FastAPI","Redis","WebSocket"],             emoji: "📊", color: "var(--purple)" },
  { id: 4, key: "p4", category: "script",    tags: ["Python","Selenium","FastAPI","SQLite"],            emoji: "🕷️", color: "var(--green)" },
  { id: 5, key: "p5", category: "site",      tags: ["Next.js","Framer Motion","Tailwind","Vercel"],     emoji: "🏢", color: "var(--blue)" },
  { id: 6, key: "p6", category: "script",    tags: ["Python","FastAPI","Docker","Web3"],                emoji: "📈", color: "var(--purple)" },
];

function Modal({ def, onClose, t }: { def: ProjectDef; onClose: () => void; t: ReturnType<typeof useTranslations> }) {
  const rawColor = def.color.replace("var(", "").replace(")", "");
  const colorMap: Record<string, string> = { "--green": "#00ff88", "--blue": "#00d4ff", "--purple": "#a78bfa" };
  const hex = colorMap[rawColor] ?? "#00ff88";

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.82)",
        zIndex: 400,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, backdropFilter: "blur(8px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-card)",
          border: `1px solid ${hex}33`,
          borderRadius: 18,
          padding: 36,
          maxWidth: 620, width: "100%",
          maxHeight: "88vh", overflowY: "auto",
          boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 48px ${hex}12`,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 28 }}>
          <div>
            <div style={{
              width: 52, height: 52, borderRadius: 12,
              background: `${hex}15`, border: `1px solid ${hex}33`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, marginBottom: 14,
            }}>
              {def.emoji}
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-1)", marginBottom: 10, letterSpacing: "-0.3px" }}>
              {t(`${def.key}_title`)}
            </h3>
            <span className="badge" style={{ background: `${hex}15`, color: hex, borderColor: `${hex}33` }}>
              {t(`${def.key}_metrics`)}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)",
              borderRadius: 8, color: "var(--text-2)", fontSize: 16,
              cursor: "pointer", padding: "6px 10px", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-1)"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-2)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
          >
            ✕
          </button>
        </div>

        {/* Sections */}
        {(["problem","solution","result"] as const).map((sec, i) => {
          const icons = ["🔴","🟡","🟢"];
          return (
            <div key={sec}
              style={{
                marginBottom: 20, padding: 18,
                background: "rgba(255,255,255,0.025)",
                borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: hex, marginBottom: 8, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                {icons[i]} {t(`modal_${sec}`).replace(/^[🔴🟡🟢]\s*/u, "")}
              </div>
              <p style={{ color: "var(--text-2)", fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                {t(`${def.key}_${sec}`)}
              </p>
            </div>
          );
        })}

        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "1px" }}>
            {t("modal_stack")}
          </div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {def.tags.map((tag) => <span key={tag} className="badge">{tag}</span>)}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const t = useTranslations("projects");
  const [filter, setFilter]   = useState<FilterKey>("all");
  const [selected, setSelected] = useState<ProjectDef | null>(null);

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all",       label: t("filter_all") },
    { key: "site",      label: t("filter_site") },
    { key: "script",    label: t("filter_script") },
    { key: "fullstack", label: t("filter_fullstack") },
  ];

  const visible = filter === "all" ? DEFS : DEFS.filter((p) => p.category === filter);

  const rawToHex = (v: string) => {
    const m: Record<string, string> = { "var(--green)": "#00ff88", "var(--blue)": "#00d4ff", "var(--purple)": "#a78bfa" };
    return m[v] ?? "#00ff88";
  };

  return (
    <section id="projects" className="section-wrap">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <div className="section-label">{t("section_num")} projects</div>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.5px", marginBottom: 12 }}>
            {t("title")}
          </h2>
          <p style={{ color: "var(--text-2)", fontSize: 15, maxWidth: 480 }}>{t("subtitle")}</p>
        </motion.div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 44, flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: "1px solid",
                borderColor: filter === f.key ? "rgba(0,255,136,0.5)" : "var(--border)",
                background: filter === f.key ? "rgba(0,255,136,0.1)" : "transparent",
                color: filter === f.key ? "var(--green)" : "var(--text-2)",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "inherit",
                fontWeight: filter === f.key ? 600 : 400,
                transition: "all 0.2s",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 18 }}>
          <AnimatePresence mode="popLayout">
            {visible.map((p) => {
              const hex = rawToHex(p.color);
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelected(p)}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: 24,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${hex}44`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = `0 12px 36px rgba(0,0,0,0.5), 0 0 28px ${hex}12`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Colored top accent */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, ${hex}, transparent)`,
                    opacity: 0.7,
                  }} />

                  <div style={{
                    width: 46, height: 46, borderRadius: 11,
                    background: `${hex}12`, border: `1px solid ${hex}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, marginBottom: 16,
                  }}>
                    {p.emoji}
                  </div>

                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-1)", marginBottom: 8, letterSpacing: "-0.2px" }}>
                    {t(`${p.key}_title`)}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 16 }}>
                    {t(`${p.key}_desc`)}
                  </p>

                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    background: `${hex}0e`, border: `1px solid ${hex}28`,
                    borderRadius: 5, padding: "4px 10px",
                    fontSize: 11, color: hex, fontWeight: 600, marginBottom: 16,
                  }}>
                    ▲ {t(`${p.key}_metrics`)}
                  </div>

                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    {p.tags.map((tag) => <span key={tag} className="badge" style={{ fontSize: 10 }}>{tag}</span>)}
                  </div>

                  <div style={{ fontSize: 12, color: hex, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                    {t("more_link")}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <Modal def={selected} onClose={() => setSelected(null)} t={t} />}
      </AnimatePresence>
    </section>
  );
}
