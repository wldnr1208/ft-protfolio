"use client";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import { useState, useEffect, ReactNode } from "react";

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [hasMounted, setHasMounted] = useState(false); // ✅ 렌더 제어용

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      try {
        setIsDarkMode(JSON.parse(saved));
      } catch (e) {
        console.warn("Failed to parse darkMode:", e);
      }
    }
    setHasMounted(true); // ✅ 마운트 이후에만 렌더 허용
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode, hasMounted]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  if (!hasMounted) return null; // ✅ 클라이언트 마운트 전에는 렌더 X

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
