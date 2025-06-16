"use client";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import { useState, useEffect, ReactNode } from "react";

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 다크모드 설정 불러오기
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // 다크모드 상태 저장
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));

    // HTML 클래스 토글
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
