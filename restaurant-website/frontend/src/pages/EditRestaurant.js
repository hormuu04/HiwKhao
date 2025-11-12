import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restaurantAPI } from '../services/api';
import './AddRestaurant.css';

const EditRestaurant = () => {
  const { id } = useParams();
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
    imageUrl: '',
    location: { latitude: '', longitude: '' },
    coordinate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRestaurant();
    // eslint-disable-next-line
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      setLoading(true);
      const res = await restaurantAPI.getById(id);
      const data = res.data;
      if (!data.location) {
        data.location = { latitude: '', longitude: '' };
      }
      data.coordinate = (data.location.latitude && data.location.longitude)
        ? `${data.location.latitude},${data.location.longitude}`
        : '';
      setFormData(data);
      setError('');
    } catch (err) {
      setError('ไม่พบข้อมูลร้านอาหารนี้');
    } finally {
      setLoading(false);
    }
  };

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
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // สร้างข้อมูลที่ส่งไป โดยลบ coordinate ออก (ไม่ต้องส่ง)
      const updateData = { ...formData };
      delete updateData.coordinate;
      
      // แปลง location object ให้ถูกต้อง
      if (updateData.location && (updateData.location.latitude === '' || updateData.location.longitude === '')) {
        // ถ้าไม่มี latitude หรือ longitude ให้ลบ location ออก
        delete updateData.location;
      } else if (updateData.location && updateData.location.latitude && updateData.location.longitude) {
        // แปลงเป็น number
        updateData.location = {
          latitude: parseFloat(updateData.location.latitude),
          longitude: parseFloat(updateData.location.longitude)
        };
      }
      
      await restaurantAPI.update(id, updateData);
      alert('แก้ไขข้อมูลร้านอาหารเรียบร้อยแล้ว!');
      navigate(`/restaurant/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="add-restaurant"><div className="container">กำลังโหลดข้อมูล...</div></div>;
  if (error) return <div className="add-restaurant"><div className="container error-message">{error}</div></div>;

  return (
    <div className="add-restaurant">
      <div className="container">
        <h1>แก้ไขข้อมูลร้านอาหาร</h1>
        <form onSubmit={handleSubmit} className="restaurant-form">
          {error && (
            <div className="error-message">{error}</div>
          )}
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">ชื่อร้านอาหาร *</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="ชื่อร้านอาหาร" />
            </div>
            <div className="form-group">
              <label htmlFor="cuisine">ประเภทอาหาร *</label>
              <input type="text" id="cuisine" name="cuisine" value={formData.cuisine} onChange={handleChange} required placeholder="เช่น ไทย, จีน, ญี่ปุ่น, อิตาเลียน" />
            </div>
            <div className="form-group">
              <label htmlFor="address">ที่อยู่ *</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required placeholder="ที่อยู่ร้านอาหาร" />
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
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="เบอร์โทรศัพท์" />
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
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} required placeholder="รายละเอียดร้านอาหาร เมนูแนะนำ ฯลฯ" rows="4" />
            </div>
            <div className="form-group">
              <label htmlFor="website">เว็บไซต์</label>
              <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} placeholder="https://example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="openingHours">เวลาทำการ</label>
              <input type="text" id="openingHours" name="openingHours" value={formData.openingHours} onChange={handleChange} placeholder="เช่น 10:00-22:00" />
            </div>
            <div className="form-group full-width">
              <label htmlFor="imageUrl">URL รูปภาพ</label>
              <input type="url" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => navigate(`/restaurant/${id}`)} className="btn btn-secondary" disabled={loading}>ยกเลิก</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRestaurant; 