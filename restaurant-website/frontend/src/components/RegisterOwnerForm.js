import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './RegisterOwnerForm.css';

const RegisterOwnerForm = ({ onClose, onSwitchToLogin }) => {
  const { register, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    clearError();
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username) {
      errors.username = 'กรุณากรอกชื่อผู้ใช้';
    } else if (formData.username.length < 3) {
      errors.username = 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'ชื่อผู้ใช้ใช้ได้เฉพาะตัวอักษร ตัวเลข และ _';
    }
    
    if (!formData.email) {
      errors.email = 'กรุณากรอกอีเมล';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }
    
    if (!formData.password) {
      errors.password = 'กรุณากรอกรหัสผ่าน';
    } else if (formData.password.length < 6) {
      errors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'รหัสผ่านต้องมีตัวอักษรและตัวเลขอย่างน้อย 1 ตัว';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }
    
    if (formData.firstName && formData.firstName.length > 50) {
      errors.firstName = 'ชื่อต้องไม่เกิน 50 ตัวอักษร';
    }
    
    if (formData.lastName && formData.lastName.length > 50) {
      errors.lastName = 'นามสกุลต้องไม่เกิน 50 ตัวอักษร';
    }

    if (formData.phoneNumber && !/^[0-9]{10}$/.test(formData.phoneNumber.replace(/[-\s]/g, ''))) {
      errors.phoneNumber = 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);
    
    if (result.success) {
      onClose();
    }
  };

  return (
    <div className="register-owner-form-overlay">
      <div className="register-owner-form-container">
        <div className="register-owner-form-header">
          <h2>สมัครเป็นเจ้าของร้าน</h2>
          <p>สร้างบัญชีเจ้าของร้านเพื่อจัดการร้านอาหารของคุณ</p>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="register-owner-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="username">ชื่อผู้ใช้ *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={formErrors.username ? 'error' : ''}
              placeholder="กรอกชื่อผู้ใช้"
            />
            {formErrors.username && (
              <span className="field-error">{formErrors.username}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">อีเมล *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? 'error' : ''}
              placeholder="กรอกอีเมลของคุณ"
            />
            {formErrors.email && (
              <span className="field-error">{formErrors.email}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="firstName">ชื่อ</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={formErrors.firstName ? 'error' : ''}
              placeholder="กรอกชื่อ"
            />
            {formErrors.firstName && (
              <span className="field-error">{formErrors.firstName}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">นามสกุล</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={formErrors.lastName ? 'error' : ''}
              placeholder="กรอกนามสกุล"
            />
            {formErrors.lastName && (
              <span className="field-error">{formErrors.lastName}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">รหัสผ่าน *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={formErrors.password ? 'error' : ''}
              placeholder="กรอกรหัสผ่าน"
            />
            {formErrors.password && (
              <span className="field-error">{formErrors.password}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={formErrors.confirmPassword ? 'error' : ''}
              placeholder="ยืนยันรหัสผ่าน"
            />
            {formErrors.confirmPassword && (
              <span className="field-error">{formErrors.confirmPassword}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={formErrors.phoneNumber ? 'error' : ''}
              placeholder="กรอกเบอร์โทรศัพท์"
            />
            {formErrors.phoneNumber && (
              <span className="field-error">{formErrors.phoneNumber}</span>
            )}
          </div>
          
          <button 
            type="submit" 
            className="register-owner-btn"
            disabled={loading}
          >
            {loading ? 'กำลังสมัครสมาชิก...' : 'สมัครเป็นเจ้าของร้าน'}
          </button>
        </form>
        
        <div className="register-owner-form-footer">
          <p>
            มีบัญชีแล้ว?{' '}
            <button 
              type="button" 
              className="switch-btn"
              onClick={onSwitchToLogin}
            >
              เข้าสู่ระบบ
            </button>
          </p>
          <p>
            หรือ{' '}
            <button 
              type="button" 
              className="switch-btn"
              onClick={() => {/* Switch to general user registration */}}
            >
              สมัครเป็นผู้ใช้ทั่วไป
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterOwnerForm;
