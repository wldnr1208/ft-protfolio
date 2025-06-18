"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

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
  const router = useRouter(); // ✅ 라우터 사용

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
            {/* HOME */}
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

            {/* PROJECT */}
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

            {/* ABOUT → /about 이동 */}
            <motion.a
              href="#"
              onClick={() => {
                setIsMenuOpen(false);
                router.push("/about");
              }}
              className={`block text-6xl md:text-7xl font-black ${
                isDarkMode
                  ? "text-white hover:text-gray-300"
                  : "text-black hover:text-gray-600"
              } transition-colors`}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
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
            <div className="space-y-2 text-sm">
              <p className="font-medium">EMAIL</p>
              <p>wldnr1208@naver.com</p>
              <p className="font-medium mt-4">BLOG</p>
              <p>https://wldnr1208.github.io/jw1208.github.io/</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
