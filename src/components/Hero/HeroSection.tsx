"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ThreeBackground } from "./ThreeBackground";
import { useDarkMode } from "@/hooks/useDarkMode";
import Header from "../Header/Header";

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

      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <div className="relative z-40 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-2"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`text-sm md:text-base font-medium tracking-wider uppercase transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Front-end Developer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Hello, I'm{" "}
              <span className="font-medium bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                JungWoo
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className={`text-lg md:text-xl lg:text-2xl font-light leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              I create{" "}
              <span className="font-medium bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                interactive
              </span>{" "}
              and{" "}
              <span className="font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                engaging
              </span>{" "}
              web experiences
            </motion.p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className={`text-lg md:text-xl mb-12 font-medium transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Front-end Developer
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
