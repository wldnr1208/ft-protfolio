"use client";
import React, { useEffect, useRef, useState, Suspense } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { ThreeBackground } from "./ThreeBackground";
import CustomCursor from "./CustomCursor";
import MenuOverlay from "./MenuOverlay";
import Navigation from "../Navigation/Navigation";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";

// Google Fonts Exo 2 추가
const ExoFont = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Exo+2:wght@100;200;300;400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />
);

// 메인 포트폴리오 컴포넌트
const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useRef에 HTMLElement 타입 명시
  const containerRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: projectScrollProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"],
  });

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothCursorX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const smoothCursorY = useSpring(cursorY, { damping: 20, stiffness: 300 });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const projectsY = useTransform(projectScrollProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
    <>
      <ExoFont />
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"
        } transition-colors duration-700 relative`}
        style={{ fontFamily: "'Exo 2', sans-serif" }}
      >
        {/* 3D Background */}
        <ThreeBackground isDarkMode={isDarkMode} />

        {/* Custom Cursor */}
        <CustomCursor
          smoothCursorX={smoothCursorX}
          smoothCursorY={smoothCursorY}
          isHovering={isHovering}
        />

        {/* Navigation */}
        <Navigation
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setIsHovering={setIsHovering}
        />

        {/* Menu Overlay */}
        <MenuOverlay
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setIsHovering={setIsHovering}
          isDarkMode={isDarkMode}
        />

        {/* Hero Section */}
        <HeroSection
          containerRef={containerRef}
          heroY={heroY}
          heroOpacity={heroOpacity}
        />

        {/* Projects Section */}
        <ProjectsSection
          projectsRef={projectsRef}
          projectsY={projectsY}
          setIsHovering={setIsHovering}
          projects={projects}
        />
      </div>
    </>
  );
};

export default Portfolio;
