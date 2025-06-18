"use client";
import React, { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { HeaderSection } from "@/components/About/HeaderSection";
import { WhyFrontendSection } from "@/components/About/WhyFrontendSection";
import { ExperienceSection } from "@/components/About/ExperienceSection";
import { SkillsSection } from "@/components/About/SkillsSection";
import { ContactSection } from "@/components/About/ContactSection";

const AboutDetailPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Map());

  const elementRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleElements((prev) => {
          const updated = new Map(prev);
          entries.forEach((entry) => {
            updated.set(entry.target.id, entry.isIntersecting);
          });
          return updated;
        });
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    Object.values(elementRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setElementRef = (id: string) => (ref: HTMLElement | null) => {
    if (ref) elementRefs.current[id] = ref;
  };

  const isVisible = (id: string) => visibleElements.get(id);

  return (
    <div
      className={`min-h-screen flex flex-col items-center transition-colors duration-500 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* 상단 네비게이션 */}
      <Navigation
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsHovering={setIsHovering}
        showMenuButton={false}
      />

      <main className="w-full max-w-5xl px-6 md:px-8 py-24 pt-52">
        {/* About Me 헤더 섹션 */}
        <HeaderSection
          isDarkMode={isDarkMode}
          isVisible={isVisible}
          setElementRef={setElementRef}
        />
        {/* 왜 프론트엔드인가 섹션 */}
        <WhyFrontendSection
          isDarkMode={isDarkMode}
          isVisible={isVisible}
          setElementRef={setElementRef}
        />

        {/* Featured Experience 섹션 */}
        <ExperienceSection
          isDarkMode={isDarkMode}
          isVisible={isVisible}
          setElementRef={setElementRef}
        />

        {/* Skills & Expertise 섹션 */}
        <SkillsSection
          isDarkMode={isDarkMode}
          isVisible={isVisible}
          setElementRef={setElementRef}
        />

        {/* Contact CTA */}
        <ContactSection
          isDarkMode={isDarkMode}
          isVisible={isVisible}
          setElementRef={setElementRef}
        />
      </main>

      <Footer />
    </div>
  );
};

export default AboutDetailPage;
