import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaShareAlt } from "react-icons/fa";
import api from "../../services/api";

const ManageSocials = ({ onClose }) => {
  const [socials, setSocials] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSocial, setEditingSocial] = useState(null);
  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    icon: "",
    color: "#3b82f6",
    order: 0,
    active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    fetchSocials();
  }, []);

  const fetchSocials = async () => {
    try {
      const data = await api.getSocials();
      setSocials(data);
    } catch (error) {
      console.error("Error fetching socials:", error);
      toast.error("Failed to load social links");
    } finally {
      setLoading(false);
    }
  };

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
      if (editingSocial) {
        await api.updateSocial(editingSocial._id, formData);
        toast.success("Social link updated successfully! 🎉");
      } else {
        await api.createSocial(formData);
        toast.success("Social link added successfully! 🎉");
      }
      setShowAddForm(false);
      setEditingSocial(null);
      resetForm();
      fetchSocials();
    } catch (error) {
      console.error("Error saving social:", error);
      toast.error("Failed to save social link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (social) => {
    setEditingSocial(social);
    setFormData({
      platform: social.platform || "",
      url: social.url || "",
      icon: social.icon || "",
      color: social.color || "#3b82f6",
      order: social.order || 0,
      active: social.active !== false,
    });
    setShowAddForm(true);
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await api.deleteSocial(pendingDelete);
      toast.success("Social link deleted successfully! 🎉");
      setPendingDelete(null);
      fetchSocials();
    } catch (error) {
      console.error("Error deleting social:", error);
      toast.error("Failed to delete social link");
    }
  };

  const resetForm = () => {
    setFormData({
      platform: "",
      url: "",
      icon: "",
      color: "#3b82f6",
      order: 0,
      active: true,
    });
    setEditingSocial(null);
  };

  const handleClose = () => {
    setShowAddForm(false);
    resetForm();
    if (onClose) onClose();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold gradient-text flex items-center gap-2">
            <FaShareAlt />
            Manage Social Links
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                resetForm();
                setShowAddForm(true);
              }}
              className="btn-primary flex items-center gap-2"
            >
              <FaPlus />
              Add Social
            </button>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {showAddForm ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Platform *</label>
                <input
                  type="text"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  required
                  placeholder="e.g., LinkedIn, GitHub"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Icon (e.g., FaLinkedin)</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">URL *</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Color</label>
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 rounded"
              />
              <label className="text-sm font-semibold">Active</label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
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
                    {editingSocial ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>
                    <FaSave />
                    {editingSocial ? "Update Social" : "Add Social"}
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socials.map((social) => (
                <motion.div
                  key={social._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-4 rounded-xl"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">{social.platform}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{social.url}</p>
                      <span className={`text-xs px-2 py-1 rounded ${social.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {social.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(social)}
                        className="p-1 text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => setPendingDelete(social._id)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {socials.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No social links found. Add your first social link!</p>
              </div>
            )}
          </div>
        )}

        {pendingDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card max-w-md w-full rounded-2xl p-6 text-center"
            >
              <h3 className="text-2xl font-bold mb-2">Delete Social Link?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setPendingDelete(null)}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageSocials;

