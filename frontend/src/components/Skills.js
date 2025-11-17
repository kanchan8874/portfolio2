import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaPython,
} from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiExpress, SiNextdotjs, SiTypescript } from "react-icons/si";
import { useInView } from "react-intersection-observer";
import api from "../services/api";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await api.getSkills();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
        // Fallback skills
        setSkills([
          { name: "React.js", icon: "FaReact", color: "#61DAFB", category: "frontend", proficiency: 90 },
          { name: "Node.js", icon: "FaNodeJs", color: "#339933", category: "backend", proficiency: 85 },
          { name: "MongoDB", icon: "SiMongodb", color: "#47A248", category: "database", proficiency: 80 },
          { name: "Express.js", icon: "SiExpress", color: "#000000", category: "backend", proficiency: 85 },
          { name: "JavaScript", icon: "FaJs", color: "#F7DF1E", category: "frontend", proficiency: 91 },
          { name: "HTML5", icon: "FaHtml5", color: "#E34F26", category: "frontend", proficiency: 95 },
          { name: "CSS3", icon: "FaCss3Alt", color: "#1572B6", category: "frontend", proficiency: 90 },
          { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4", category: "frontend", proficiency: 88 },
          { name: "Git & GitHub", icon: "FaGitAlt", color: "#F05032", category: "tools", proficiency: 85 },
          { name: "TypeScript", icon: "SiTypescript", color: "#3178C6", category: "frontend", proficiency: 75 },
          { name: "Next.js", icon: "SiNextdotjs", color: "#000000", category: "frontend", proficiency: 80 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const iconMap = {
    FaReact,
    FaNodeJs,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaGitAlt,
    FaPython,
    SiMongodb,
    SiTailwindcss,
    SiExpress,
    SiNextdotjs,
    SiTypescript,
  };

  const categories = ["all", "frontend", "backend", "database", "tools"];
  
  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const SkillCard = ({ skill, index }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      
      x.set(xPct);
      y.set(yPct);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const IconComponent = iconMap[skill.icon] || FaJs;

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.05, z: 50 }}
        className="tilt-3d glass-card p-6 rounded-2xl flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden"
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Icon */}
        <motion.div
          className="text-6xl mb-4 relative z-10"
          style={{ color: skill.color || "#3b82f6" }}
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <IconComponent />
        </motion.div>
        
        {/* Skill Name */}
        <h3 className="text-lg font-bold text-center mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors relative z-10">
          {skill.name}
        </h3>
        
        {/* Proficiency Bar */}
        {skill.proficiency > 0 && (
          <div className="w-full relative z-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">Proficiency</span>
              <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                {skill.proficiency}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.proficiency}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white/30"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </div>
          </div>
        )}

        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
          style={{ 
            background: `radial-gradient(circle, ${skill.color || '#3b82f6'}40 0%, transparent 70%)` 
          }}
        />
      </motion.div>
    );
  };

  if (loading) {
    return (
      <section id="skills" className="section-container bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary-600/30 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      ref={ref}
      className="section-container bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">My Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto rounded mb-8"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg scale-105"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-md"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </motion.div>

        {filteredSkills.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 dark:text-gray-400 mt-8"
          >
            No skills found in this category.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default Skills;
