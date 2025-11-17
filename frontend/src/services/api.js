const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  async fetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Projects
  async getProjects() {
    return this.fetch('/projects');
  }

  async getFeaturedProjects() {
    return this.fetch('/projects/featured');
  }

  async getProject(id) {
    return this.fetch(`/projects/${id}`);
  }

  async createProject(data) {
    return this.fetch('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id, data) {
    return this.fetch(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id) {
    return this.fetch(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Skills
  async getSkills() {
    return this.fetch('/skills');
  }

  async getSkillsByCategory(category) {
    return this.fetch(`/skills/category/${category}`);
  }

  // About
  async getAbout() {
    return this.fetch('/about');
  }

  // Socials
  async getSocials() {
    return this.fetch('/socials');
  }

  // Testimonials
  async getTestimonials() {
    return this.fetch('/testimonials');
  }

  async getFeaturedTestimonials() {
    return this.fetch('/testimonials/featured');
  }

  // Contact
  async sendContactMessage(data) {
    return this.fetch('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Health check
  async healthCheck() {
    return this.fetch('/health');
  }
}

const api = new ApiService();

export default api;

