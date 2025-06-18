import React from "react";

interface SectionProps {
  isDarkMode: boolean;
  isVisible: (id: string) => boolean;
  setElementRef: (id: string) => (ref: HTMLElement | null) => void;
}

export const HeaderSection: React.FC<SectionProps> = ({
  isDarkMode,
  isVisible,
  setElementRef,
}) => (
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
);
