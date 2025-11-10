import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      // Fetch profile to hydrate user from token
      const res = await authAPI.getProfile();
      if (res?.data?.success) {
        setUser(res.data.data.user);
      }
      setLoading(false);
    } catch (error) {
      // If 401, token is invalid - clear it and continue without user
      if (error.response?.status === 401) {
        try {
          localStorage.removeItem('token');
        } catch (_) {
          // ignore storage errors
        }
        setUser(null);
      }
      // Don't log 401 errors as they're expected when no valid token exists
      if (error.response?.status !== 401) {
        console.error('Auth check error:', error);
      }
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.login(email, password);
      
      if (response.data.success) {
        const { user } = response.data.data;
        
        // Store user data
        setUser(user);
        
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.register(userData);
      
      if (response.data.success) {
        const { user } = response.data.data;
        
        // Store user data
        setUser(user);
        
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const registerOwner = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.registerOwner(userData);
      
      if (response.data.success) {
        const { user } = response.data.data;
        
        // Store user data
        setUser(user);
        
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'เกิดข้อผิดพลาดในการสมัครเป็นเจ้าของร้าน';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
    } catch (_) {}
    setUser(null);
    setError(null);
  };

  const updateProfile = async (profileData) => {
    try {
      setError(null);
      
      const response = await authAPI.updateProfile(profileData);
      
      if (response.data.success) {
        setUser(response.data.data.user);
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล';
      setError(message);
      return { success: false, message };
    }
  };

  const clearError = () => {
    setError(null);
  };

  const upgradeToOwner = async () => {
    try {
      const response = await authAPI.upgradeToOwner();
      if (response.data.success) {
        setUser(response.data.data.user);
        return { success: true, message: response.data.message };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'อัปเกรดสิทธิ์ไม่สำเร็จ';
      return { success: false, message };
    }
  };

  const value = {
    user,
    loading,
    error,
    role: user?.role || 'user',
    login,
    register,
    registerOwner,
    logout,
    updateProfile,
    upgradeToOwner,
    clearError,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
