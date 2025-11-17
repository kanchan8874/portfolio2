import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaLock, FaUnlock } from "react-icons/fa";
import AddProject from "./AddProject";
import api from "../../services/api";
import { resolveProjectImage } from "../../utils/resolveProjectImage";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Simple password authentication (in production, use proper auth)
  const getAdminPassword = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("fallbackAdminPassword");
      if (stored) {
        return stored;
      }
    }
    if (process.env.REACT_APP_ADMIN_PASSWORD) {
      return process.env.REACT_APP_ADMIN_PASSWORD;
    }
    return "kanchan@2025!";
  };

  const ADMIN_PASSWORD = getAdminPassword();

  useEffect(() => {
    // Check if already authenticated (session)
    const authStatus = localStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchProjects();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
      fetchProjects();
    } else {
      alert("Invalid password!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuth");
    setPassword("");
  };

  const fetchProjects = async () => {
    try {
      const data = await api.getProjects();
      const processed = data.map((project) => ({
        ...project,
        image: resolveProjectImage(project.image),
      }));
      setProjects(processed);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    if (!pendingDelete || pendingDelete !== id) {
      setPendingDelete(id);
    }
  };

  const cancelDelete = () => {
    setPendingDelete(null);
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    setIsDeleting(true);
    try {
      await api.deleteProject(pendingDelete);
      setPendingDelete(null);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary-600/30 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-2xl max-w-md w-full"
        >
          <div className="text-center mb-6">
            <FaLock className="mx-auto text-4xl text-primary-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Admin Panel</h2>
            <p className="text-gray-400">Enter password to access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
            <button
              type="submit"
              className="w-full btn-primary py-3"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-card p-6 rounded-2xl mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your portfolio projects
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <FaPlus />
              Add Project
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <FaUnlock />
              Logout
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-4 rounded-xl"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h3 className="font-bold text-lg mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => confirmDelete(project._id)}
                  className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No projects found. Add your first project!
            </p>
          </div>
        )}
        {pendingDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card max-w-md w-full rounded-2xl p-6 md:p-8 text-center"
            >
              <div className="mx-auto mb-4 h-12 w-12 flex items-center justify-center rounded-full bg-red-500/10 text-red-500">
                <FaTrash />
              </div>
              <h3 className="text-2xl font-bold mb-2">Delete Project?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This action cannot be undone. Are you sure you want to permanently remove this project from your portfolio?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white/40 border-t-white animate-spin rounded-full"></span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FaTrash />
                      Yes, delete
                    </>
                  )}
                </button>
                <button
                  onClick={cancelDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 bg-white/10 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-white/20 dark:hover:bg-gray-700/70 transition-all duration-300 text-gray-800 dark:text-gray-200"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {showAddForm && (
        <AddProject
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            setShowAddForm(false);
            fetchProjects();
          }}
        />
      )}
    </div>
  );
};

export default AdminPanel;
