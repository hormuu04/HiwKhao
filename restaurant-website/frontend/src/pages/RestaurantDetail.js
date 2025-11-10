import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { restaurantAPI } from '../services/api';
import Map from '../components/Map';
import './RestaurantDetail.css';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const { user } = useAuth();
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
      setRestaurant(res.data);
      setError('');
    } catch (err) {
      setError('ไม่พบข้อมูลร้านอาหารนี้');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('คุณต้องการลบร้านอาหารนี้ใช่หรือไม่?')) {
      try {
        await restaurantAPI.delete(id);
        alert('ลบร้านอาหารเรียบร้อยแล้ว');
        navigate('/restaurants');
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบ');
      }
    }
  };

  if (loading) return <div className="restaurant-detail"><div className="container">กำลังโหลดข้อมูล...</div></div>;
  if (error) return <div className="restaurant-detail"><div className="container error-message">{error}</div></div>;
  if (!restaurant) return null;

  return (
    <div className="restaurant-detail">
      <div className="container">
        <div className="detail-card">
          <ImageArea restaurant={restaurant} />
          <div className="detail-content">
            <h1>{restaurant.name}</h1>
            <p className="cuisine">ประเภท: {restaurant.cuisine}</p>
            <p className="description">{restaurant.description}</p>
            <p>ที่อยู่: {restaurant.address}</p>
            {restaurant.phone && <p>โทร: {restaurant.phone}</p>}
            {restaurant.website && <p>เว็บไซต์: <a href={restaurant.website} target="_blank" rel="noopener noreferrer">{restaurant.website}</a></p>}
            {restaurant.openingHours && <p>เวลาเปิด-ปิด: {restaurant.openingHours}</p>}
            <p>ช่วงราคา: {restaurant.priceRange}</p>
            <div className="detail-actions">
              {user?.role === 'owner' && (
                <>
                  <Link to={`/edit-restaurant/${restaurant._id}`} className="btn btn-edit">แก้ไข</Link>
                  <button onClick={handleDelete} className="btn btn-delete">ลบ</button>
                </>
              )}
              <Link to="/restaurants" className="btn btn-back">กลับ</Link>
            </div>
          </div>
        </div>
        
        <div className="map-section">
          <h2>ตำแหน่งบนแผนที่</h2>
          <Map location={restaurant.location} name={restaurant.name} />
          {restaurant.location?.latitude && restaurant.location?.longitude && (
            <div style={{ marginTop: '1rem' }}>
              <a
                href={`https://www.google.com/maps?q=${restaurant.location.latitude},${restaurant.location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-googlemap"
              >
                เปิดใน Google Maps
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ImageArea = ({ restaurant }) => {
  const { name, imageUrl, imagePath } = restaurant;
  const currentOrigin = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window.location.origin;
  }, []);

  const currentProtocol = useMemo(() => {
    if (typeof window === 'undefined') return 'https:';
    return window.location.protocol;
  }, []);

  const apiOrigin = useMemo(() => {
    const envUrl = process.env.REACT_APP_API_URL || '';
    if (!envUrl) return currentOrigin;
    try {
      const parsed = new URL(envUrl, currentOrigin || undefined);
      return `${parsed.protocol}//${parsed.host}`;
    } catch (_) {
      return envUrl.replace(/\/api\/?$/, '') || currentOrigin;
    }
  }, [currentOrigin]);

  const normalizeImageSource = useCallback((raw) => {
    if (!raw) return null;
    let trimmed = raw.trim();
    if (!trimmed) return null;

    if (/^data:/i.test(trimmed)) {
      return trimmed;
    }

    if (trimmed.startsWith('//')) {
      return `${currentProtocol === 'https:' ? 'https:' : 'http:'}${trimmed}`;
    }

    if (/^https?:\/\//i.test(trimmed)) {
      try {
        const parsedUrl = new URL(trimmed);
        const needsSecureScheme = currentProtocol === 'https:' && parsedUrl.protocol === 'http:';
        const isLocalhost =
          parsedUrl.hostname === 'localhost' ||
          parsedUrl.hostname === '127.0.0.1' ||
          parsedUrl.hostname === '0.0.0.0';
        const base =
          isLocalhost && apiOrigin
            ? apiOrigin
            : `${needsSecureScheme ? 'https:' : parsedUrl.protocol}//${parsedUrl.host}`;
        const finalUrl = `${base}${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
        return finalUrl;
      } catch (_) {
        if (currentProtocol === 'https:' && trimmed.startsWith('http://')) {
          return trimmed.replace(/^http:\/\//i, 'https://');
        }
        return trimmed;
      }
    }

    if (trimmed.startsWith('/')) {
      if (apiOrigin) {
        return `${apiOrigin}${trimmed}`;
      }
      return `${currentOrigin}${trimmed}`;
    }

    if (apiOrigin) {
      return `${apiOrigin}/uploads/${trimmed}`;
    }

    return `${currentOrigin}/uploads/${trimmed}`;
  }, [apiOrigin, currentOrigin, currentProtocol]);

  const images = useMemo(() => {
    if (imagePath) {
      const normalized = normalizeImageSource(imagePath);
      return normalized ? [normalized] : [];
    }

    if (!imageUrl) return [];

    return imageUrl
      .split(',')
      .map((u) => normalizeImageSource(u))
      .filter((u) => !!u);
  }, [imagePath, imageUrl, normalizeImageSource]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Reset index when images change
    setIndex(0);
  }, [imageUrl, imagePath]);

  if (!images.length) {
    return (
      <div className="detail-image">
        <div className="placeholder-image">🍽️</div>
      </div>
    );
  }

  const goPrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="detail-image">
      <div className="image-carousel">
        <img key={images[index]} src={images[index]} alt={name} className="carousel-img" />
        {images.length > 1 && (
          <>
            <button type="button" className="carousel-btn prev" onClick={goPrev} aria-label="Previous image">‹</button>
            <button type="button" className="carousel-btn next" onClick={goNext} aria-label="Next image">›</button>
            <div className="carousel-dots">
              {images.map((_, i) => (
                <span key={i} className={`dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail; 