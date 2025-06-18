import React from "react";

interface SectionProps {
  isDarkMode: boolean;
  isVisible: (id: string) => boolean;
  setElementRef: (id: string) => (ref: HTMLElement | null) => void;
}

export const ContactSection: React.FC<SectionProps> = ({
  isDarkMode,
  isVisible,
  setElementRef,
}) => (
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
        isVisible("contact") ? "opacity-100 scale-100" : "opacity-0 scale-90"
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
);
