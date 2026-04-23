"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const META = [
  { icon: "📋", color: "var(--green)" },
  { icon: "✏️", color: "var(--blue)" },
  { icon: "⚙️", color: "var(--purple)" },
  { icon: "🔍", color: "var(--green)" },
  { icon: "🚀", color: "var(--blue)" },
];

export default function Process() {
  const t = useTranslations("process");

  const steps = META.map((m, i) => ({
    ...m,
    num: String(i + 1).padStart(2, "0"),
    title: t(`s${i + 1}_title`),
    desc:  t(`s${i + 1}_desc`),
    next: i < META.length - 1 ? META[i + 1].color : null,
  }));

  return (
    <section id="process" className="section-wrap">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <div className="section-label">{t("section_num")} process</div>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.5px", marginBottom: 12 }}>
            {t("title")}
          </h2>
          <p style={{ color: "var(--text-2)", fontSize: 15, maxWidth: 480 }}>{t("subtitle")}</p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          {steps.map((step, i) => {
            const rawColor = step.color.replace("var(", "").replace(")", "");
            const hexMap: Record<string, string> = { "--green": "#00ff88", "--blue": "#00d4ff", "--purple": "#a78bfa" };
            const hex = hexMap[rawColor] ?? "#00ff88";
            const nextHex = step.next ? hexMap[step.next.replace("var(", "").replace(")", "")] ?? "#00ff88" : null;

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", gap: 0 }}
              >
                {/* Timeline */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 64, flexShrink: 0 }}>
                  <div
                    style={{
                      width: 48, height: 48,
                      borderRadius: "50%",
                      background: `${hex}12`,
                      border: `1.5px solid ${hex}`,
                      boxShadow: `0 0 16px ${hex}25`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, flexShrink: 0, zIndex: 1,
                    }}
                  >
                    {step.icon}
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{
                      width: 1, flex: 1, minHeight: 36,
                      background: `linear-gradient(180deg, ${hex}50, ${nextHex ?? hex}50)`,
                      margin: "5px 0",
                    }} />
                  )}
                </div>

                {/* Content */}
                <div style={{
                  flex: 1, paddingLeft: 24,
                  paddingBottom: i < steps.length - 1 ? 40 : 0,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 800, color: hex,
                      letterSpacing: "2px", textTransform: "uppercase",
                    }}>
                      {step.num}
                    </span>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.2px" }}>
                      {step.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75, maxWidth: 580 }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
