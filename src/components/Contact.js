import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Please fill in all fields.", { position: "top-right" });
      return;
    }

    setIsSending(true);

    emailjs
      .send(
        "service_4uscdbd", // Replace with your EmailJS service ID
        "template_x2kdtku", // Replace with your EmailJS template ID
        {
          from_name: name,
          reply_to: email,
          message: message,
        },
        "r3bwHefMv95_ZVnmd" // Replace with your EmailJS public key
      )
      .then(() => {
        toast.success("Message sent successfully! Refreshing...", { position: "top-right" });
        setFormData({ name: "", email: "", message: "" });
        setIsSending(false);

        setTimeout(() => {
          window.location.reload();
        }, 2000); // Refresh after 2 seconds
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
        toast.error("Failed to send message. Please try again.", { position: "top-right" });
        setIsSending(false);
      });
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 md:px-16"
    >
      <ToastContainer />

      {/* Contact Header */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-4xl font-bold text-center mb-6"
      >
        Get in Touch
      </motion.h2>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="w-full max-w-lg space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="message"
          rows="4"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send Message"}
        </button>
      </motion.form>

      {/* Copyright Section */}
      <div className="mt-12 w-full text-center border-t border-gray-700 pt-6 text-sm text-gray-400">
        © {new Date().getFullYear()} Kanchan Kushwaha. All Rights Reserved.
      </div>
    </section>
  );
};

export default Contact;
