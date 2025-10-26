import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantAPI } from '../services/api';
import './AddRestaurant.css';

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    cuisine: '',
    priceRange: 'ปานกลาง',
    phone: '',
    website: '',
    openingHours: '',
    image: null,
    location: {
      latitude: '',
      longitude: ''
    },
    coordinate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'coordinate') {
      const [lat, lng] = value.split(',').map(v => v.trim());
      setFormData(prev => ({
        ...prev,
        coordinate: value,
        location: {
          latitude: lat ? parseFloat(lat) : '',
          longitude: lng ? parseFloat(lng) : ''
        }
      }));
    } else if (name === 'latitude' || name === 'longitude') {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value ? parseFloat(value) : ''
        }
      }));
    } else if (name === 'image') {
      const file = e.target.files?.[0] || null;
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'location') {
          if (value?.latitude !== '' && value?.latitude !== undefined) {
            fd.append('location.latitude', value.latitude);
          }
          if (value?.longitude !== '' && value?.longitude !== undefined) {
            fd.append('location.longitude', value.longitude);
          }
        } else if (key === 'image') {
          if (value) fd.append('image', value);
        } else if (value !== undefined && value !== null) {
          fd.append(key, value);
        }
      });

      await restaurantAPI.create(fd);
      alert('เพิ่มร้านอาหารเรียบร้อยแล้ว!');
      navigate('/restaurants');
    } catch (err) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการเพิ่มร้านอาหาร');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-restaurant">
      <div className="container">
        <h1>เพิ่มร้านอาหารใหม่</h1>
        
        <form onSubmit={handleSubmit} className="restaurant-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">ชื่อร้านอาหาร *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="ชื่อร้านอาหาร"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cuisine">ประเภทอาหาร *</label>
              <input
                type="text"
                id="cuisine"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                required
                placeholder="เช่น ไทย, จีน, ญี่ปุ่น, อิตาเลียน"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">ที่อยู่ *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="ที่อยู่ร้านอาหาร"
              />
            </div>

            <div className="form-group">
              <label htmlFor="coordinate">พิกัด</label>
              <input
                type="text"
                id="coordinate"
                name="coordinate"
                value={formData.coordinate}
                onChange={handleChange}
                placeholder="เช่น 13.7563,100.5018"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">เบอร์โทรศัพท์</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="เบอร์โทรศัพท์"
              />
            </div>

            <div className="form-group">
              <label htmlFor="priceRange">ช่วงราคา</label>
              <input
                type="text"
                id="priceRange"
                name="priceRange"
                value={formData.priceRange}
                onChange={handleChange}
                placeholder="เช่น 100-300 บาท, ถูก, ปานกลาง, แพง"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">รายละเอียด *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="รายละเอียดร้านอาหาร เมนูแนะนำ ฯลฯ"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="website">เว็บไซต์</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="openingHours">เวลาทำการ</label>
              <input
                type="text"
                id="openingHours"
                name="openingHours"
                value={formData.openingHours}
                onChange={handleChange}
                placeholder="เช่น 10:00-22:00"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="image">รูปภาพ</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/restaurants')}
              className="btn btn-secondary"
              disabled={loading}
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'กำลังเพิ่ม...' : 'เพิ่มร้านอาหาร'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant; 