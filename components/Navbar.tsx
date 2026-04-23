"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t("about"), href: "#about" },
    { label: t("projects"), href: "#projects" },
    { label: t("process"), href: "#process" },
    { label: t("contact"), href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 24px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,15,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,255,136,0.1)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <a href="#" style={{ textDecoration: "none" }}>
        <span style={{ fontWeight: 700, fontSize: 18, color: "#e2e8f0" }}>
          {"<"}<span className="neon-text">dev</span>{" />"}
        </span>
      </a>

      {/* Desktop links */}
      <div
        className="hidden-mobile"
        style={{ display: "flex", gap: 28, alignItems: "center" }}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{
              color: "#64748b",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00ff88")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
          >
            {l.label}
          </a>
        ))}
        <LanguageSwitcher />
        <a href="#contact" className="btn-primary" style={{ padding: "8px 18px", fontSize: 13 }}>
          {t("cta")}
        </a>
      </div>

      {/* Mobile burger */}
      <div className="show-mobile" style={{ display: "none", alignItems: "center", gap: 12 }}>
        <LanguageSwitcher />
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#00ff88",
            fontSize: 22,
            padding: 4,
          }}
          aria-label="menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "absolute",
              top: 64,
              left: 0,
              right: 0,
              background: "rgba(10,10,15,0.98)",
              borderBottom: "1px solid rgba(0,255,136,0.15)",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ color: "#e2e8f0", textDecoration: "none", fontSize: 15 }}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
