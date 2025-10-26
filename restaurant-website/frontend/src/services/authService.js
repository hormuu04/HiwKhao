import axios from 'axios';

// Force production URL based on hostname (Same as api.js)
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'
  : 'https://hiwkhao.onrender.com/api';

// Debug log
console.log('🔐 Auth API_BASE_URL:', API_BASE_URL);

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API calls
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const res = await api.post('/auth/register', userData);
    // Save token for subsequent requests
    if (res?.data?.success && res?.data?.data?.token) {
      localStorage.setItem('token', res.data.data.token);
    }
    return res;
  },
  
  // Register new owner
  registerOwner: async (userData) => {
    const res = await api.post('/auth/register-owner', userData);
    if (res?.data?.success && res?.data?.data?.token) {
      localStorage.setItem('token', res.data.data.token);
    }
    return res;
  },
  
  // Login user
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res?.data?.success && res?.data?.data?.token) {
      localStorage.setItem('token', res.data.data.token);
    }
    return res;
  },
  
  // Get user profile
  getProfile: () => api.get('/auth/profile'),
  
  // Update user profile
  updateProfile: (profileData) => api.put('/auth/profile', profileData),

  // Upgrade to owner role
  upgradeToOwner: () => api.post('/auth/upgrade-to-owner'),
};

export default api;
