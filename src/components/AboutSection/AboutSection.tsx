"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const AboutSection: React.FC = () => {
  const router = useRouter();

  return (
    <section
      id="about"
      className="max-w-4xl mx-auto px-6 md:px-8 py-32 text-center flex flex-col items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-4 mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          About Me
        </h2>

        {/* 🔁 움직이는 span 안에 → */}
        <button
          onClick={() => router.push("/about")}
          aria-label="Go to About Page"
          className="text-3xl hover:text-blue-500 transition-transform duration-300"
        >
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block"
          >
            →
          </motion.span>
        </button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl"
      >
        안녕하세요, 비즈니스와 사용자 중심의 개발을 지향하는 프론트엔드 개발자
        이정우입니다. 웹과 모바일 앱의 개발·유지보수 경험이 있으며, 기술 선택에
        있어 팀워크와 비즈니스 요구를 최우선으로 고려합니다. 항해99 프론트엔드
        부트캠프와 내일배움캠프 백엔드 과정을 수료하며 전반적인 서비스 흐름을
        이해하고, 사용자 편의성과 시스템 안정성을 고려한 개발에 집중하고
        있습니다.
      </motion.p>
    </section>
  );
};

export default AboutSection;
