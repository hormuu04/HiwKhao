import React from 'react';
import { Link } from 'react-router-dom';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
  const { _id, name, address, description, cuisine, priceRange, imageUrl, imagePath } = restaurant;
  const apiBase = process.env.REACT_APP_API_URL || '';
  // Derive an origin for static files by stripping trailing /api if present
  const assetBase = React.useMemo(() => {
    if (!apiBase) return '';
    try {
      const url = new URL(apiBase, typeof window !== 'undefined' ? window.location.origin : undefined);
      const path = url.pathname.replace(/\/+$/, '');
      const withoutApi = path.endsWith('/api') ? path.slice(0, -4) : path;
      return `${url.protocol}//${url.host}${withoutApi}`;
    } catch {
      return apiBase.replace(/\/api\/?$/, '');
    }
  }, [apiBase]);

  const coverImage = imagePath
    ? `${assetBase}${imagePath}`
    : (imageUrl ? imageUrl.split(',')[0].trim() : '');

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