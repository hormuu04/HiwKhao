import axios from 'axios';

// Force production URL based on hostname (Updated: 2025-10-26)
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'
  : 'https://hiwkhao.onrender.com/api';

// Debug logs
console.log('=== API Configuration ===');
console.log('🔍 API_BASE_URL:', API_BASE_URL);
console.log('🔍 Current Hostname:', window.location.hostname);
console.log('🔍 REACT_APP_API_URL from env:', process.env.REACT_APP_API_URL);
console.log('========================');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization header from localStorage on every request
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // If sending FormData, let the browser set the multipart boundary
    if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
      if (config.headers && config.headers['Content-Type']) {
        delete config.headers['Content-Type'];
      }
    }
  } catch (_) {
    // ignore storage errors
  }
  return config;
});

// Restaurant API calls
export const restaurantAPI = {
  // Get all restaurants with optional filters
  getAll: (params = {}) => api.get('/restaurants', { params }),
  
  // Get single restaurant
  getById: (id) => api.get(`/restaurants/${id}`),
  
  // Create new restaurant
  create: (data) => api.post('/restaurants', data),
  
  // Update restaurant
  update: (id, data) => api.put(`/restaurants/${id}`, data),
  
  // Delete restaurant
  delete: (id) => api.delete(`/restaurants/${id}`),
  
  // Get all cuisines
  getCuisines: () => api.get('/restaurants/cuisines'),
};

export default api; 