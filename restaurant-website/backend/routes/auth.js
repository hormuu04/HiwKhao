const express = require('express');
const { body } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { register, registerOwner, login, getProfile, updateProfile, upgradeToOwner } = require('../controllers/authController');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('ชื่อผู้ใช้ต้องมี 3-20 ตัวอักษร')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('ชื่อผู้ใช้ใช้ได้เฉพาะตัวอักษร ตัวเลข และ _'),
  
  body('email')
    .isEmail()
    .withMessage('กรุณากรอกอีเมลที่ถูกต้อง')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)/)
    .withMessage('รหัสผ่านต้องมีตัวอักษรและตัวเลขอย่างน้อย 1 ตัว'),
  
  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('ชื่อต้องไม่เกิน 50 ตัวอักษร'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('นามสกุลต้องไม่เกิน 50 ตัวอักษร')
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('กรุณากรอกอีเมลที่ถูกต้อง')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('กรุณากรอกรหัสผ่าน')
];

const updateProfileValidation = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('ชื่อต้องไม่เกิน 50 ตัวอักษร'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('นามสกุลต้องไม่เกิน 50 ตัวอักษร'),
  
  body('phone')
    .optional()
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage('เบอร์โทรศัพท์ต้องมี 10-15 หลัก')
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('เบอร์โทรศัพท์ไม่ถูกต้อง')
];

// Public routes
router.post('/register', registerValidation, register);
router.post('/register-owner', registerValidation, registerOwner);
router.post('/login', loginValidation, login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfileValidation, updateProfile);

// Self-service: upgrade to owner
router.post('/upgrade-to-owner', authenticateToken, upgradeToOwner);

module.exports = router;
