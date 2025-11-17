import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { FaArrowDown, FaGithub, FaLinkedin, FaInstagram, FaDownload } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import api from "../services/api";
import HeroParticles from "./HeroParticles";
import profilePic from "../assets/image.png";
import { resolveProfileImage } from "../utils/resolveProfileImage";

const Home = () => {
  const [aboutData, setAboutData] = useState(null);
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [about, socialsData, heroData] = await Promise.all([
          api.getAbout(),
          api.getSocials(),
          api.getHero(),
        ]);
        setAboutData({
          ...about,
          profileImage: resolveProfileImage(about.profileImage),
          ...heroData, // Merge hero data for CTA buttons
        });
        setSocials(
          socialsData.filter((social) =>
            ["FaLinkedin", "FaGithub", "FaInstagram"].includes(social.icon)
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        // Minimal fallback - let API defaults handle it
        setAboutData({
          name: "",
          title: "",
          tagline: "",
          profileImage: profilePic,
        });
        setSocials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (inView && !loading) {
      // GSAP animations for text
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      );
    }
  }, [inView, loading]);

  const iconMap = {
    FaLinkedin: FaLinkedin,
    FaGithub: FaGithub,
    FaInstagram: FaInstagram,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  if (loading) {
    return (
      <section id="home" className="h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-xl flex items-center gap-3"
        >
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Loading...</span>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Particles Background */}
      <HeroParticles />

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"
        />
        <motion.div 
          style={{ y }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"
        />
        <motion.div 
          style={{ y }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32"
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 text-primary-100 dark:text-primary-300 font-semibold text-sm md:text-base">
                👋 Hi, I'm
              </span>
            </motion.div>

            <motion.h1
              ref={nameRef}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 leading-tight break-words"
              style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
            >
              <span className="block bg-gradient-to-r from-white via-primary-100 to-white bg-clip-text text-transparent">
                {aboutData?.name || "Kanchan Kushwaha"}
              </span>
            </motion.h1>

            <motion.h2
              ref={titleRef}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-primary-100 dark:text-primary-300 mb-6 break-words"
            >
              <span className="bg-gradient-to-r from-primary-200 to-secondary-200 bg-clip-text text-transparent">
                {aboutData?.title || "Full Stack Developer"}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-white/90 dark:text-gray-300 mb-8 max-w-xl leading-relaxed break-words"
            >
              {aboutData?.tagline || "A passionate Full Stack Developer creating seamless, scalable, and user-friendly web applications."}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start mb-8"
            >
              {aboutData?.primaryCTA && (
                <motion.a
                  href={aboutData.primaryCTA.link || "#contact"}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold rounded-xl shadow-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                  aria-label={aboutData.primaryCTA.text || "Get In Touch"}
                >
                  <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                    {aboutData.primaryCTA.text || "Get In Touch"}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      aria-hidden="true"
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              )}
              
              {aboutData?.secondaryCTA && (
                <motion.a
                  href={aboutData.secondaryCTA.link || "#projects"}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 dark:bg-white/5 backdrop-blur-md text-white font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 text-sm sm:text-base"
                  aria-label={aboutData.secondaryCTA.text || "View Projects"}
                >
                  {aboutData.secondaryCTA.text || "View Projects"}
                </motion.a>
              )}

              {aboutData?.resumeLink && aboutData?.showResumeButton !== false && (
                <motion.a
                  href={aboutData.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 dark:bg-white/5 backdrop-blur-md text-white font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
                  aria-label="Download Resume"
                >
                  <FaDownload aria-hidden="true" />
                  Resume
                </motion.a>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex gap-6 justify-center md:justify-start"
            >
              {socials.map((social, index) => {
                const IconComponent = iconMap[social.icon] || FaGithub;
                const isGithub = social.icon === "FaGithub";
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -6 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className={`group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-300 hover:border-transparent shadow-[0_0_12px_rgba(79,70,229,0.15)] ${
                      isGithub ? "hover:shadow-[0_0_20px_rgba(15,23,42,0.4)]" : ""
                    }`}
                    style={{ color: isGithub ? "#0f172a" : social.color || "white" }}
                    aria-label={social.platform}
                  >
                    <div
                      className={`absolute inset-[3px] rounded-full transition-colors duration-300 ${
                        isGithub ? "bg-white group-hover:bg-white/70" : "bg-[#0b132b]/80 group-hover:bg-transparent"
                      }`}
                    />
                    {isGithub && (
                      <div
                        aria-hidden="true"
                        className="absolute -inset-1 rounded-full bg-gradient-to-br from-white/60 via-white/20 to-transparent opacity-40 group-hover:opacity-75 transition-opacity duration-300"
                      />
                    )}
                    <IconComponent
                      className={`relative text-2xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                        isGithub ? "text-[#0f172a]" : ""
                      }`}
                    />
                    <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-2 py-1 text-[10px] uppercase tracking-wide text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {social.platform}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center md:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative group"
            >
              {/* Glowing rings */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-2xl opacity-50 dark:opacity-30 animate-pulse group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full blur-xl opacity-30 dark:opacity-20 animate-pulse animation-delay-2000"></div>
              
              {/* Image container */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity animate-spin-slow"></div>
                <img
                src={aboutData?.profileImage || profilePic}
                alt={`${aboutData?.name || "Kanchan Kushwaha"} profile`}
                className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full object-cover border-4 border-white/30 dark:border-white/20 shadow-2xl ring-4 ring-primary-500/20 dark:ring-primary-500/10"
                loading="eager"
                width="384"
                height="384"
              />
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-lg text-sm font-bold"
              >
                Available
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/80 hover:text-white group focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-2"
            aria-label="Scroll to About section"
          >
            <span className="text-xs sm:text-sm font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <FaArrowDown size={20} className="sm:w-6 sm:h-6" />
            </motion.div>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
