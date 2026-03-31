"use client";
import React, { useState } from "react";
import { motion, MotionValue } from "framer-motion";
import ProjectDetailModal from "./ProjectDetailModal";

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
  androidLink?: string;
  year: string;
  role: string;
  category: "company" | "personal";
}

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
  const [activeTab, setActiveTab] = useState<"company" | "personal">("company");

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const filteredProjects = projects.filter(
    (project) => project.category === activeTab
  );

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
            viewport={{ once: false }}
            className="text-5xl md:text-7xl font-black mb-12 text-center text-gray-900 dark:text-white transition-colors duration-300 text-inherit"
          >
            Featured Projects
          </motion.h2>

          {/* 탭 메뉴 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="flex justify-center gap-4 mb-16"
          >
            <button
              onClick={() => setActiveTab("company")}
              className={`px-8 py-3 rounded-lg font-semibold text-base transition-all duration-200 ${
                activeTab === "company"
                  ? isDarkMode
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              회사 프로젝트
            </button>
            <button
              onClick={() => setActiveTab("personal")}
              className={`px-8 py-3 rounded-lg font-semibold text-base transition-all duration-200 ${
                activeTab === "personal"
                  ? isDarkMode
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              개인 프로젝트
            </button>
          </motion.div>

          <div className="space-y-20">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: false, margin: "-100px" }}
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
                      <div className="h-full rounded-2xl overflow-hidden relative bg-white">
                        <img
                          src={project.image}
                          alt={project.title}
                          className={`w-full h-full cursor-pointer relative z-10 ${
                            project.id === 2 || project.id === 3
                              ? "object-contain p-8"
                              : "object-cover"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project);
                          }}
                        />

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer z-20"
                            onClick={(e) => {
                              e.stopPropagation();
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
                      <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white transition-colors duration-300 text-inherit">
                        {project.title}
                      </h3>
                      <p className="text-base md:text-lg text-gray-700 dark:text-gray-100 transition-colors duration-300 text-inherit">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-800 dark:text-gray-200 transition-colors duration-300 text-inherit">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-800 dark:text-gray-200 transition-colors duration-300 text-inherit">
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
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-inherit" />
                            <span className="font-medium text-gray-700 dark:text-gray-100 transition-colors duration-300 text-inherit">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <motion.button
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      className="group/btn flex items-center gap-2 text-lg font-bold cursor-pointer relative z-10 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300 text-inherit"
                      onClick={(e) => {
                        e.stopPropagation();
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
