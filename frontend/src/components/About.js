import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaDownload } from "react-icons/fa";
import api from "../services/api";
import profilePic from "../assets/image.png";
import { resolveProfileImage } from "../utils/resolveProfileImage";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await api.getAbout();
        setAboutData({
          ...data,
          profileImage: resolveProfileImage(data.profileImage),
        });
      } catch (error) {
        console.error("Error fetching about data:", error);
        // Minimal fallback - let API defaults handle it
        setAboutData({
          name: "",
          title: "",
          bio: "",
          email: "",
          location: "",
          degree: "",
          freelance: "",
          highlights: [],
          profileImage: profilePic,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const skills = [
    { skill: "Reactjs/Expressjs", percent: 90 },
    { skill: "HTML/CSS/Javascript", percent: 91 },
    { skill: "Nextjs/Mongodb", percent: 80 },
    { skill: "Nodejs/Typescript", percent: 85 },
    { skill: "Agentic AI & Prompt Engineering", percent: 82 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <section id="about" className="section-container bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary-600/30 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      ref={ref}
      className="section-container bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200/20 dark:bg-secondary-900/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold text-sm mb-4"
          >
            About Me
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 break-words">
            <span className="gradient-text">Who I Am</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto rounded"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left Column - Bio */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="glass-card p-8 rounded-2xl">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 break-words"
              >
                I'm {aboutData?.name} and I'm a{" "}
                <span className="text-primary-600 dark:text-primary-400">
                  {aboutData?.title || "Web Developer"}
                </span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 break-words"
              >
                {aboutData?.bio || "A passionate developer..."}
              </motion.p>
              
              {aboutData?.highlights && aboutData.highlights.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3 mb-6"
                >
                  {aboutData.highlights.map((highlight, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <motion.span
                        className="text-primary-600 dark:text-primary-400 mt-1 text-xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      >
                        ⮕
                      </motion.span>
                      <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>

            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6 rounded-xl"
            >
              <ul className="space-y-3">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700"
                >
                  <span className="font-semibold">Email:</span>
                  <a
                    href={`mailto:${aboutData?.email || ""}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {aboutData?.email || "N/A"}
                  </a>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700"
                >
                  <span className="font-semibold">Freelance:</span>
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">
                    {aboutData?.freelance || "Available"}
                  </span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700"
                >
                  <span className="font-semibold">Degree:</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {aboutData?.degree || "N/A"}
                  </span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                  className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700"
                >
                  <span className="font-semibold">Location:</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {aboutData?.location || "N/A"}
                  </span>
                </motion.li>
                {aboutData?.resume && (
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.0 }}
                    className="flex justify-between items-center py-2"
                  >
                    <span className="font-semibold">Resume:</span>
                    <a
                      href={aboutData.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                    >
                      <FaDownload size={14} />
                      Download
                    </a>
                  </motion.li>
                )}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 btn-primary text-center"
                >
                  Hire Me
                </motion.a>
                {aboutData?.resume && (
                  <motion.a
                    href={aboutData.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-secondary-600 to-primary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 text-center flex items-center justify-center gap-2"
                  >
                    <FaDownload />
                    Download Resume
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Skills Progress */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-6"
            >
              Skills & Expertise
            </motion.h3>
            {skills.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {item.skill}
                  </span>
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">
                    {item.percent}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percent}%` }}
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
              </motion.div>
            ))}

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
