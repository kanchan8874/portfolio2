import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPaperPlane, FaUser, FaEnvelope, FaComment } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import api from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});
  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.", {
        position: "top-right",
        theme: "dark",
      });
      return;
    }

    setIsSending(true);

    try {
      await api.sendContactMessage(formData);
      toast.success("Message sent successfully! 🎉 I'll get back to you soon.", {
        position: "top-right",
        theme: "dark",
        autoClose: 3000,
      });
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again or contact me directly.", {
        position: "top-right",
        theme: "dark",
      });
    } finally {
      setIsSending(false);
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-container bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      <ToastContainer />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-50"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-40 right-10 w-72 h-72 bg-secondary-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-50"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-50"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary-500/20 text-primary-300 font-semibold text-sm mb-4"
          >
            Get In Touch
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </h2>
          <p className="text-gray-300 text-lg mb-4">
            Have a project in mind? I'd love to hear from you!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto rounded"></div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10 rounded-2xl space-y-6"
        >
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-2 text-gray-200 flex items-center gap-2"
            >
              <FaUser size={14} />
              Your Name
            </label>
            <motion.input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variants={inputVariants}
              whileFocus="focus"
              className={`w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border ${
                errors.name
                  ? "border-red-500"
                  : "border-white/20 dark:border-gray-700/30"
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
              placeholder="John Doe"
              required
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-red-400 text-sm"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-2 text-gray-200 flex items-center gap-2"
            >
              <FaEnvelope size={14} />
              Your Email
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variants={inputVariants}
              whileFocus="focus"
              className={`w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border ${
                errors.email
                  ? "border-red-500"
                  : "border-white/20 dark:border-gray-700/30"
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
              placeholder="john@example.com"
              required
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-red-400 text-sm"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Message Input */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold mb-2 text-gray-200 flex items-center gap-2"
            >
              <FaComment size={14} />
              Your Message
            </label>
            <motion.textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              variants={inputVariants}
              whileFocus="focus"
              className={`w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border ${
                errors.message
                  ? "border-red-500"
                  : "border-white/20 dark:border-gray-700/30"
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none`}
              placeholder="Tell me about your project, ideas, or just say hello..."
              required
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-red-400 text-sm"
              >
                {errors.message}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSending}
            className="w-full btn-primary py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSending ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                Sending...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Send Message
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center text-gray-400 text-sm"
        >
          <p>
            Or reach out directly at{" "}
            <a
              href="mailto:kanchankushwaha65520@gmail.com"
              className="text-primary-400 hover:text-primary-300 underline"
            >
              kanchankushwaha65520@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
