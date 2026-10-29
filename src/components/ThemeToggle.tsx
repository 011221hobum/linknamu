"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
      className="fixed right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/45 text-base shadow-[0_4px_16px_-8px_rgba(120,72,40,0.3)] backdrop-blur-xl transition duration-300 hover:bg-white/60 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/10"
    >
      {isDark === null ? null : isDark ? "☀️" : "🌙"}
    </button>
  );
}
