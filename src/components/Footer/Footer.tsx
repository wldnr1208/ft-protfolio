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
        {/* Contact & Actions */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm md:text-base">
          <span>
            📧{" "}
            <a href="mailto:wldnr1208@naver.com" className="hover:underline">
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
              github.com/wldnr1208
            </a>
          </span>

          {/* Privacy Policy Button */}
          <a
            href="https://doc-hosting.flycricket.io/harumanweon-privacy-policy/39c80136-cc0c-467f-a72d-9500118e5add/privacy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="개인정보처리방침 새 창으로 열기"
            className="inline-flex items-center rounded-xl border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            🔒 개인정보처리방침
          </a>
        </div>

        {/* Optional Message */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Designed &amp; Developed with ❤️ using React, Next.js, and Framer
          Motion.
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
