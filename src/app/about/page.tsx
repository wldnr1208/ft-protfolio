"use client";
import React, { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";

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
        <div
          id="header"
          ref={setElementRef("header")}
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible("header")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1
            className={`text-4xl md:text-5xl font-bold mb-8 transition-all duration-800 delay-200 ${
              isDarkMode ? "text-white" : "text-gray-900"
            } ${
              isVisible("header")
                ? "opacity-100 transform-none"
                : "opacity-0 -translate-x-10"
            }`}
          >
            About Me
          </h1>
        </div>

        {/* 왜 프론트엔드인가 섹션 */}
        <div
          id="why-frontend"
          ref={setElementRef("why-frontend")}
          className={`mb-20 transition-all duration-1000 delay-200 ${
            isVisible("why-frontend")
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-20"
          }`}
        >
          <div
            className={`rounded-2xl border p-8 md:p-12 hover:shadow-xl transition-all duration-500 group overflow-hidden relative ${
              isDarkMode
                ? "bg-gray-900 border-gray-700 hover:bg-gray-800"
                : "bg-gray-50 border-gray-200 hover:bg-white"
            }`}
          >
            <h2
              className={`text-2xl md:text-3xl font-bold mb-6 relative z-10 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              왜 프론트엔드일까요?
            </h2>
            <div className="space-y-4 text-lg leading-relaxed relative z-10">
              <p
                className={`transition-all duration-700 delay-300 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                } ${
                  isVisible("why-frontend")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                커다란 화면을 바라볼 때, 그 안에서{" "}
                <span className="font-semibold">
                  수많은 컴포넌트들이 조화롭게 어우러져
                </span>{" "}
                하나의 완성된 서비스를 만들어내는 모습이 너무나
                매력적이었습니다.
              </p>
              <p
                className={`transition-all duration-700 delay-500 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                } ${
                  isVisible("why-frontend")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                마치 <span className="font-semibold">레고 블록을 조립하듯</span>
                , 각각의 컴포넌트가 가진 고유한 역할과 기능들을 정확한 위치에
                배치하고, 서로 연결하여 하나의 거대한 작품을 완성시키는 과정이
                정말 흥미롭습니다.
              </p>
              <p
                className={`transition-all duration-700 delay-700 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                } ${
                  isVisible("why-frontend")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                사용자가 직접 보고 만지는{" "}
                <span className="font-semibold">최전선에서 경험을 설계</span>{" "}
                한다는 것, 그리고 그 경험이 누군가의 일상을 조금 더 편리하게
                만들 수 있다는 것이 프론트엔드 개발자로서 가장 큰 보람이자
                동기가 됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Experience 섹션 */}
        <div
          id="experience"
          ref={setElementRef("experience")}
          className={`mb-24 transition-all duration-1000 delay-300 ${
            isVisible("experience")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          }`}
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Featured Experience
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* 항해99 프로젝트 */}
            <div
              className={`rounded-2xl border overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${
                isDarkMode
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-gray-200"
              } ${
                isVisible("experience")
                  ? "opacity-100 translate-x-0 rotate-0"
                  : "opacity-0 -translate-x-10 -rotate-2"
              }`}
            >
              <div className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-full opacity-20 transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="flex justify-between items-start mb-6">
                  <h3
                    className={`text-xl font-bold group-hover:text-purple-600 transition-colors ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    React 기반 실전 프로젝트를 통한 프론트엔드 개발 역량 강화
                  </h3>
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    2022.12 - 2023.03
                  </span>
                </div>

                <div className="mb-6">
                  <h4
                    className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    TECHNOLOGIES
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "JavaScript", "Redux", "CSS3", "HTML5"].map(
                      (tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 text-sm rounded-full hover:scale-105 transition-all duration-300 ${
                            isDarkMode
                              ? "bg-gray-800 text-gray-200 hover:bg-purple-800"
                              : "bg-gray-100 text-gray-700 hover:bg-purple-100"
                          }`}
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h4
                    className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    KEY FEATURES
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "실시간 데이터 동기화",
                      "컴포넌트 기반 재사용성",
                      "반응형 디자인 구현",
                      "상태관리 리팩토링 경험",
                    ].map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-center text-sm transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <div className="w-1 h-1 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 내일배움캠프 프로젝트 */}
            <div
              className={`rounded-2xl border overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${
                isDarkMode
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-gray-200"
              } ${
                isVisible("experience")
                  ? "opacity-100 translate-x-0 rotate-0"
                  : "opacity-0 translate-x-10 rotate-2"
              }`}
            >
              <div className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200 to-cyan-200 dark:from-blue-800 dark:to-cyan-800 rounded-full opacity-20 transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="flex justify-between items-start mb-6">
                  <h3
                    className={`text-xl font-bold group-hover:text-blue-600 transition-colors ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Spring Boot 기반 백엔드 개발 및 풀스택 역량 확장
                  </h3>
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    2024.11 - 2025.02
                  </span>
                </div>

                <div className="mb-6">
                  <h4
                    className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    TECHNOLOGIES
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Spring Boot", "Java", "JPA", "MySQL", "JWT"].map(
                      (tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 text-sm rounded-full hover:scale-105 transition-all duration-300 ${
                            isDarkMode
                              ? "bg-gray-800 text-gray-200 hover:bg-blue-800"
                              : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                          }`}
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h4
                    className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    KEY FEATURES
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "RESTful API 설계",
                      "JWT 인증 시스템",
                      "데이터베이스 최적화",
                      "테스트 코드 작성",
                    ].map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-center text-sm transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <div className="w-1 h-1 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Expertise 섹션 */}
        <div
          id="skills"
          ref={setElementRef("skills")}
          className={`mb-24 transition-all duration-1000 delay-400 ${
            isVisible("skills") ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Skills & Expertise
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend Development",
                skills: [
                  "React.js, Next.js",
                  "JavaScript, TypeScript",
                  "HTML5, CSS3",
                  "Tailwind CSS",
                  "Responsive Design",
                ],
                color: "purple",
              },
              {
                title: "Backend Development",
                skills: [
                  "Spring Boot",
                  "Java",
                  "JPA, Hibernate",
                  "RESTful API",
                  "Database Design",
                ],
                color: "blue",
              },
              {
                title: "Design & Tools",
                skills: ["Figma", "Git, GitHub"],
                color: "green",
              },
            ].map((category, categoryIndex) => (
              <div
                key={category.title}
                className={`text-center p-6 rounded-2xl border hover:shadow-lg hover:scale-105 transition-all duration-500 ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700"
                    : "bg-white border-gray-200"
                } ${
                  isVisible("skills")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${categoryIndex * 200}ms` }}
              >
                <h3
                  className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                    isDarkMode
                      ? "text-white hover:text-purple-400"
                      : "text-gray-900 hover:text-purple-600"
                  }`}
                >
                  {category.title}
                </h3>
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <p
                      key={skill}
                      className={`transition-colors duration-300 cursor-default ${
                        isDarkMode
                          ? "text-gray-300 hover:text-purple-400"
                          : "text-gray-600 hover:text-purple-600"
                      }`}
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div
          id="contact"
          ref={setElementRef("contact")}
          className={`text-center rounded-2xl p-12 hover:shadow-2xl transition-all duration-700 transform ${
            isDarkMode
              ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white"
              : "bg-gradient-to-r from-gray-900 to-black text-white"
          } ${
            isVisible("contact")
              ? "opacity-100 translate-y-0 rotate-0"
              : "opacity-0 translate-y-10 rotate-1"
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-4 transition-all duration-500 delay-200 ${
              isVisible("contact")
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90"
            }`}
          >
            Let's Create Something Amazing Together
          </h2>
          <p
            className={`mb-8 max-w-2xl mx-auto transition-all duration-500 delay-400 ${
              isVisible("contact")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            새로운 프로젝트나 협업 기회에 대해 이야기하고 싶으시다면 언제든
            연락주세요. 함께 멋진 결과물을 만들어나가길 기대합니다.
          </p>
          <a
            href="mailto:wldnr1208@naver.com"
            className={`inline-block bg-white text-black px-8 py-3 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 ${
              isVisible("contact")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            Contact Me →
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutDetailPage;
