# ⚡ Quick Start Guide - Development

## 🔧 การตั้งค่าเบื้องต้น

### 1. ติดตั้ง Dependencies

```bash
# ติดตั้ง Backend
cd restaurant-website/backend
npm install

# ติดตั้ง Frontend
cd ../frontend
npm install
```

### 2. ตั้งค่า Environment Variables

#### Backend (`backend/config.env`)
ไฟล์นี้มีอยู่แล้ว แต่ต้องเพิ่ม:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurantdb
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
FRONTEND_URL=http://localhost:3000
```

#### Frontend (สร้างไฟล์ `.env` ใน `frontend/`)
สร้างไฟล์ใหม่ชื่อ `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**หมายเหตุ:** Frontend ใช้ไฟล์ `.env` ไม่ใช่ `config.env`

### 3. ติดตั้ง MongoDB (Local)

**Option 1: MongoDB Community Server**
- ดาวน์โหลด: https://www.mongodb.com/try/download/community
- ติดตั้งและรันที่ port 27017 (default)

**Option 2: MongoDB Compass**
- ใช้สำหรับดู database ผ่าน GUI
- เชื่อมต่อที่: `mongodb://localhost:27017`

**Option 3: ใช้ MongoDB Atlas (Online)**
- ดูวิธีใน `DEPLOYMENT_GUIDE.md` ส่วนที่ 2
- เปลี่ยน `MONGODB_URI` ใน `config.env`

### 4. เริ่มต้นใช้งาน

#### รัน Backend
```bash
cd restaurant-website/backend
npm start
# หรือ npm run dev (ใช้ nodemon)
```

เปิดเบราว์เซอร์: http://localhost:5000
ควรเห็น: `{"message": "Welcome to Restaurant API"}`

#### รัน Frontend
```bash
cd restaurant-website/frontend
npm start
```

เปิดเบราว์เซอร์: http://localhost:3000

### 5. Seed ข้อมูลตัวอย่าง (Optional)
```bash
cd restaurant-website/backend
npm run seed
```

---

## 📁 โครงสร้างโปรเจค

```
restaurant-website/
├── backend/
│   ├── config.env          # Environment variables
│   ├── server.js           # Express server
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth, upload, etc.
│   └── uploads/            # อัพโหลดรูปภาพ
│
├── frontend/
│   ├── .env                # Environment variables (ต้องสร้างเอง)
│   ├── public/
│   └── src/
│       ├── components/     # React components
│       ├── pages/          # Pages
│       ├── services/       # API calls
│       └── context/        # Auth context
│
├── DEPLOYMENT_GUIDE.md     # คู่มือ Deploy
└── QUICK_START.md          # ไฟล์นี้
```

---

## 🚀 พร้อม Deploy?

อ่านคู่มือฉบับเต็มที่: **`DEPLOYMENT_GUIDE.md`**

---

## ❓ Troubleshooting

### Backend ไม่สามารถเชื่อมต่อ MongoDB
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**วิธีแก้:** ตรวจสอบว่า MongoDB รันอยู่หรือไม่
```bash
# Windows
services.msc -> ค้นหา MongoDB -> Start

# หรือใช้ MongoDB Atlas แทน
```

### Frontend ไม่สามารถเรียก API
```
Network Error / CORS Error
```
**วิธีแก้:**
1. ตรวจสอบ Backend รันอยู่ที่ port 5000
2. ตรวจสอบ `.env` มี `REACT_APP_API_URL=http://localhost:5000/api`
3. Restart frontend (Ctrl+C แล้ว npm start ใหม่)

### Environment Variables ไม่ทำงาน
**Frontend:**
- ต้องขึ้นต้นด้วย `REACT_APP_`
- ต้อง restart server ทุกครั้งที่แก้ไข

**Backend:**
- ชื่อไฟล์ต้องเป็น `config.env` (ไม่ใช่ `.env`)
- ใช้ `require('dotenv').config()` ในโค้ด

---

## 📞 ต้องการความช่วยเหลือ?

1. ตรวจสอบ Console ใน Browser (F12)
2. ดู Terminal logs ของ Backend
3. อ่าน `DEPLOYMENT_GUIDE.md` สำหรับรายละเอียดเพิ่มเติม

