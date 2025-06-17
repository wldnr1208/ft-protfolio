import React from "react";
import { motion, MotionValue } from "framer-motion";

// Project 타입 정의
export interface Project {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  gradient: string;
}

// ProjectsSection Props
export interface ProjectsSectionProps {
  projectsRef: React.RefObject<HTMLElement | null>;
  projectsY: MotionValue<number>;
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projectsRef,
  projectsY,
  setIsHovering,
  projects,
}) => {
  return (
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
              key={index}
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
                  className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className={`h-96 rounded-2xl bg-gradient-to-br ${project.gradient} p-8 flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full bg-white"
                          style={{
                            width: `${100 + i * 50}px`,
                            height: `${100 + i * 50}px`,
                            left: "50%",
                            top: "50%",
                            translateX: "-50%",
                            translateY: "-50%",
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                          }}
                          transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </div>

                    <div className="relative z-10 text-white text-center">
                      <h3 className="text-3xl font-bold mb-4">
                        {project.title}
                      </h3>
                      <p className="text-lg opacity-90">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className={`${
                    index % 2 === 0 ? "md:order-2" : "md:order-1"
                  } space-y-6`}
                >
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
                    className="group/btn flex items-center gap-2 text-lg font-bold"
                  >
                    <span>View Project</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
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
  );
};

export default ProjectsSection;
