const API_BASE_URL = process.env.REACT_APP_API_URL ||  "https://portfolio2-11.onrender.com";

class ApiService {
  // Get auth token from localStorage
  getAuthToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminToken');
    }
    return null;
  }

  // Set auth token
  setAuthToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminToken', token);
    }
  }

  // Remove auth token
  removeAuthToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
    }
  }

  async fetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getAuthToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // If unauthorized, clear token
      if (response.status === 401) {
        this.removeAuthToken();
        throw new Error('Unauthorized - Please login again');
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Auth methods
  async adminLogin(password) {
    const response = await this.fetch('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    
    if (response.token) {
      this.setAuthToken(response.token);
    }
    
    return response;
  }

  async verifyToken() {
    try {
      return await this.fetch('/auth/admin/verify');
    } catch (error) {
      this.removeAuthToken();
      return { valid: false };
    }
  }

  logout() {
    this.removeAuthToken();
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

  async createSkill(data) {
    return this.fetch('/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSkill(id, data) {
    return this.fetch(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSkill(id) {
    return this.fetch(`/skills/${id}`, {
      method: 'DELETE',
    });
  }

  // About
  async getAbout() {
    return this.fetch('/about');
  }

  // Socials
  async getSocials() {
    return this.fetch('/socials');
  }

  async createSocial(data) {
    return this.fetch('/socials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSocial(id, data) {
    return this.fetch(`/socials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSocial(id) {
    return this.fetch(`/socials/${id}`, {
      method: 'DELETE',
    });
  }

  // Testimonials
  async getTestimonials() {
    return this.fetch('/testimonials');
  }

  async getFeaturedTestimonials() {
    return this.fetch('/testimonials/featured');
  }

  async createTestimonial(data) {
    return this.fetch('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTestimonial(id, data) {
    return this.fetch(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTestimonial(id) {
    return this.fetch(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact
  async sendContactMessage(data) {
    return this.fetch('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Hero Section
  async getHero() {
    return this.fetch('/hero');
  }

  async updateHero(data) {
    return this.fetch('/hero', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Contact Info
  async getContactInfo() {
    return this.fetch('/contact-info');
  }

  async updateContactInfo(data) {
    return this.fetch('/contact-info', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // About (update method)
  async updateAbout(data) {
    return this.fetch('/about', {
      method: 'PUT',
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

