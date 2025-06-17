import React, { useState } from "react";
import { motion, MotionValue } from "framer-motion";
import ProjectDetailModal from "./ProjectDetailModal";

// Project 타입 정의 - ProjectDetailModal과 동일하게 업데이트
export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  gradient: string;
  image: string;
  link?: string;
  year: string;
  role: string;
}

// ProjectsSection Props - isDarkMode 추가
export interface ProjectsSectionProps {
  projectsRef: React.RefObject<HTMLElement | null>;
  projectsY: MotionValue<number>;
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
  projects: Project[];
  isDarkMode: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projectsRef,
  projectsY,
  setIsHovering,
  projects,
  isDarkMode,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <section
        ref={projectsRef}
        className="min-h-screen py-12 relative"
        id="projects"
      >
        <motion.div style={{ y: projectsY }} className="max-w-7xl mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-12 text-center"
          >
            Featured Projects
          </motion.h2>

          <div className="space-y-20">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div
                    className={`${
                      index % 2 === 0 ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className={`h-96 rounded-2xl bg-gradient-to-br ${project.gradient} p-1 relative overflow-hidden`}
                    >
                      <div className="h-full rounded-2xl overflow-hidden relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* 호버 시 나타나는 오버레이 */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("이미지 클릭됨");
                              handleProjectClick(project);
                            }}
                          >
                            <span className="text-white text-2xl pointer-events-none">
                              →
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className={`${
                      index % 2 === 0 ? "md:order-2" : "md:order-1"
                    } space-y-6`}
                  >
                    <div>
                      <h3 className="text-3xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-800 text-sm font-medium"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                            <span className="text-gray-600 dark:text-gray-300 font-medium">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <motion.button
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      className="group/btn flex items-center gap-2 text-lg font-bold cursor-pointer relative z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("버튼 클릭됨");
                        handleProjectClick(project);
                      }}
                    >
                      <span>View Project</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="pointer-events-none"
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 프로젝트 상세 모달 */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default ProjectsSection;
