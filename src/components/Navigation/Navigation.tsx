import React from "react";
import { motion } from "framer-motion";

// Navigation Props
export interface NavigationProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<NavigationProps> = ({
  isDarkMode,
  setIsDarkMode,
  isMenuOpen,
  setIsMenuOpen,
  setIsHovering,
}) => {
  return (
    <nav className="fixed top-0 w-full z-40 backdrop-blur-md bg-white/10 dark:bg-black/10">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <img
            src={isDarkMode ? "/assets/logo-dark.png" : "/assets/logo.png"}
            alt="Logo"
            className="w-20 h-20 object-contain"
          />
        </motion.div>

        <div className="flex items-center gap-6">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.span
              className={`w-6 h-0.5 ${
                isDarkMode ? "bg-white" : "bg-gray-900"
              } transition-all`}
              animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className={`w-6 h-0.5 ${
                isDarkMode ? "bg-white" : "bg-gray-900"
              } transition-all`}
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className={`w-6 h-0.5 ${
                isDarkMode ? "bg-white" : "bg-gray-900"
              } transition-all`}
              animate={
                isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
              }
            />
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
