const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');

function ensureUploadsDirExists() {
  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
  } catch (e) {
    // ignore
  }
}

ensureUploadsDirExists();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '');
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${base || 'image'}-${unique}${ext}`);
  }
});

function fileFilter(req, file, cb) {
  const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('รองรับเฉพาะไฟล์ภาพ jpg, jpeg, png, gif, webp'));
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// Middleware ที่รองรับทั้ง JSON และ multipart/form-data
// ถ้าเป็น JSON ให้ข้าม multer (เพราะ express.json() จัดการแล้ว)
// ถ้าเป็น multipart ให้ใช้ multer
const optionalUpload = (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  
  // ถ้าเป็น JSON ให้ข้าม multer เพราะ express.json() จัดการแล้ว
  if (contentType.includes('application/json')) {
    return next();
  }
  
  // ถ้าเป็น multipart/form-data ให้ใช้ multer
  return upload.single('image')(req, res, next);
};

module.exports = { upload, optionalUpload };


