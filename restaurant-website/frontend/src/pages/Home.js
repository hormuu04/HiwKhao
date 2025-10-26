import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>ค้นหาร้านอาหารที่คุณชอบ</h1>
          <p>ค้นพบร้านอาหารอร่อยๆ ใกล้คุณ </p>
          <div className="hero-buttons">
            <Link to="/restaurants" className="btn btn-primary">
              ดูร้านอาหารทั้งหมด
            </Link>
            <Link to="/add-restaurant" className="btn btn-secondary">
              เพิ่มร้านอาหาร
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2>อาหารยอดฮิตที่คุณไม่ควรพลาด</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img src="https://res.cloudinary.com/dke9vufkq/image/upload/v1751699671/286da9bfea4a41e8a337cb7e695e13ad_w108cj.jpg" alt="ราเมง" />
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src="https://res.cloudinary.com/dke9vufkq/image/upload/v1751699874/7e480d119b8349baa1bf905bb7284ba4_ge2otn.webp" alt="ข้าวหน้าเป็ด" />
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src="https://res.cloudinary.com/dke9vufkq/image/upload/v1751700011/unnamed_1_c4thev.webp" alt="โจ๊ก" />
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src="https://res.cloudinary.com/dke9vufkq/image/upload/v1751700208/6fbd0c70f84d44c9934ec23448afae59_eimduj.webp" alt="เครื่องดื่ม" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <h2>วันนี้กินอะไรดี?</h2>
          <Link to="/restaurants" className="btn btn-primary btn-large">
            เริ่มต้นค้นหา
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 