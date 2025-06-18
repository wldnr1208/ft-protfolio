import React from "react";

interface SectionProps {
  isDarkMode: boolean;
  isVisible: (id: string) => boolean;
  setElementRef: (id: string) => (ref: HTMLElement | null) => void;
}

export const SkillsSection: React.FC<SectionProps> = ({
  isDarkMode,
  isVisible,
  setElementRef,
}) => (
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
);
