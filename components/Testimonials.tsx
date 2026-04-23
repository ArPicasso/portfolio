"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const META = [
  { color: "var(--green)", avatar: "АМ" },
  { color: "var(--blue)",  avatar: "МС" },
  { color: "var(--purple)", avatar: "ДК" },
];

export default function Testimonials() {
  const t = useTranslations("testimonials");

  const items = [1, 2, 3].map((n, i) => ({
    name:   t(`t${n}_name`),
    role:   t(`t${n}_role`),
    text:   t(`t${n}_text`),
    color:  META[i].color,
    avatar: META[i].avatar,
  }));

  const rawToHex = (v: string) => {
    const m: Record<string, string> = { "var(--green)": "#00ff88", "var(--blue)": "#00d4ff", "var(--purple)": "#a78bfa" };
    return m[v] ?? "#00ff88";
  };

  return (
    <section id="testimonials" className="section-wrap">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <div className="section-label">{t("section_num")} testimonials</div>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.5px" }}>
            {t("title")}
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
          {items.map((item, i) => {
            const hex = rawToHex(item.color);
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="card"
                style={{ padding: 28, position: "relative", overflow: "hidden" }}
              >
                {/* Decorative large quote mark */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute", top: 12, right: 20,
                    fontSize: 80, fontWeight: 900,
                    color: `${hex}08`,
                    lineHeight: 1, userSelect: "none",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  "
                </div>

                {/* Stars */}
                <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                  {Array(5).fill(0).map((_, j) => (
                    <span key={j} style={{ color: "#fbbf24", fontSize: 13 }}>★</span>
                  ))}
                </div>

                <p style={{
                  fontSize: 14, color: "var(--text-2)", lineHeight: 1.78,
                  marginBottom: 24, position: "relative", zIndex: 1,
                }}>
                  &ldquo;{item.text}&rdquo;
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: `${hex}15`, border: `1px solid ${hex}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, color: hex, flexShrink: 0,
                  }}>
                    {item.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.1px" }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{item.role}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
