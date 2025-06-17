import React from "react";
import { motion, MotionValue } from "framer-motion";

// HeroSection Props
export interface HeroSectionProps {
  containerRef: React.RefObject<HTMLElement | null>;
  heroY: MotionValue<number>;
  heroOpacity: MotionValue<number>;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  containerRef,
  heroY,
  heroOpacity,
}) => {
  // 컨테이너 & 글자 애니메이션 variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const splitTextToLetters = (text: string) => {
    return text.split("").map((letter, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        className="inline-block"
        style={{ transformStyle: "preserve-3d" }}
      >
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ));
  };

  return (
    <motion.section
      ref={containerRef}
      style={{ y: heroY, opacity: heroOpacity }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      id="home"
    >
      <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          className="relative space-y-6"
        >
          {/* 노트북 아이콘 */}
          <motion.div
            className="absolute -top-8 right-0 md:right-10 text-6xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 1,
            }}
          >
            💻
          </motion.div>

          {/* INTUITIVE UI */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {splitTextToLetters("INTUITIVE ")}
            <motion.span
              className="inline-block"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradientTextMove 5s linear infinite",
              }}
            >
              {splitTextToLetters("UI")}
            </motion.span>
          </motion.h1>

          {/* USER ENGAGEMENT */}
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {splitTextToLetters("USER ENGAGEMENT")}
          </motion.h2>

          {/* PERFORMANCE + 아이콘 */}
          <div className="relative inline-block">
            <motion.div
              className="absolute -right-20 top-1/2 -translate-y-1/2 text-5xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1.5,
              }}
            >
              🏋️
            </motion.div>
            <motion.h3
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {splitTextToLetters("PERFORMANCE")}
            </motion.h3>
          </div>

          {/* IMPROVEMENT */}
          <motion.h4
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {splitTextToLetters("IMPROVEMENT")}
          </motion.h4>

          {/* 설명 텍스트 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-12 text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Crafting immersive digital experiences through innovative motion
            design and cutting-edge web technologies
          </motion.p>

          {/* 스크롤 인디케이터 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [2, 8, 2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
