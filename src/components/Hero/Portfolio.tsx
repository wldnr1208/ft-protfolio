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
import ProjectsSection, { Project } from "./ProjectsSection";
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

  const projects: Project[] = [
    // 회사 프로젝트 (최신순)
    {
      id: 1,
      title: "Fibud Career 플랫폼",
      description: "피트니스 전문가를 위한 교육·자격증·커리어 통합 플랫폼",
      longDescription:
        "Fibud Career는 피트니스 전문가(트레이너)를 위한 교육, 자격증, VOD 학습, 커리어 관리 통합 플랫폼입니다. Turborepo 기반 모노레포 아키텍처로 Expert, Consumer, Center, HR 등 5개 앱을 효율적으로 관리하며, 교육 탭에서는 자격증·교육·VOD 과정 탐색, 무한 스크롤 기반 필터링, 결제·구독 시스템, 수강 관리 대시보드를 구현했으며, 트레이너 프로필·포트폴리오·리뷰 시스템과 카카오맵 기반 센터 검색 기능도 포함됩니다.",
      tech: [
        "Next.js",
        "TypeScript",
        "Turborepo",
        "React Query",
        "Tailwind CSS",
      ],
      features: [
        "Turborepo 모노레포로 5개 앱(Expert, Consumer, Center, HR, Toss) 통합 관리",
        "교육 탭: 자격증·교육·VOD 과정 탐색 및 카테고리별 필터링",
        "무한 스크롤 + 다중 필터(주제, 레벨, 강의유형, 요일, 정렬) 기반 과정 리스트",
        "수강 관리 대시보드 (구독중/신청완료/수강중/수강완료 상태 관리)",
        "트레이너 프로필·포트폴리오·리뷰 시스템 구현",
        "카카오맵 SDK 연동 센터 위치 검색 및 거리 계산",
      ],
      gradient: "from-violet-600 to-purple-800",
      image: "/assets/fibud-career-icon.png",
      year: "2025.12 - 현재",
      role: "Frontend Engineer",
      category: "company",
    },
    {
      id: 2,
      title: "위즈커넥트 앱",
      description: "관심사 기반 커뮤니티 소셜 네트워크 서비스 앱 개발",
      longDescription:
        "위즈커넥트는 관심사 기반의 클럽(커뮤니티)을 통해 사람들이 모이고 소통할 수 있는 소셜 네트워크 서비스 앱입니다. React Native와 Expo를 활용하여 iOS/Android 크로스 플랫폼으로 개발했으며, React-Query를 통한 효율적인 서버 상태 관리와 Zustand를 활용한 클라이언트 상태 관리를 구현했습니다.",
      tech: ["React Native", "Expo", "TypeScript", "React-Query", "zustand"],
      features: [
        "소셜 로그인 (카카오, 네이버, 애플) 및 본인인증 PG사 연동",
        "React-Query를 이용한 효율적인 API 연동 및 캐싱",
        "Zustand를 이용한 전역 상태 관리",
        "Firebase Cloud Messaging (FCM) 푸시 알림 연동",
        "클럽(커뮤니티) 생성 및 관리 기능",
        "피드 작성 및 댓글, 좋아요 기능",
      ],
      gradient: "from-purple-500 to-indigo-500",
      image: "/assets/wizconnect-icon.png",
      link: "https://apps.apple.com/kr/app/%EC%9C%84%EC%A6%88%EC%BB%A4%EB%84%A5%ED%8A%B8/id6749420482",
      androidLink: "https://play.google.com/store/apps/details?id=com.wesconnect.wesconnect",
      year: "2025.06 - 2025.09",
      role: "Frontend Engineer",
      category: "company",
    },
    {
      id: 3,
      title: "국립과천과학관 디지털가이드 앱",
      description: "비콘 기반 전시관 디지털 가이드 앱 개발",
      longDescription:
        "국립과천과학관의 디지털 가이드 앱을 개발한 프로젝트입니다. 비콘(Beacon) 블루투스 통신을 활용하여 관람객의 위치를 파악하고, 전시물에 대한 자세한 설명과 안내를 제공합니다. React Native로 크로스 플랫폼 개발을 진행했으며, Redux Toolkit과 zustand를 활용한 효율적인 상태 관리 시스템을 구현했습니다.",
      tech: ["React Native", "Redux Toolkit", "zustand", "Bluetooth Beacon"],
      features: [
        "비콘 블루투스 데이터를 이용한 실시간 위치 추적",
        "전시물별 상세 정보 제공",
        "비콘 데이터 처리를 위한 커스텀 훅 개발",
        "Redux Toolkit을 사용한 전역 상태 관리 및 비동기 작업 처리",
        "zustand를 이용한 영문 번역 콘텐츠 관리",
        "전시관 실내 지도 및 네비게이션 기능",
      ],
      gradient: "from-indigo-600 to-purple-600",
      image: "/assets/gwacheon-museum-logo.png",
      link: "https://apps.apple.com/kr/app/%EA%B5%AD%EB%A6%BD%EA%B3%BC%EC%B2%9C%EA%B3%BC%ED%95%99%EA%B4%80-%EB%94%94%EC%A7%80%ED%84%B8%EA%B0%80%EC%9D%B4%EB%93%9C/id6744019613",
      year: "2025.02 - 2025.04",
      role: "Frontend Engineer",
      category: "company",
    },
    {
      id: 4,
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
      category: "company",
    },
    {
      id: 5,
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
      category: "company",
    },
    {
      id: 6,
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
      category: "company",
    },
    // 개인 프로젝트
    {
      id: 7,
      title: "Netflix 클론 코딩",
      description: "개인프로젝트 - 최신 기술 스택으로 구현한 스트리밍 플랫폼",
      longDescription:
        "Next.js 15와 현대적인 상태관리 도구들을 활용하여 구현한 Netflix 클론 프로젝트입니다. 실제 Netflix와 유사한 사용자 인터페이스와 기능을 제공하며, 반응형 디자인과 최적화된 성능을 통해 원활한 사용자 경험을 구현했습니다. 영화 정보 API 연동과 사용자 상호작용을 중심으로 개발되었습니다.",
      tech: ["Next.js 15", "Zustand", "React Query", "TypeScript", "TMDB API"],
      features: [
        "영화/TV 프로그램 브라우징 및 검색",
        "반응형 카드 레이아웃 구현",
        "Zustand를 통한 전역 상태 관리",
        "React Query로 효율적인 데이터 페칭",
        "무한 스크롤 및 성능 최적화",
      ],
      gradient: "from-red-600 to-red-800",
      image:
        "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=600&fit=crop",
      link: "https://netflix-seven-mu-59.vercel.app/",
      year: "2024",
      role: "Full Stack Developer",
      category: "personal",
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
