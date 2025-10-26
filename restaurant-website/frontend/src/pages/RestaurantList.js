import React, { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import { restaurantAPI } from '../services/api';
import './RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    priceRange: ''
  });
  const [cuisines, setCuisines] = useState([]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        search: searchInput
      }));
    }, 500); // รอ 500ms หลังจากผู้ใช้หยุดพิมพ์

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    fetchRestaurants();
  }, [filters]);

  useEffect(() => {
    fetchCuisines();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await restaurantAPI.getAll(filters);
      setRestaurants(response.data);
      setError(null);
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCuisines = async () => {
    try {
      const response = await restaurantAPI.getCuisines();
      setCuisines(response.data);
    } catch (err) {
      console.error('Error fetching cuisines:', err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'search') {
      setSearchInput(value);
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const clearFilters = () => {
    setSearchInput('');
    setFilters({
      search: '',
      cuisine: '',
      priceRange: ''
    });
  };

  if (loading) {
    return (
      <div className="restaurant-list">
        <div className="container">
          <div className="loading">กำลังโหลดข้อมูล...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-list">
      <div className="container">
        <h1>ร้านอาหารทั้งหมด</h1>
        
        {/* Filters */}
        <div className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <label>ค้นหา:</label>
              <input
                type="text"
                name="search"
                value={searchInput}
                onChange={handleFilterChange}
                placeholder="ค้นหาร้านอาหาร..."
              />
            </div>
            
            <div className="filter-group">
              <label>ประเภทอาหาร:</label>
              <select name="cuisine" value={filters.cuisine} onChange={handleFilterChange}>
                <option value="">ทั้งหมด</option>
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>ช่วงราคา:</label>
              <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
                <option value="">ทั้งหมด</option>
                <option value="ถูก">ถูก</option>
                <option value="ปานกลาง">ปานกลาง</option>
                <option value="แพง">แพง</option>
              </select>
            </div>
          </div>
          
          <button onClick={clearFilters} className="clear-filters-btn">
            ล้างตัวกรอง
          </button>
        </div>

        {/* Results */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {restaurants.length === 0 && !loading && !error && (
          <div className="no-results">
            <p>ไม่พบร้านอาหารที่ตรงกับเงื่อนไขการค้นหา</p>
          </div>
        )}

        <div className="restaurants-grid">
          {restaurants.map(restaurant => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantList; 