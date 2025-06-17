import React from "react";
import { AnimatePresence, motion } from "framer-motion";

// MenuOverlay Props
export interface MenuOverlayProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  setIsHovering,
  isDarkMode,
}) => {
  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className={`fixed inset-0 ${
            isDarkMode ? "bg-gray-900" : "bg-gray-100"
          } z-50 flex flex-col justify-center items-start px-16`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`absolute top-8 right-8 text-3xl font-light ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            ✕
          </button>

          <nav className="space-y-6">
            <motion.a
              href="#home"
              className={`block text-6xl md:text-7xl font-black ${
                isDarkMode
                  ? "text-white hover:text-gray-300"
                  : "text-black hover:text-gray-600"
              } transition-colors`}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              HOME
            </motion.a>
            <motion.a
              href="#projects"
              className={`block text-6xl md:text-7xl font-black ${
                isDarkMode
                  ? "text-white hover:text-gray-300"
                  : "text-black hover:text-gray-600"
              } transition-colors`}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              PROJECT
            </motion.a>
            <motion.a
              href="#about"
              className={`block text-6xl md:text-7xl font-black ${
                isDarkMode
                  ? "text-white hover:text-gray-300"
                  : "text-black hover:text-gray-600"
              } transition-colors`}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              ABOUT
            </motion.a>
          </nav>

          <div
            className={`absolute bottom-16 right-16 text-right ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <div className="mb-8">
              <div className="w-72 h-48 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4" />
              <p className="text-sm font-medium mb-1">ABOUT ME</p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium">EMAIL</p>
              <p>hello@portfolio.com</p>
              <p className="font-medium mt-4">BLOG</p>
              <p>blog.portfolio.com</p>
            </div>
          </div>

          <div
            className={`absolute bottom-16 left-16 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <p className="text-sm font-medium">CONTACT</p>
            <div className="text-3xl font-black mt-2">*</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
