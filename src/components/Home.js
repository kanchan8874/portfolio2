import React from "react";
import { motion } from "framer-motion";
import profilePic from "../assets/image.png";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

const Home = () => {
  return (
    <section
      id="home"
      className="h-screen bg-gradient-to-r from-blue-950 to-purple-700 text-white flex flex-col md:flex-row items-center justify-center px-6 md:px-16 relative"
    >
      {/* Introduction Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        className="text-center md:text-left md:w-1/2 mt-12 md:mt-0"
      >
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Hi, I'm Kanchan kushwaha
        </h1>

        {/* Short Description */}
        <p className="text-base md:text-lg lg:text-xl mt-4 leading-relaxed">
          A passionate Full Stack Developer creating seamless, scalable, and
          user-friendly web applications.
        </p>

        {/* Additional Content (Visible only on large screens) */}
        <div className="hidden lg:block mt-6 md:mt-8 text-sm md:text-base lg:text-lg">
          <p>
            I specialize in building responsive and efficient web applications
            tailored to user needs. Let’s collaborate to create impactful
            digital solutions!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
          <motion.a
            href="#contact"
            className="bg-blue-600 font-semibold text-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
          >
            Contact Me
          </motion.a>
          <motion.a
            href="/resume.pdf"
            download
            className="bg-gray-200 text-blue-800 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-lg shadow-lg hover:bg-gray-300 transition-transform transform font-semibold hover:scale-105"
            whileHover={{ scale: 1.1 }}
          >
            Download Resume
          </motion.a>
        </div>

        {/* Social Media Links (Visible only on large screens) */}
        <div className="hidden lg:flex mt-8 space-x-6">
          <a
            href="https://www.linkedin.com/in/kanchan-kushwaha-09476325a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-blue-300 hover:text-white transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/k_o_m_a_l_l_l/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-pink-500 hover:text-white transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com/ritishkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-400 hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.facebook.com/ritish.kumar.98434"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-blue-500 hover:text-white transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://x.com/ritish_kum1804"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-blue-400 hover:text-white transition"
          >
            <FaTwitter />
          </a>
        </div>
      </motion.div>

      {/* Profile Picture Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="md:w-1/2 flex flex-col items-center mt-8 md:mt-0 relative"
      >
        <img
          src={profilePic}
          alt="Profile of Kanchan Kushwaha"
          loading="lazy"
          className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-white shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
        />
      </motion.div>
    </section>
  );
};

export default Home;
