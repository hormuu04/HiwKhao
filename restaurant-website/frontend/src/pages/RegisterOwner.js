import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const RegisterOwner = () => {
  const navigate = useNavigate();
  const { registerOwner } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      setLoading(false);
      return;
    }

    try {
      const result = await registerOwner(formData);
      
      if (result.success) {
        alert('สมัครเป็นเจ้าของร้านเรียบร้อยแล้ว!');
        navigate('/add-restaurant');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>สมัครเป็นเจ้าของร้าน</h1>
          <p>สร้างบัญชีเจ้าของร้านเพื่อจัดการร้านอาหารของคุณ</p>
        </div>
        
        <form onSubmit={handleSubmit} className="register-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">ชื่อผู้ใช้ *</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="กรอกชื่อผู้ใช้"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">อีเมล *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="กรอกอีเมลของคุณ"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">ชื่อ</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="กรอกชื่อ"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">นามสกุล</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="กรอกนามสกุล"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">รหัสผ่าน *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="กรอกรหัสผ่าน"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="ยืนยันรหัสผ่าน"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="กรอกเบอร์โทรศัพท์"
            />
          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading ? 'กำลังสมัคร...' : 'สมัครเป็นเจ้าของร้าน'}
          </button>
        </form>

        <div className="login-link">
          <p>มีบัญชีแล้ว? <Link to="/login">เข้าสู่ระบบ</Link></p>
          <p>หรือ <Link to="/register">สมัครเป็นผู้ใช้ทั่วไป</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterOwner;
