"use client";

import { useEffect, useState } from "react";
import { Palette, Check } from "lucide-react";

const themes = [
  {
    name: "Soft Light",
    primary: "oklch(0.77 0.18 70)",
    background: "oklch(0.97 0.015 85)",
    /* Soft Creamy White */
    foreground: "oklch(0.3 0.02 70)",
    /* Softer Gray Text */
    card: "oklch(0.98 0.01 85)",
    color: "#fefaf3",
    isLight: true,
  },

  {
    name: "Night",
    primary: "oklch(0.77 0.18 70)",
    background: "oklch(0.05 0.01 70)",
    foreground: "oklch(0.95 0.01 70)",
    card: "oklch(0.08 0.01 70)",
    color: "#000000",
    isLight: false,
  },
  {
    name: "Green",
    primary: "oklch(0.62 0.18 145)",
    background: "oklch(0.12 0.02 145)",
    foreground: "oklch(0.95 0.01 145)",
    card: "oklch(0.16 0.01 145)",
    color: "#22c55e",
    isLight: false,
  },
];

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState("Soft Light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || "Soft Light";
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeName: string) => {
    const theme = themes.find((t) => t.name === themeName) || themes[0];
    const root = document.documentElement;

    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--foreground", theme.foreground);
    root.style.setProperty("--card", theme.card);

    if (theme.isLight) {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }

    setCurrentTheme(themeName);
    localStorage.setItem("app-theme", themeName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background transition-all hover:bg-secondary hover:border-primary/30 active:scale-95 shadow-sm"
        title="Change Theme"
      >
        <Palette className="h-4 w-4 text-primary" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[60]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-border bg-background p-2 shadow-2xl z-[70] animate-in fade-in zoom-in-95 duration-200">
            <p className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
              Select Aesthetic
            </p>
            <div className="grid gap-1">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => applyTheme(theme.name)}
                  className={`flex items-center justify-between w-full p-2.5 rounded-xl transition-all hover:bg-secondary ${currentTheme === theme.name ? "bg-primary/10 text-primary" : "text-foreground/70"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full shadow-sm border border-white/20"
                      style={{ backgroundColor: theme.color }}
                    />
                    <span className="text-xs font-black tracking-tight">{theme.name}</span>
                  </div>
                  {currentTheme === theme.name && <Check className="h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
