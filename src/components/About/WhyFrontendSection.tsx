import React from "react";

interface SectionProps {
  isDarkMode: boolean;
  isVisible: (id: string) => boolean;
  setElementRef: (id: string) => (ref: HTMLElement | null) => void;
}

export const WhyFrontendSection: React.FC<SectionProps> = ({
  isDarkMode,
  isVisible,
  setElementRef,
}) => (
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
        {[
          {
            delay: 300,
            text: (
              <>
                커다란 화면을 바라볼 때, 그 안에서{" "}
                <span className="font-semibold">
                  수많은 컴포넌트들이 조화롭게 어우러져
                </span>{" "}
                하나의 완성된 서비스를 만들어내는 모습이 너무나
                매력적이었습니다.
              </>
            ),
          },
          {
            delay: 500,
            text: (
              <>
                마치 <span className="font-semibold">레고 블록을 조립하듯</span>
                , 각각의 컴포넌트가 가진 고유한 역할과 기능들을 정확한 위치에
                배치하고, 서로 연결하여 하나의 거대한 작품을 완성시키는 과정이
                정말 흥미롭습니다.
              </>
            ),
          },
          {
            delay: 700,
            text: (
              <>
                사용자가 직접 보고 만지는{" "}
                <span className="font-semibold">최전선에서 경험을 설계</span>{" "}
                한다는 것, 그리고 그 경험이 누군가의 일상을 조금 더 편리하게
                만들 수 있다는 것이 프론트엔드 개발자로서 가장 큰 보람이자
                동기가 됩니다.
              </>
            ),
          },
        ].map(({ text, delay }, idx) => (
          <p
            key={idx}
            className={`transition-all duration-700 delay-[${delay}ms] ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            } ${
              isVisible("why-frontend")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  </div>
);
