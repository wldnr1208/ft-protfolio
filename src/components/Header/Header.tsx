"use client";

import { motion } from "framer-motion";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-10 py-6 flex items-center justify-between">
      {/* ✅ 로고 이미지 크게, 자연스럽게 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-24 h-auto"
      >
        <img
          src={isDarkMode ? "/assets/logo-dark.svg" : "/assets/logo.png"}
          alt="Logo"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* 우측 영역 */}
      <div className="flex items-center gap-6">
        {/* 언어 선택 */}

        {/* 다크모드 토글 */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={toggleDarkMode}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isDarkMode
              ? "bg-blue-600 focus:ring-blue-500"
              : "bg-gray-300 focus:ring-gray-500"
          }`}
        >
          <motion.div
            className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300"
            animate={{ x: isDarkMode ? 24 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.button>
      </div>
    </header>
  );
}
