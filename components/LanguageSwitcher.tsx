"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const LANGS = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "ka", flag: "🇬🇪", label: "ქართული" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGS.find((l) => l.code === locale) ?? LANGS[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = (code: string) => {
    setOpen(false);
    const segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/") || `/${code}`);
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(0,255,136,0.06)",
          border: "1px solid rgba(0,255,136,0.2)",
          borderRadius: 6,
          padding: "6px 12px",
          cursor: "pointer",
          color: "#e2e8f0",
          fontSize: 13,
          fontFamily: "inherit",
          fontWeight: 500,
          transition: "all 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(0,255,136,0.5)";
          e.currentTarget.style.background = "rgba(0,255,136,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(0,255,136,0.2)";
          e.currentTarget.style.background = "rgba(0,255,136,0.06)";
        }}
        aria-label="Switch language"
      >
        <span style={{ fontSize: 16 }}>{current.flag}</span>
        <span style={{ color: "#00ff88" }}>{current.code.toUpperCase()}</span>
        <span
          style={{
            fontSize: 10,
            color: "#64748b",
            marginLeft: 2,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            display: "inline-block",
          }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "#111118",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: 8,
            overflow: "hidden",
            zIndex: 200,
            minWidth: 150,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(0,255,136,0.05)",
          }}
        >
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "10px 16px",
                background: lang.code === locale ? "rgba(0,255,136,0.08)" : "transparent",
                border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                cursor: "pointer",
                color: lang.code === locale ? "#00ff88" : "#94a3b8",
                fontSize: 13,
                fontFamily: "inherit",
                fontWeight: lang.code === locale ? 600 : 400,
                textAlign: "left",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (lang.code !== locale) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "#e2e8f0";
                }
              }}
              onMouseLeave={(e) => {
                if (lang.code !== locale) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#94a3b8";
                }
              }}
            >
              <span style={{ fontSize: 18 }}>{lang.flag}</span>
              <span>{lang.label}</span>
              {lang.code === locale && (
                <span style={{ marginLeft: "auto", color: "#00ff88", fontSize: 11 }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
