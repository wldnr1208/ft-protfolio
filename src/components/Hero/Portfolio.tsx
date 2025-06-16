"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const projectsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: projectScrollProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"],
  });

  // Smooth cursor motion
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothCursorX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const smoothCursorY = useSpring(cursorY, { damping: 20, stiffness: 300 });

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const projectsY = useTransform(projectScrollProgress, [0, 1], [100, -100]);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  const projects = [
    {
      title: "Interactive Experience Design",
      description: "Scroll-triggered animations with custom cursor effects",
      tech: ["Framer Motion", "GSAP", "Three.js"],
      features: [
        "Scroll-triggered animations",
        "Responsive scroll animations",
        "Custom cursor effects",
        "Hover & click interactions",
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Motion UI Architecture",
      description: "Advanced layout systems with smooth transitions",
      tech: ["React", "TypeScript", "CSS Grid"],
      features: [
        "Sticky layout structures",
        "Scroll animation components",
        "Loading effects system",
        "Bezier curve animations",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Performance Optimization",
      description: "High-performance web experiences",
      tech: ["Next.js", "WebGL", "Performance API"],
      features: [
        "Scroll transform implementation",
        "Animation variants system",
        "Custom cursor components",
        "60fps smooth animations",
      ],
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      } transition-colors duration-700`}
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          x: smoothCursorX,
          y: smoothCursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className={`rounded-full bg-white ${
            isHovering ? "w-16 h-16" : "w-4 h-4"
          } transition-all duration-300`}
          animate={{ scale: isHovering ? 1.5 : 1 }}
        />
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md bg-white/10 dark:bg-black/10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            <span className="font-light text-sm tracking-widest uppercase">
              Portfolio
            </span>
          </motion.div>
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
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        ref={containerRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gray-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-7xl md:text-9xl font-thin tracking-tight mb-6">
              INTUITIVE UI
            </h1>
            <h2 className="text-5xl md:text-7xl font-thin tracking-tight mb-4">
              USER ENGAGEMENT
            </h2>
            <h3 className="text-4xl md:text-6xl font-medium tracking-tight bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              PERFORMANCE
            </h3>
            <h4 className="text-3xl md:text-5xl font-thin tracking-tight mt-4">
              IMPROVEMENT
            </h4>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Crafting immersive digital experiences through innovative motion
            design and cutting-edge web technologies
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
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
        </div>
      </motion.section>

      {/* Projects Section */}
      <section ref={projectsRef} className="min-h-screen py-20 relative">
        <motion.div style={{ y: projectsY }} className="max-w-7xl mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-thin mb-20 text-center"
          >
            Featured Projects
          </motion.h2>

          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div
                    className={`${
                      index % 2 === 0 ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className={`h-96 rounded-2xl bg-gradient-to-br ${project.gradient} p-8 flex items-center justify-center relative overflow-hidden`}
                    >
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-20">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute rounded-full bg-white"
                            style={{
                              width: `${100 + i * 50}px`,
                              height: `${100 + i * 50}px`,
                              left: "50%",
                              top: "50%",
                              translateX: "-50%",
                              translateY: "-50%",
                            }}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.1, 0.2, 0.1],
                            }}
                            transition={{
                              duration: 3 + i,
                              repeat: Infinity,
                              delay: i * 0.5,
                            }}
                          />
                        ))}
                      </div>

                      <div className="relative z-10 text-white text-center">
                        <h3 className="text-3xl font-light mb-4">
                          {project.title}
                        </h3>
                        <p className="text-lg opacity-90">
                          {project.description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className={`${
                      index % 2 === 0 ? "md:order-2" : "md:order-1"
                    } space-y-6`}
                  >
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-800 text-sm"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <motion.button
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      className="group/btn flex items-center gap-2 text-lg font-light"
                    >
                      <span>View Project</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Portfolio;
