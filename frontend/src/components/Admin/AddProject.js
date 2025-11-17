import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSave, FaTimes, FaImage, FaLink, FaCode, FaTags } from "react-icons/fa";
import api from "../../services/api";

const AddProject = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    image: "",
    techStack: "",
    category: "web",
    liveLink: "",
    githubLink: "",
    featured: false,
    order: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert techStack string to array
      const projectData = {
        ...formData,
        techStack: formData.techStack
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech.length > 0),
      };

      await api.createProject(projectData);
      toast.success("Project successfully added! 🎉", {
        position: "top-right",
        theme: "dark",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        longDescription: "",
        image: "",
        techStack: "",
        category: "web",
        liveLink: "",
        githubLink: "",
        featured: false,
        order: 0,
      });

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project. Please try again.", {
        position: "top-right",
        theme: "dark",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold gradient-text">Add New Project</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., E-commerce Platform"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Short Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Brief description of your project"
            />
          </div>

          {/* Long Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Detailed Description (Optional)
            </label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Detailed description of features, technologies used, etc."
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <FaImage /> Project Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg or /assets/project.jpg"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <FaTags /> Tech Stack (comma separated) *
            </label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="React, Node.js, MongoDB, Express"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate technologies with commas
            </p>
          </div>

          {/* Category & Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="desktop">Desktop</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Display Order
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <FaLink /> Live Demo URL
              </label>
              <input
                type="url"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://your-project.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <FaCode /> GitHub URL
              </label>
              <input
                type="url"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <label className="text-sm font-semibold">
              Mark as Featured Project
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Adding...
                </>
              ) : (
                <>
                  <FaSave />
                  Add Project
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProject;





