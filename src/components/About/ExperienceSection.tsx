import React, { useState } from "react";

interface SectionProps {
  isDarkMode: boolean;
  isVisible: (id: string) => boolean;
  setElementRef: (id: string) => (ref: HTMLElement | null) => void;
}

export const ExperienceSection: React.FC<SectionProps> = ({
  isDarkMode,
  isVisible,
  setElementRef,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificateImage, setCertificateImage] = useState<string | null>(null);

  const openModal = (imgUrl: string) => {
    setCertificateImage(imgUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCertificateImage(null);
  };

  return (
    <>
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
          {/* 항해99 카드 */}
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
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-full opacity-20 transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
              {/* 제목 */}
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

              {/* 기술 스택 */}
              <div className="mb-6">
                <h4
                  className={`text-sm font-semibold mb-3 ${
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

              {/* 기능 목록 */}
              <div className="mb-6">
                <h4
                  className={`text-sm font-semibold mb-3 ${
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
                      className={`flex items-center text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <div className="w-1 h-1 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* View Detail 버튼 */}
              <button
                onClick={() => openModal("/assets/99.png")}
                className={`mt-4 text-sm font-medium text-black hover:text-purple-600 transition-colors`}
              >
                View Detail
              </button>
            </div>
          </div>

          {/* 내일배움캠프 카드 */}
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
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200 to-cyan-200 dark:from-blue-800 dark:to-cyan-800 rounded-full opacity-20 transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
              <div className="flex justify-between items-start mb-6">
                <h3
                  className={`text-xl font-bold group-hover:text-blue-600 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Spring Boot 기반 백엔드 개발 및 풀스택 역량 확장
                </h3>
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  2024.11 - 2025.02
                </span>
              </div>

              <div className="mb-6">
                <h4
                  className={`text-sm font-semibold mb-3 ${
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
                  className={`text-sm font-semibold mb-3 ${
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
                      className={`flex items-center text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <div className="w-1 h-1 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => openModal("/assets/tomorrow.png")}
                className={`mt-4 text-sm font-medium text-black hover:text-blue-600 transition-colors`}
              >
                View Detail
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 컴포넌트 */}
      {isModalOpen && certificateImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
          <div className="relative bg-white dark:bg-gray-900 rounded-xl max-w-3xl w-full shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:bg-red-500 hover:text-white shadow-md transition-colors dark:bg-white dark:text-black dark:hover:bg-red-500 dark:hover:text-white"
              aria-label="닫기"
            >
              &times;
            </button>
            <img
              src={certificateImage}
              alt="수료증 이미지"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
};
