"use client";
import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 px-6 md:px-12 text-center border-t border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm md:text-base">
          <span>
            📧{" "}
            <a href="mailto:youremail@example.com" className="hover:underline">
              wldnr1208@naver.com
            </a>
          </span>
          <span>
            💻{" "}
            <a
              href="https://github.com/wldnr1208"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              github.com/yourgithub
            </a>
          </span>
        </div>

        {/* Optional Message */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Designed & Developed with ❤️ using React, Next.js, and Framer Motion.
        </p>

        {/* Copyright */}
        <p className="text-xs text-gray-400 dark:text-gray-600">
          © {currentYear} Your Name. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
