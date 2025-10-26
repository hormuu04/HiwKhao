# 🍽️ เว็บไซต์แนะนำร้านอาหาร

โปรเจคเว็บไซต์แนะนำร้านอาหารที่สร้างด้วย MERN Stack (MongoDB, Express.js, React.js, Node.js)

## 📚 คู่มือ

### Development
- **[QUICK_START.md](QUICK_START.md)** - เริ่มต้นใช้งานแบบเร็ว (รัน Local)

### Deployment
- **[DEPLOY_README.md](DEPLOY_README.md)** - 🎯 เริ่มต้นที่นี่! (เลือกคู่มือที่เหมาะกับคุณ)
- **[DEPLOY_QUICK.md](DEPLOY_QUICK.md)** - ⚡ Deploy แบบรวดเร็ว (15 นาที)
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - 📖 คู่มือ Deploy แบบละเอียด
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - ✅ Checklist สำหรับ Deploy
- **[DEPLOY_PLATFORMS.md](DEPLOY_PLATFORMS.md)** - 📊 เปรียบเทียบ Platform

## ✨ ฟีเจอร์

### สำหรับผู้ใช้ทั่วไป:
- **หน้าหลัก**: แสดงอาหารยอดฮิตและข้อมูลเว็บไซต์
- **รายการร้านอาหาร**: แสดงร้านอาหารทั้งหมดพร้อมระบบค้นหาและกรอง
- **ค้นหาอัจฉริยะ**: ค้นหาตามชื่อร้าน (รองรับ debounce เพื่อประสบการณ์ที่ดีขึ้น)
- **กรองข้อมูล**: กรองตามประเภทอาหาร, ช่วงราคา
- **ดูรายละเอียด**: ดูข้อมูลร้านอาหาร, เมนู, ราคา, เวลาเปิด-ปิด, แผนที่
- **แผนที่**: ดูตำแหน่งร้านอาหารบนแผนที่ (Leaflet)

### สำหรับเจ้าของร้าน (Owner):
- **สมัครสมาชิก**: ระบบ Authentication พร้อม JWT
- **เพิ่มร้านอาหาร**: กรอกฟอร์มเพื่อเพิ่มร้านอาหารใหม่
- **อัพโหลดรูปภาพ**: อัพโหลดรูปร้านอาหาร
- **แก้ไข/ลบ**: จัดการร้านอาหารของตัวเอง
- **Protected Routes**: ระบบป้องกันการเข้าถึงหน้าที่ไม่มีสิทธิ์

### ทางเทคนิค:
- **Responsive Design**: รองรับการใช้งานบนมือถือและแท็บเล็ต
- **RESTful API**: Backend API มาตรฐาน
- **JWT Authentication**: ระบบ Authentication ที่ปลอดภัย
- **Image Upload**: รองรับการอัพโหลดรูปภาพ

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **React.js 19** - UI Framework
- **React Router v7** - Navigation
- **React Context** - State Management (Authentication)
- **Axios** - HTTP Client
- **Leaflet** - Interactive Maps
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File Upload
- **bcryptjs** - Password Hashing
- **CORS** - Cross-Origin Resource Sharing

## 📁 โครงสร้างโปรเจค

```
restaurant-website/
├── backend/                 # Backend API
│   ├── controllers/         # Business Logic
│   ├── models/             # Database Models
│   ├── routes/             # API Routes
│   ├── server.js           # Server Entry Point
│   └── package.json
├── frontend/               # React Frontend
│   ├── public/             # Static Files
│   ├── src/
│   │   ├── components/     # Reusable Components
│   │   ├── pages/          # Page Components
│   │   ├── services/       # API Services
│   │   └── utils/          # Utility Functions
│   └── package.json
├── package.json            # Root Package
└── README.md
```

## 🚀 การติดตั้งและรัน

### ข้อกำหนดเบื้องต้น
- Node.js (v14 หรือสูงกว่า)
- MongoDB (local หรือ MongoDB Atlas)
- npm หรือ yarn

### ขั้นตอนการติดตั้ง

1. **Clone โปรเจค**
```bash
git clone <repository-url>
cd restaurant-website
```

2. **ติดตั้ง Dependencies ทั้งหมด**
```bash
npm run install-all
```

3. **ตั้งค่า Environment Variables**

**Backend** (`backend/config.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurantdb
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
FRONTEND_URL=http://localhost:3000
```

**Frontend** (สร้างไฟล์ `frontend/.env`):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. **รัน MongoDB**
```bash
# ถ้าใช้ MongoDB local
mongod

# หรือใช้ MongoDB Atlas (แนะนำ)
```

5. **รันโปรเจค**
```bash
# รันทั้ง Backend และ Frontend พร้อมกัน
npm start

# หรือรันแยกกัน
npm run server    # Backend ที่ port 5000
npm run client    # Frontend ที่ port 3000
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - สมัครสมาชิก (User)
- `POST /api/auth/register-owner` - สมัครสมาชิก (Owner)
- `POST /api/auth/login` - เข้าสู่ระบบ
- `GET /api/auth/me` - ดึงข้อมูลผู้ใช้ปัจจุบัน (ต้อง Login)

### Restaurants
- `GET /api/restaurants` - ดึงรายการร้านอาหารทั้งหมด
- `GET /api/restaurants/:id` - ดึงข้อมูลร้านอาหารตาม ID
- `POST /api/restaurants` - เพิ่มร้านอาหารใหม่ (ต้อง Login เป็น Owner)
- `PUT /api/restaurants/:id` - อัปเดตข้อมูลร้านอาหาร (เจ้าของร้านเท่านั้น)
- `DELETE /api/restaurants/:id` - ลบร้านอาหาร (เจ้าของร้านเท่านั้น)
- `GET /api/restaurants/cuisines` - ดึงประเภทอาหารทั้งหมด

### Query Parameters
- `search` - ค้นหาตามชื่อหรือคำอธิบาย
- `cuisine` - กรองตามประเภทอาหาร
- `priceRange` - กรองตามช่วงราคา (ถูก, ปานกลาง, แพง)
- `rating` - กรองตามคะแนนขั้นต่ำ

## 🔧 การพัฒนา

### Backend Development
```bash
cd backend
npm run dev  # รันด้วย nodemon
```

### Frontend Development
```bash
cd frontend
npm start    # รัน development server
```

### Build สำหรับ Production
```bash
npm run build  # Build frontend
```

## 📱 การใช้งาน

### สำหรับผู้ใช้ทั่วไป:
1. **หน้าแรก**: ดูอาหารยอดฮิตและข้อมูลเว็บไซต์
2. **ร้านอาหาร**: ดูรายการร้านอาหารทั้งหมด
3. **ค้นหาและกรอง**: ใช้ฟิลเตอร์เพื่อหาร้านอาหารที่ต้องการ
4. **ดูรายละเอียด**: คลิกที่การ์ดร้านเพื่อดูข้อมูลเพิ่มเติม

### สำหรับเจ้าของร้าน:
1. **สมัครสมาชิก**: คลิก "สมัครสมาชิก" → "สมัครสำหรับเจ้าของร้าน"
2. **เข้าสู่ระบบ**: ใช้ Email และ Password
3. **เพิ่มร้านอาหาร**: คลิก "เพิ่มร้านอาหาร" และกรอกข้อมูล
4. **จัดการร้าน**: แก้ไขหรือลบร้านของคุณได้

## 🚀 Deploy to Production

ต้องการ deploy แอปพลิเคชันนี้? อ่านคู่มือโดยละเอียดที่:
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - คู่มือทีละขั้นตอน
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Checklist ครบถ้วน

### Quick Deploy Options:
- **Backend**: Render, Railway, Heroku
- **Frontend**: Vercel, Netlify
- **Database**: MongoDB Atlas (Free Tier)

## 🐛 Bug Fixes

### เวอร์ชัน 1.1.0
- ✅ แก้ไขปัญหาการค้นหาที่พิมพ์ไม่ได้ครบตัวอักษร (ใช้ debounce)
- ✅ เพิ่ม Environment Variables สำหรับ Production
- ✅ ปรับปรุง CORS configuration
- ✅ เพิ่มคู่มือ Deployment

## 🔮 Features ที่วางแผนไว้

- [ ] ระบบรีวิวและให้คะแนนร้านอาหาร
- [ ] ระบบโปรดร้านอาหาร (Favorites)
- [ ] การแจ้งเตือน (Notifications)
- [ ] ค้นหาร้านใกล้ฉัน (Geolocation)
- [ ] ระบบแชทกับเจ้าของร้าน
- [ ] Dark Mode

## 📄 License

MIT License - ใช้งานได้ฟรี

## 👨‍💻 Author

สร้างด้วย ❤️ โดย [Amarin ratarasarn]

## 🙏 Acknowledgments

- React Team
- MongoDB Team
- Leaflet Contributors
- All Open Source Contributors
