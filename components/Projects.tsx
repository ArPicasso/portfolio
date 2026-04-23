"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

type Category = "site" | "script" | "fullstack";

type ProjectDef = {
  id: number;
  key: string;
  category: Category;
  tags: string[];
  emoji: string;
  color: string;
};

const PROJECT_DEFS: ProjectDef[] = [
  { id: 1, key: "p1", category: "fullstack", tags: ["Next.js", "PostgreSQL", "Stripe", "Docker"], emoji: "🛒", color: "#00ff88" },
  { id: 2, key: "p2", category: "script",   tags: ["Python", "aiogram", "PostgreSQL", "FastAPI"], emoji: "🤖", color: "#00d4ff" },
  { id: 3, key: "p3", category: "fullstack", tags: ["React", "FastAPI", "Redis", "WebSocket"], emoji: "📊", color: "#a855f7" },
  { id: 4, key: "p4", category: "script",   tags: ["Python", "Selenium", "FastAPI", "SQLite"], emoji: "🕷️", color: "#00ff88" },
  { id: 5, key: "p5", category: "site",     tags: ["Next.js", "Framer Motion", "Tailwind", "Vercel"], emoji: "🏢", color: "#00d4ff" },
  { id: 6, key: "p6", category: "script",   tags: ["Python", "FastAPI", "Docker", "Web3"], emoji: "📈", color: "#a855f7" },
];

type FilterKey = "all" | Category;

function Modal({
  def,
  onClose,
  t,
}: {
  def: ProjectDef;
  onClose: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backdropFilter: "blur(6px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#111118",
          border: `1px solid ${def.color}33`,
          borderRadius: 16,
          padding: 32,
          maxWidth: 600,
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: `0 0 40px ${def.color}15`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{def.emoji}</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#e2e8f0" }}>{t(`${def.key}_title`)}</h3>
            <div style={{ marginTop: 8 }}>
              <span
                className="badge"
                style={{ background: `${def.color}15`, color: def.color, borderColor: `${def.color}33` }}
              >
                {t(`${def.key}_metrics`)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#64748b", fontSize: 22, cursor: "pointer", padding: 4 }}
          >
            ✕
          </button>
        </div>

        {(["problem", "solution", "result"] as const).map((section, si) => (
          <div key={section} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: def.color, marginBottom: 8 }}>
              {t(`modal_${section}`)}
            </div>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>
              {t(`${def.key}_${section}`)}
            </p>
          </div>
        ))}

        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10 }}>{t("modal_stack")}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {def.tags.map((tag) => (
              <span key={tag} className="badge">{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selected, setSelected] = useState<ProjectDef | null>(null);

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all",      label: t("filter_all") },
    { key: "site",     label: t("filter_site") },
    { key: "script",   label: t("filter_script") },
    { key: "fullstack",label: t("filter_fullstack") },
  ];

  const visible = filter === "all" ? PROJECT_DEFS : PROJECT_DEFS.filter((p) => p.category === filter);

  return (
    <section id="projects" style={{ maxWidth: 1200, margin: "0 auto", padding: "90px 24px" }}>
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

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: "8px 18px",
              borderRadius: 6,
              border: "1px solid",
              borderColor: filter === f.key ? "#00ff88" : "#1e1e2e",
              background: filter === f.key ? "rgba(0,255,136,0.1)" : "transparent",
              color: filter === f.key ? "#00ff88" : "#64748b",
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "inherit",
              fontWeight: 500,
              transition: "all 0.2s",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 20,
        }}
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="card"
              style={{ padding: 24, cursor: "pointer" }}
              onClick={() => setSelected(p)}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: `${p.color}15`,
                  border: `1px solid ${p.color}33`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 16,
                }}
              >
                {p.emoji}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>
                {t(`${p.key}_title`)}
              </h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 16 }}>
                {t(`${p.key}_desc`)}
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: `${p.color}10`,
                  border: `1px solid ${p.color}30`,
                  borderRadius: 4,
                  padding: "3px 10px",
                  fontSize: 11,
                  color: p.color,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                📊 {t(`${p.key}_metrics`)}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {p.tags.map((tag) => (
                  <span key={tag} className="badge" style={{ fontSize: 10 }}>{tag}</span>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 12, color: p.color }}>{t("more_link")}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && <Modal def={selected} onClose={() => setSelected(null)} t={t} />}
      </AnimatePresence>
    </section>
  );
}
