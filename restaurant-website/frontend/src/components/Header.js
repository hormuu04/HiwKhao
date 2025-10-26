import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';
// import logo from '../logo.svg';

const Header = () => {
  const { user, logout, isAuthenticated, role, upgradeToOwner } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="https://res.cloudinary.com/dke9vufkq/image/upload/Red_Black_Simple_Illustration_Restaurant_Logo_tfyq5d" alt="Restaurant Logo" className="logo-img" />
        </Link>
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>หน้าแรก</NavLink>
          <NavLink to="/restaurants" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>ร้านอาหาร</NavLink>
          {role === 'owner' && (
            <NavLink to="/add-restaurant" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>เพิ่มร้านอาหาร</NavLink>
          )}
        </nav>
        <div className="auth-section">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="welcome-text">สวัสดี, {user?.username}</span>
              <button onClick={handleLogout} className="logout-btn">
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">
                เข้าสู่ระบบ
              </Link>
              <Link to="/register" className="register-btn">
                สมัครสมาชิก
              </Link>
              <Link to="/register-owner" className="register-btn">
                สมัครเป็นเจ้าของร้าน
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 