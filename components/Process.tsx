"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const STEP_COLORS = ["#00ff88", "#00d4ff", "#a855f7", "#00ff88", "#00d4ff"];
const STEP_ICONS  = ["📋", "✏️", "⚙️", "🔍", "🚀"];
const STEP_NUMS   = ["01", "02", "03", "04", "05"];

export default function Process() {
  const t = useTranslations("process");

  const steps = STEP_NUMS.map((num, i) => ({
    num,
    icon: STEP_ICONS[i],
    color: STEP_COLORS[i],
    title: t(`s${i + 1}_title`),
    desc: t(`s${i + 1}_desc`),
  }));

  return (
    <section id="process" style={{ maxWidth: 1200, margin: "0 auto", padding: "90px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 56 }}
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

      <div style={{ display: "flex", flexDirection: "column" }}>
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{ display: "flex", gap: 0, alignItems: "stretch" }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 60, flexShrink: 0 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: `${step.color}15`,
                  border: `2px solid ${step.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                  zIndex: 1,
                }}
              >
                {step.icon}
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 40,
                    background: `linear-gradient(180deg, ${step.color}40, ${steps[i + 1].color}40)`,
                    marginTop: 4,
                    marginBottom: 4,
                  }}
                />
              )}
            </div>
            <div style={{ flex: 1, paddingLeft: 20, paddingBottom: i < steps.length - 1 ? 32 : 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: step.color, letterSpacing: 1 }}>
                  {step.num}
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0" }}>{step.title}</h3>
              </div>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, maxWidth: 560 }}>
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
