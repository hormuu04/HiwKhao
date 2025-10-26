import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Check role if required
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <h2>🚫 ไม่มีสิทธิ์เข้าถึง</h2>
          <p>คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
          <button 
            onClick={() => window.history.back()}
            className="btn btn-primary"
          >
            กลับ
          </button>
        </div>
      </div>
    );
  }

  // User is authenticated and has required role
  return children;
};

export default ProtectedRoute;
