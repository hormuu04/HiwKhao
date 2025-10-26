# 🚀 คู่มือการ Deploy แอปพลิเคชันร้านอาหาร

## สารบัญ
1. [เตรียมความพร้อม](#1-เตรียมความพร้อม)
2. [Deploy Database (MongoDB Atlas)](#2-deploy-database-mongodb-atlas)
3. [Deploy Backend (Render)](#3-deploy-backend-render)
4. [Deploy Frontend (Vercel)](#4-deploy-frontend-vercel)
5. [ทางเลือกอื่นๆ](#5-ทางเลือกอื่นๆ)

---

## 1. เตรียมความพร้อม

### ✅ สิ่งที่ต้องมี:
- [x] บัญชี GitHub (สำหรับ push code)
- [x] บัญชี MongoDB Atlas (ฟรี) - https://www.mongodb.com/cloud/atlas
- [x] บัญชี Render (ฟรี) - https://render.com
- [x] บัญชี Vercel (ฟรี) - https://vercel.com

### 📝 Push โค้ดขึ้น GitHub

```bash
# ใน folder PROJECTHIW/restaurant-website
git init
git add .
git commit -m "Initial commit - Restaurant website"
git branch -M main

# สร้าง repository ใหม่ที่ GitHub แล้ว copy URL มา
git remote add origin https://github.com/YOUR_USERNAME/restaurant-website.git
git push -u origin main
```

---

## 2. Deploy Database (MongoDB Atlas)

### ขั้นตอนที่ 1: สร้าง Cluster
1. ไปที่ https://www.mongodb.com/cloud/atlas
2. สมัครสมาชิก/Login
3. คลิก **"Build a Database"**
4. เลือก **"M0 FREE"** (Shared)
5. เลือก Region ที่ใกล้ที่สุด (เช่น Singapore)
6. ตั้งชื่อ Cluster: `restaurant-cluster`
7. คลิก **"Create"**

### ขั้นตอนที่ 2: สร้าง Database User
1. ไปที่ **Database Access**
2. คลิก **"Add New Database User"**
3. เลือก **Password Authentication**
4. ตั้ง Username: `restaurant_admin`
5. ตั้ง Password: `สร้างรหัสผ่านที่แข็งแรง` (เก็บไว้)
6. Database User Privileges: **"Read and write to any database"**
7. คลิก **"Add User"**

### ขั้นตอนที่ 3: ตั้งค่า Network Access
1. ไปที่ **Network Access**
2. คลิก **"Add IP Address"**
3. คลิก **"Allow Access from Anywhere"** (0.0.0.0/0)
4. คลิก **"Confirm"**

### ขั้นตอนที่ 4: ดึง Connection String
1. กลับไปที่ **Database**
2. คลิกปุ่ม **"Connect"** ที่ Cluster
3. เลือก **"Drivers"**
4. Copy Connection String:
```
mongodb+srv://restaurant_admin:<password>@restaurant-cluster.xxxxx.mongodb.net/restaurantdb?retryWrites=true&w=majority
```
5. **แทนที่ `<password>`** ด้วยรหัสผ่านจริง
6. เพิ่ม `/restaurantdb` หลัง `.net` (ชื่อ database)

---

## 3. Deploy Backend (Render)

### ขั้นตอนที่ 1: เตรียมไฟล์
Backend พร้อม deploy แล้ว! ✅

### ขั้นตอนที่ 2: Deploy บน Render
1. ไปที่ https://render.com
2. Login ด้วย GitHub
3. คลิก **"New +"** → **"Web Service"**
4. เชื่อมต่อ GitHub repository: `restaurant-website`
5. ตั้งค่าดังนี้:

```
Name: restaurant-api
Region: Singapore (หรือใกล้ที่สุด)
Branch: main
Root Directory: restaurant-website/backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### ขั้นตอนที่ 3: ตั้งค่า Environment Variables
ใน Render Dashboard → Environment Variables เพิ่ม:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://restaurant_admin:YOUR_PASSWORD@restaurant-cluster.xxxxx.mongodb.net/restaurantdb?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_change_this_to_random_string_12345
```

**สำคัญ:** แทนที่ `YOUR_PASSWORD` ด้วยรหัสผ่าน MongoDB Atlas จริง

### ขั้นตอนที่ 4: Deploy
1. คลิก **"Create Web Service"**
2. รอสักครู่จนสถานะเป็น **"Live"**
3. เก็บ URL ของ Backend: `https://restaurant-api-xxxx.onrender.com`

### ขั้นตอนที่ 5: ทดสอบ Backend
เปิดเบราว์เซอร์ไปที่:
```
https://restaurant-api-xxxx.onrender.com/
```
ถ้าเห็น `{"message": "Welcome to Restaurant API"}` แสดงว่าสำเร็จ! ✅

---

## 4. Deploy Frontend (Vercel)

### ขั้นตอนที่ 1: อัพเดต API URL
ไฟล์ถูกแก้ไขให้อ่านจาก environment variable แล้ว ✅

### ขั้นตอนที่ 2: Deploy บน Vercel
1. ไปที่ https://vercel.com
2. Login ด้วย GitHub
3. คลิก **"Add New Project"**
4. เลือก repository: `restaurant-website`
5. ตั้งค่าดังนี้:

```
Framework Preset: Create React App
Root Directory: restaurant-website/frontend
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### ขั้นตอนที่ 3: ตั้งค่า Environment Variables
เพิ่ม Environment Variable:

```
REACT_APP_API_URL=https://restaurant-api-xxxx.onrender.com/api
```

**แทนที่** URL ด้วย Backend URL จริงของคุณ

### ขั้นตอนที่ 4: Deploy
1. คลิก **"Deploy"**
2. รอจน deployment สำเร็จ
3. คุณจะได้ URL: `https://restaurant-website-xxxx.vercel.app`

### ขั้นตอนที่ 5: อัพเดต CORS บน Backend
1. กลับไปที่ Render Dashboard
2. เพิ่ม Environment Variable:
```
FRONTEND_URL=https://restaurant-website-xxxx.vercel.app
```
3. Deploy ใหม่อีกครั้ง

---

## 5. ทางเลือกอื่นๆ

### Backend Alternatives:
- **Railway** (https://railway.app) - ใช้งานง่าย, ฟรี $5/เดือน
- **Heroku** (https://heroku.com) - ต้องเสียค่าใช้จ่าย
- **DigitalOcean App Platform** - สำหรับโปรเจคใหญ่

### Frontend Alternatives:
- **Netlify** (https://netlify.com)
  ```bash
  # Install Netlify CLI
  npm install -g netlify-cli
  
  # Deploy
  cd restaurant-website/frontend
  npm run build
  netlify deploy --prod --dir=build
  ```

- **GitHub Pages** (ฟรี แต่ไม่รองรับ routing ดีนัก)

---

## 📋 Checklist หลัง Deploy

- [ ] ทดสอบ Login/Register
- [ ] ทดสอบ เพิ่ม/แก้ไข/ลบร้านอาหาร
- [ ] ทดสอบ Upload รูปภาพ
- [ ] ทดสอบ ค้นหาและกรองร้านอาหาร
- [ ] ตรวจสอบ Console ว่าไม่มี Error
- [ ] ตรวจสอบ HTTPS ทำงานปกติ

---

## 🔧 Troubleshooting

### ปัญหา: CORS Error
**วิธีแก้:**
1. ตรวจสอบว่าตั้งค่า `FRONTEND_URL` ใน Backend ถูกต้อง
2. อัพเดต `backend/server.js`:
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));
```

### ปัญหา: Backend ตอบกลับช้า (Cold Start)
**คำอธิบาย:** Render Free Tier จะ sleep หลัง 15 นาทีไม่มีใช้งาน
**วิธีแก้:**
- อัพเกรดเป็น Paid Plan
- ใช้ Uptime monitoring service (เช่น UptimeRobot)

### ปัญหา: ไม่สามารถ Upload รูปได้
**วิธีแก้:**
- ใช้ Cloudinary หรือ AWS S3 แทนการเก็บไฟล์ใน server
- Render จะลบไฟล์ที่ upload เมื่อ redeploy

### ปัญหา: Environment Variables ไม่ทำงาน
**วิธีแก้:**
1. ตรวจสอบว่าชื่อตัวแปรถูกต้อง (Frontend ต้องขึ้นต้นด้วย `REACT_APP_`)
2. Redeploy หลังจากเปลี่ยน env vars
3. ล้าง cache: Settings → Clear Cache and Redeploy

---

## 🎉 เสร็จสิ้น!

ตอนนี้แอปพลิเคชันของคุณพร้อมใช้งานบนอินเทอร์เน็ตแล้ว!

**URLs สำคัญ:**
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-api.onrender.com`
- MongoDB: MongoDB Atlas

**Tips:**
- ติดตาม logs ใน Render/Vercel Dashboard
- ตั้งค่า custom domain ได้ฟรีใน Vercel
- Backup database เป็นประจำ
- Monitor uptime และ performance

---

## 📞 ติดปัญหา?
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com

