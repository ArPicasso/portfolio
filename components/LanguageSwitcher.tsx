"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const LANGS = [
  { code: "en", flag: "🇬🇧", label: "English",  short: "EN" },
  { code: "de", flag: "🇩🇪", label: "Deutsch",  short: "DE" },
  { code: "ka", flag: "🇬🇪", label: "ქართული", short: "KA" },
] as const;

export default function LanguageSwitcher() {
  const locale  = useLocale();
  const router  = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGS.find((l) => l.code === locale) ?? LANGS[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = (code: string) => {
    setOpen(false);
    const segs = pathname.split("/");
    segs[1] = code;
    router.push(segs.join("/") || `/${code}`);
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          background: open ? "rgba(0,255,136,0.1)" : "var(--bg-card)",
          border: `1px solid ${open ? "rgba(0,255,136,0.35)" : "var(--border)"}`,
          borderRadius: 8,
          padding: "6px 12px",
          cursor: "pointer",
          color: "var(--text-1)",
          fontSize: 13,
          fontFamily: "inherit",
          fontWeight: 600,
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          if (!open) {
            e.currentTarget.style.borderColor = "rgba(0,255,136,0.3)";
            e.currentTarget.style.background = "rgba(0,255,136,0.07)";
          }
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "var(--bg-card)";
          }
        }}
        aria-label="Switch language"
        aria-expanded={open}
      >
        <span style={{ fontSize: 15, lineHeight: 1 }}>{current.flag}</span>
        <span style={{ color: "var(--green)", letterSpacing: "0.5px" }}>{current.short}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: 9, color: "var(--text-3)", display: "inline-block", marginLeft: 1 }}
        >
          ▾
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              overflow: "hidden",
              zIndex: 300,
              minWidth: 155,
              boxShadow: "0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            {LANGS.map((lang, i) => {
              const isActive = lang.code === locale;
              return (
                <motion.button
                  key={lang.code}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => switchLocale(lang.code)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    padding: "10px 14px",
                    background: isActive ? "rgba(0,255,136,0.08)" : "transparent",
                    border: "none",
                    borderBottom: i < LANGS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    cursor: "pointer",
                    color: isActive ? "var(--green)" : "var(--text-2)",
                    fontSize: 13,
                    fontFamily: "inherit",
                    fontWeight: isActive ? 600 : 400,
                    textAlign: "left",
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.color = "var(--text-1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text-2)";
                    }
                  }}
                >
                  <span style={{ fontSize: 17 }}>{lang.flag}</span>
                  <span style={{ flex: 1 }}>{lang.label}</span>
                  {isActive && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--green)",
                        boxShadow: "0 0 6px var(--green)",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
