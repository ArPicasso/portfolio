"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const COLORS = ["#00ff88", "#00d4ff", "#a855f7"];
const AVATARS = ["АМ", "МС", "ДК"];

export default function Testimonials() {
  const t = useTranslations("testimonials");

  const testimonials = [1, 2, 3].map((n, i) => ({
    name: t(`t${n}_name`),
    role: t(`t${n}_role`),
    text: t(`t${n}_text`),
    color: COLORS[i],
    avatar: AVATARS[i],
  }));

  return (
    <section id="testimonials" style={{ maxWidth: 1200, margin: "0 auto", padding: "90px 24px" }}>
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
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="card"
            style={{ padding: 24 }}
          >
            <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
              {Array(5).fill(0).map((_, j) => (
                <span key={j} style={{ color: "#fbbf24", fontSize: 14 }}>★</span>
              ))}
            </div>
            <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, marginBottom: 20 }}>
              &ldquo;{testimonial.text}&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: `${testimonial.color}20`,
                  border: `1px solid ${testimonial.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: testimonial.color,
                  flexShrink: 0,
                }}
              >
                {testimonial.avatar}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{testimonial.name}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{testimonial.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
