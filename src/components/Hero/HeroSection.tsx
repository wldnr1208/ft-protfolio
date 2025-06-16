"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ThreeBackground } from "./ThreeBackground";
import { useDarkMode } from "@/hooks/useDarkMode";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        isDarkMode
          ? "bg-black"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}
    >
      {/* Three.js Background */}
      <ThreeBackground isDarkMode={isDarkMode} />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Charles Bruyerre
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`text-lg font-medium transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              EN
            </motion.div>

            {/* 다크모드 토글 버튼 */}
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
              >
                <div className="flex items-center justify-center w-full h-full">
                  {isDarkMode ? (
                    <svg
                      className="w-3 h-3 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </div>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-40 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Hello, I'm{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              JungWoo
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-8"
          >
            <p
              className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              I{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">
                design
              </span>{" "}
              &{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent font-medium">
                develop
              </span>{" "}
              playful
            </p>
            <p
              className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              interfaces for the web.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className={`text-lg md:text-xl mb-12 font-medium transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Front-end Developer / Creative Technologist
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: isDarkMode
                  ? "0 25px 50px rgba(255,255,255,0.1)"
                  : "0 25px 50px rgba(0,0,0,0.15)",
                y: -3,
              }}
              whileTap={{ scale: 0.95 }}
              className={`px-10 py-4 rounded-xl text-lg font-medium transition-all duration-300 shadow-lg ${
                isDarkMode
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              See Projects
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                y: -3,
              }}
              whileTap={{ scale: 0.95 }}
              className={`px-10 py-4 rounded-xl text-lg font-medium border-2 transition-all duration-300 shadow-lg ${
                isDarkMode
                  ? "bg-transparent text-white border-gray-600 hover:border-gray-400 hover:bg-gray-900"
                  : "bg-white/90 backdrop-blur-sm text-gray-800 border-gray-300 hover:border-gray-600 hover:bg-white"
              }`}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-40"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`w-6 h-10 border-2 rounded-full flex justify-center cursor-pointer transition-colors duration-300 ${
            isDarkMode
              ? "border-gray-400 hover:border-gray-300"
              : "border-gray-400 hover:border-gray-600"
          }`}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`w-1 h-3 rounded-full mt-2 transition-colors duration-300 ${
              isDarkMode ? "bg-gray-400" : "bg-gray-400"
            }`}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
