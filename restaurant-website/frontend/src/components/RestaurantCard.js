import React from 'react';
import { Link } from 'react-router-dom';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
  const { _id, name, address, description, cuisine, priceRange, imageUrl, imagePath } = restaurant;
  
  // Get API base URL using same logic as api.js
  const getApiBaseUrl = React.useMemo(() => {
    const resolvedEnv = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.trim();
    
    function ensureApiSuffix(urlString) {
      try {
        const base = new URL(urlString, typeof window !== 'undefined' ? window.location.origin : undefined);
        const path = base.pathname.replace(/\/+$/, '');
        const normalizedPath = path.endsWith('/api') ? path : `${path}/api`;
        return `${base.protocol}//${base.host}${normalizedPath}`;
      } catch {
        const trimmed = (urlString || '').replace(/\/+$/, '');
        return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
      }
    }
    
    return resolvedEnv
      ? ensureApiSuffix(resolvedEnv)
      : (window.location.hostname === 'localhost'
          ? 'http://localhost:5000/api'
          : 'https://hiwkhao.onrender.com/api');
  }, []);

  // Get API origin (without /api) for serving static files
  const apiOrigin = React.useMemo(() => {
    try {
      const url = new URL(getApiBaseUrl);
      return `${url.protocol}//${url.host}`;
    } catch {
      return window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : 'https://hiwkhao.onrender.com';
    }
  }, [getApiBaseUrl]);

  // Normalize image URL - handle both relative paths and absolute URLs
  // Priority: imagePath > imageUrl
  const coverImage = React.useMemo(() => {
    let imageSrc = null;
    
    // ถ้ามี imagePath ให้ใช้ imagePath ก่อน (ไฟล์อัปโหลด)
    if (imagePath) {
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        // Full URL - ใช้โดยตรง (แต่ถ้าเป็น localhost ให้ replace)
        if (imagePath.includes('localhost:5000')) {
          imageSrc = imagePath.replace(/http:\/\/localhost:5000/g, apiOrigin);
          imageSrc = imageSrc.replace(/https:\/\/localhost:5000/g, apiOrigin);
        } else {
          imageSrc = imagePath;
        }
      } else if (imagePath.startsWith('/')) {
        // Relative path - prepend API origin
        imageSrc = `${apiOrigin}${imagePath}`;
      } else {
        // Just filename - prepend /uploads/
        imageSrc = `${apiOrigin}/uploads/${imagePath}`;
      }
    } 
    // ถ้าไม่มี imagePath แต่มี imageUrl ให้ใช้ imageUrl
    else if (imageUrl) {
      // Handle imageUrl (อาจเป็น comma-separated หรือ URL เดียว)
      const url = typeof imageUrl === 'string' ? imageUrl.split(',')[0].trim() : '';
      
      if (!url) {
        return '';
      }
      
      // ถ้าเป็น URL แบบเต็ม (http:// หรือ https://) ให้ใช้โดยตรง
      if (url.startsWith('http://') || url.startsWith('https://')) {
        imageSrc = url;
      } 
      // ถ้าเป็น data URI (base64) ให้ใช้โดยตรง
      else if (url.startsWith('data:')) {
        imageSrc = url;
      }
      // ถ้าเป็น relative path ที่เริ่มด้วย /
      else if (url.startsWith('/')) {
        imageSrc = `${apiOrigin}${url}`;
      }
      // ถ้าเป็น path ที่เริ่มด้วย uploads/
      else if (url.startsWith('uploads/')) {
        imageSrc = `${apiOrigin}/${url}`;
      }
      // ถ้าเป็นแค่ filename ให้ใส่ /uploads/
      else {
        imageSrc = `${apiOrigin}/uploads/${url}`;
      }
    }
    
    return imageSrc || '';
  }, [imagePath, imageUrl, apiOrigin]);

  const getPriceRangeText = (range) => {
    switch (range) {
      case 'ถูก': return '💰';
      case 'ปานกลาง': return '💰💰';
      case 'แพง': return '💰💰💰';
      default: return '💰💰';
    }
  };

  return (
    <div className="restaurant-card">
      <div className="restaurant-image">
        {coverImage ? (
          <img 
            src={coverImage} 
            alt={name}
            onError={(e) => {
              // ถ้ารูปไม่โหลดได้ ให้แสดง placeholder
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className="placeholder-image" 
          style={{ display: coverImage ? 'none' : 'flex' }}
        >
          🍽️
        </div>
      </div>
      <div className="restaurant-content">
        <h3 className="restaurant-name">{name}</h3>
        <p className="restaurant-cuisine">{cuisine}</p>
        <p className="restaurant-description">{description}</p>
        <p className="restaurant-address">📍 {address}</p>
        <div className="restaurant-meta">
          <span className="restaurant-price">{getPriceRangeText(priceRange)}</span>
        </div>
        <Link to={`/restaurant/${_id}`} className="view-details-btn">
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard; 