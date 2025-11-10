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
  const coverImage = React.useMemo(() => {
    let imageSrc = null;
    
    if (imagePath) {
      // If imagePath is a full URL, check if it's localhost and replace it
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        // Replace localhost:5000 with production API origin
        imageSrc = imagePath.replace(/http:\/\/localhost:5000/g, apiOrigin);
        imageSrc = imageSrc.replace(/https:\/\/localhost:5000/g, apiOrigin);
      } else if (imagePath.startsWith('/')) {
        // Relative path - prepend API origin
        imageSrc = `${apiOrigin}${imagePath}`;
      } else {
        // Just filename - prepend /uploads/
        imageSrc = `${apiOrigin}/uploads/${imagePath}`;
      }
    } else if (imageUrl) {
      // Handle imageUrl (comma-separated)
      const firstUrl = imageUrl.split(',')[0].trim();
      if (firstUrl.startsWith('http://') || firstUrl.startsWith('https://')) {
        // Replace localhost:5000 with production API origin
        imageSrc = firstUrl.replace(/http:\/\/localhost:5000/g, apiOrigin);
        imageSrc = imageSrc.replace(/https:\/\/localhost:5000/g, apiOrigin);
      } else if (firstUrl.startsWith('/')) {
        // Relative path - prepend API origin
        imageSrc = `${apiOrigin}${firstUrl}`;
      } else if (firstUrl.startsWith('data:')) {
        // Data URI - use as-is
        imageSrc = firstUrl;
      } else {
        // Assume it's a filename or relative path
        imageSrc = firstUrl.startsWith('uploads/') 
          ? `${apiOrigin}/${firstUrl}`
          : `${apiOrigin}/uploads/${firstUrl}`;
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
          <img src={coverImage} alt={name} />
        ) : (
          <div className="placeholder-image">🍽️</div>
        )}
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