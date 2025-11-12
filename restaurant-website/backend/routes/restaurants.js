const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middleware/auth');
const { upload, optionalUpload } = require('../middleware/upload');
const {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getCuisines,
  getMyRestaurants
} = require('../controllers/restaurantController');

// Public routes (ไม่ต้องเข้าสู่ระบบ)
// GET /api/restaurants - Get all restaurants
router.get('/', getAllRestaurants);

// GET /api/restaurants/cuisines - Get all cuisines
router.get('/cuisines', getCuisines);

// GET /api/restaurants/mine - Get restaurants for current owner
router.get('/mine', authenticateToken, requireRole('owner'), getMyRestaurants);

// GET /api/restaurants/:id - Get single restaurant
router.get('/:id', getRestaurant);

// Protected routes (ต้องเข้าสู่ระบบเท่านั้น)
// POST /api/restaurants - Create new restaurant (owner only)
// รองรับทั้ง JSON (imageUrl) และ multipart/form-data (ไฟล์อัปโหลด)
router.post('/', authenticateToken, requireRole('owner'), optionalUpload, createRestaurant);

// PUT /api/restaurants/:id - Update restaurant (owner only)
// รองรับทั้ง JSON (imageUrl) และ multipart/form-data (ไฟล์อัปโหลด)
router.put('/:id', authenticateToken, requireRole('owner'), optionalUpload, updateRestaurant);

// DELETE /api/restaurants/:id - Delete restaurant (owner only)
router.delete('/:id', authenticateToken, requireRole('owner'), deleteRestaurant);

module.exports = router; 