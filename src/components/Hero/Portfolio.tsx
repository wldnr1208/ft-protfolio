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
import Footer from "../Footer/Footer";
import AboutSection from "../AboutSection/AboutSection";

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
    // {
    //   id: 1,
    //   title: "Interactive Experience Design",
    //   description: "Scroll-triggered animations with custom cursor effects",
    //   longDescription:
    //     "A comprehensive design system built with modern web technologies. This project showcases advanced scroll-triggered animations, custom cursor effects, and seamless user interactions. Built with performance in mind, it delivers smooth 60fps animations across all devices.",
    //   tech: ["Framer Motion", "GSAP", "Three.js"],
    //   features: [
    //     "Scroll-triggered animations",
    //     "Responsive scroll animations",
    //     "Custom cursor effects",
    //     "Hover & click interactions",
    //   ],
    //   gradient: "from-purple-500 to-pink-500",
    //   image:
    //     "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
    //   link: "https://example.com/project1",
    //   year: "2024",
    //   role: "Lead Developer",
    // },
    {
      id: 2,
      title: "바슈롬 통합 어드민",
      description: "여러 어드민 페이지 통합 어드민으로 구축",
      longDescription:
        "바슈롬의 통합 관리 시스템을 구축한 프로젝트입니다. 복잡한 데이터를 직관적으로 관리할 수 있는 대시보드와 실시간 모니터링 시스템을 구현했습니다. 사용자 경험을 최우선으로 고려하여 설계된 인터페이스가 특징입니다.",
      tech: ["React", "antd", "Redux-saga"],
      features: [
        "실시간 데이터 동기화",
        "권한 기반 접근 제어",
        "대시보드 커스터마이징",
        "자동화된 리포트 생성",
      ],
      gradient: "from-blue-500 to-cyan-500",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      year: "2023",
      role: "Frontend Developer",
    },
    {
      id: 3,
      title: "lensly 유지보수",
      description: "lensly 퍼블리싱 및 매장리스트 개발",
      longDescription:
        "웹 애플리케이션의 성능을 극대화하는 최적화 프로젝트입니다. 코드 스플리팅, 레이지 로딩, 캐싱 전략 등을 통해 초기 로딩 시간을 70% 단축시켰으며, 사용자 인터랙션의 반응성을 크게 개선했습니다.",
      tech: ["Next.js", "React", "Redux-Saga", "Webpack"],
      features: [
        "카카오맵 API 연동 부분 버그 수정",
        "매장 위치 검색 기능 최적화",
        "사용자 현재 위치 기반 검색 개선",
        "지도 마커 UI 수정",
      ],
      gradient: "from-orange-500 to-red-500",
      image:
        "https://lensly.co.kr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flensly_Og_image.ced781be.jpg&w=1920&q=75",
      link: "https://www.lensly.co.kr/",
      year: "2024",
      role: "Frontend Developer",
    },
    {
      id: 4,
      title: "BAUSCH 모바일 앱 마이그레이션",
      description: "Expo SDK 마이그레이션 및 앱스토어 대응",
      longDescription:
        "App Store 정책 변경으로 인한 앱 서비스 중단 위기를 해결하기 위해, 레거시 앱을 React Native와 최신 Expo SDK로 마이그레이션한 프로젝트입니다. 로컬 개발 환경을 새롭게 구축하고, CodePush를 활용한 실시간 배포 시스템도 함께 구현했습니다.",
      tech: [
        "React Native",
        "Expo SDK 48",
        "TypeScript",
        "CodePush",
        "FingerPush",
      ],
      features: [
        "Expo SDK 긴급 업그레이드 (v37 → v48)",
        "iOS/Android 로컬 개발 환경 구축",
        "App Store 정책 대응 및 심사 통과",
        "CodePush 통한 실시간 앱 업데이트 시스템 구현",
        "푸시 알림 시스템(FingerPush) 연동",
      ],
      gradient: "from-green-500 to-teal-500",
      image:
        "https://wldnr1208.github.io/jw1208.github.io/assets/img/portfolio/app.PNG",
      year: "2023",
      role: "Frontend Developer",
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
        <AboutSection />

        {/* Projects Section */}
        <ProjectsSection
          projectsRef={projectsRef}
          projectsY={projectsY}
          setIsHovering={setIsHovering}
          projects={projects}
          isDarkMode={isDarkMode}
        />
        <div className="h-[250px]" />

        <Footer />
      </div>
    </>
  );
};

export default Portfolio;
