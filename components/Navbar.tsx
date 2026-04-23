"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const links = [
    { label: t("about"),    href: "#about" },
    { label: t("projects"), href: "#projects" },
    { label: t("process"),  href: "#process" },
    { label: t("contact"),  href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, left: 0,
          height: 2,
          width: progressWidth,
          background: "linear-gradient(90deg, #00ff88, #00d4ff)",
          zIndex: 200,
          boxShadow: "0 0 8px rgba(0,255,136,0.6)",
        }}
      />

      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: 68,
        }}
      >
        {/* Backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: scrolled ? "rgba(6,6,13,0.88)" : "transparent",
            backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
            transition: "all 0.4s ease",
          }}
        />

        {/* Content */}
        <div
          className="container"
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 2 }}>
            <span style={{ fontWeight: 700, fontSize: 17, color: "#eef2f7" }}>
              {"<"}
            </span>
            <span
              style={{
                fontWeight: 800,
                fontSize: 17,
                background: "linear-gradient(135deg, #00ff88, #00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              dev
            </span>
            <span style={{ fontWeight: 700, fontSize: 17, color: "#eef2f7" }}>{" />"}</span>
          </a>

          {/* Desktop nav */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  color: "var(--text-2)",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 500,
                  transition: "color 0.2s",
                  letterSpacing: "0.2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--green)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
              >
                {l.label}
              </a>
            ))}

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <LanguageSwitcher />
              <a href="#contact" className="btn-primary" style={{ padding: "8px 18px", fontSize: 13 }}>
                {t("cta")}
              </a>
            </div>
          </div>

          {/* Mobile right */}
          <div className="nav-mobile" style={{ display: "none", alignItems: "center", gap: 10 }}>
            <LanguageSwitcher />
            <button
              onClick={() => setOpen(!open)}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                cursor: "pointer",
                color: "var(--text-1)",
                fontSize: 18,
                padding: "6px 10px",
                lineHeight: 1,
                transition: "all 0.2s",
              }}
              aria-label="menu"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: 68,
                left: 0, right: 0,
                background: "rgba(6,6,13,0.97)",
                backdropFilter: "blur(24px)",
                borderBottom: "1px solid var(--border)",
                padding: "16px 28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setOpen(false)}
                  style={{
                    color: "var(--text-2)",
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 500,
                    padding: "10px 0",
                    borderBottom: "1px solid var(--border)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--green)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
                >
                  {l.label}
                </motion.a>
              ))}
              <a href="#contact" className="btn-primary" style={{ marginTop: 16, justifyContent: "center" }}>
                {t("cta")}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
