import axios from 'axios';

// Resolve API base URL with priority:
// 1) Explicit env REACT_APP_API_URL (recommended for prod/preview)
// 2) localhost default for dev
// 3) Production fallback (HTTPS)
const resolvedEnv = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.trim();

function ensureApiSuffix(urlString) {
  try {
    const base = new URL(urlString, typeof window !== 'undefined' ? window.location.origin : undefined);
    // Ensure pathname ends with /api
    const path = base.pathname.replace(/\/+$/, '');
    const normalizedPath = path.endsWith('/api') ? path : `${path}/api`;
    return `${base.protocol}//${base.host}${normalizedPath}`;
  } catch {
    // Fallback string ops
    const trimmed = (urlString || '').replace(/\/+$/, '');
    return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
  }
}

const API_BASE_URL = resolvedEnv
  ? ensureApiSuffix(resolvedEnv)
  : (window.location.hostname === 'localhost'
      ? 'http://localhost:5000/api'
      : 'https://hiwkhao.onrender.com/api');

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

// Handle 401 errors - clear token if unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      try {
        localStorage.removeItem('token');
      } catch (_) {
        // ignore storage errors
      }
    }
    return Promise.reject(error);
  }
);

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