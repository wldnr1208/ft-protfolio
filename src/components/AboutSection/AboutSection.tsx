"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const AboutSection: React.FC = () => {
  const router = useRouter();

  // 애니메이션 variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const highlightVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      backgroundColor: "transparent",
    },
    visible: {
      opacity: 1,
      scale: 1,
      backgroundColor: "transparent",
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-6 md:px-8 py-32 text-center flex flex-col items-center dark:text-white"
    >
      <div className="w-full max-w-4xl p-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
          className="mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4"
          >
            <motion.h2
              className="text-5xl md:text-7xl font-black text-inherit"
              variants={wordVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              About Me
            </motion.h2>

            <motion.button
              onClick={() => router.push("/about")}
              aria-label="Go to About Page"
              className="group flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 hover:border-gray-600 dark:hover:border-gray-300 transition-all duration-300 hover:scale-105 mt-4"
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block text-lg text-gray-600 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 text-inherit"
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
          className="space-y-6"
        >
          <motion.p
            className="text-lg md:text-xl leading-relaxed text-inherit"
            variants={itemVariants}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3 },
            }}
          >
            <motion.span variants={wordVariants}>안녕하세요, </motion.span>
            <motion.span
              className="font-medium text-inherit"
              variants={highlightVariants}
              whileHover="hover"
            >
              비즈니스와 사용자 중심의 개발
            </motion.span>
            <motion.span variants={wordVariants}>
              을 지향하는 프론트엔드 개발자{" "}
            </motion.span>
            <motion.span
              className="font-semibold text-inherit"
              variants={highlightVariants}
              whileHover="hover"
            >
              이정우
            </motion.span>
            <motion.span variants={wordVariants}>입니다.</motion.span>
          </motion.p>

          <motion.p
            className="text-base md:text-lg leading-relaxed text-inherit"
            variants={itemVariants}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3 },
            }}
          >
            <motion.span variants={wordVariants}>
              웹과 모바일 앱의 개발·유지보수 경험이 있으며, 기술 선택에 있어{" "}
            </motion.span>
            <motion.span
              className="font-medium text-inherit"
              variants={highlightVariants}
              whileHover="hover"
            >
              팀워크와 비즈니스 요구
            </motion.span>
            <motion.span variants={wordVariants}>
              를 최우선으로 고려합니다.
            </motion.span>
          </motion.p>

          <motion.p
            className="text-base md:text-lg leading-relaxed text-inherit"
            variants={itemVariants}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3 },
            }}
          >
            <motion.span
              className="font-medium text-inherit"
              variants={highlightVariants}
              whileHover="hover"
            >
              항해99 프론트엔드 부트캠프
            </motion.span>
            <motion.span variants={wordVariants}>와</motion.span>
            <motion.span
              className="font-medium text-inherit"
              variants={highlightVariants}
              whileHover="hover"
            >
              {" "}
              내일배움캠프 백엔드 과정
            </motion.span>
            <motion.span variants={wordVariants}>
              을 수료하며 전반적인 서비스 흐름을 이해하고, 사용자 편의성과
              시스템 안정성을 고려한 개발에 집중하고 있습니다.
            </motion.span>
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={itemVariants}
          className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
        >
          <motion.p
            className="text-sm md:text-base italic text-gray-600 dark:text-white text-inherit"
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.3 },
            }}
            variants={wordVariants}
          >
            "코드로 사용자의 일상을 더 편리하게 만드는 것이 목표입니다"
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
