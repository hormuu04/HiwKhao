# ✅ Deployment Checklist

## เตรียมความพร้อมก่อน Deploy

### 1️⃣ สมัครบัญชีที่จำเป็น
- [ ] GitHub Account
- [ ] MongoDB Atlas Account (https://www.mongodb.com/cloud/atlas)
- [ ] Render Account (https://render.com)
- [ ] Vercel Account (https://vercel.com)

### 2️⃣ Push Code ขึ้น GitHub
```bash
cd restaurant-website
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/restaurant-website.git
git push -u origin main
```

---

## 🗄️ Database Setup (MongoDB Atlas)

### ขั้นตอนการตั้งค่า:
- [ ] สร้าง Free Cluster (M0)
- [ ] เลือก Region: Singapore (ใกล้ไทยที่สุด)
- [ ] สร้าง Database User
  - Username: `restaurant_admin`
  - Password: (บันทึกไว้)
  - Privileges: Read and write to any database
- [ ] ตั้งค่า Network Access: Allow from Anywhere (0.0.0.0/0)
- [ ] Copy Connection String:
  ```
  mongodb+srv://restaurant_admin:<password>@cluster.xxxxx.mongodb.net/restaurantdb?retryWrites=true&w=majority
  ```
- [ ] แทนที่ `<password>` ด้วยรหัสผ่านจริง
- [ ] บันทึก Connection String ไว้

**Connection String สำหรับใช้:**
```
___________________________________________________________________________
```

---

## 🔧 Backend Deployment (Render)

### ตั้งค่าใน Render:
- [ ] เชื่อม GitHub Repository
- [ ] ตั้งค่า Web Service:
  ```
  Name: restaurant-api
  Region: Singapore
  Branch: main
  Root Directory: restaurant-website/backend
  Runtime: Node
  Build Command: npm install
  Start Command: npm start
  Instance Type: Free
  ```

### Environment Variables:
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `5000`
- [ ] `MONGODB_URI` = (Connection String จาก MongoDB Atlas)
- [ ] `JWT_SECRET` = (สุ่ม string ยาวๆ เช่น `mySecretJWT123456789!@#$%`)
- [ ] (รอ frontend URL ก่อน) `FRONTEND_URL` = 

### Deploy & Test:
- [ ] คลิก "Create Web Service"
- [ ] รอจนสถานะเป็น "Live" (อาจใช้เวลา 3-5 นาที)
- [ ] ทดสอบ API: เปิด `https://YOUR-API.onrender.com`
- [ ] ควรเห็น: `{"message": "Welcome to Restaurant API"}`

**Backend URL:**
```
___________________________________________________________________________
```

---

## 💻 Frontend Deployment (Vercel)

### ตั้งค่าใน Vercel:
- [ ] Import GitHub Repository
- [ ] ตั้งค่า Project:
  ```
  Framework Preset: Create React App
  Root Directory: restaurant-website/frontend
  Build Command: npm run build
  Output Directory: build
  Install Command: npm install
  ```

### Environment Variables:
- [ ] `REACT_APP_API_URL` = (Backend URL + /api)
  
  ตัวอย่าง: `https://restaurant-api-xxxx.onrender.com/api`

### Deploy & Test:
- [ ] คลิก "Deploy"
- [ ] รอจนสถานะเป็น "Ready" (อาจใช้เวลา 2-3 นาที)
- [ ] ทดสอบ Frontend: เปิด Vercel URL

**Frontend URL:**
```
___________________________________________________________________________
```

---

## 🔗 เชื่อมต่อ Frontend กับ Backend

### อัพเดต Backend CORS:
- [ ] กลับไปที่ Render Dashboard
- [ ] เพิ่ม Environment Variable:
  - `FRONTEND_URL` = (Frontend URL จาก Vercel)
- [ ] Deploy ใหม่ (Manual Deploy)

---

## 🧪 ทดสอบการทำงาน

### ทดสอบ Frontend:
- [ ] เปิดเว็บไซต์ (Vercel URL)
- [ ] หน้า Home โหลดได้ปกติ
- [ ] รูปภาพโชว์ได้

### ทดสอบ Authentication:
- [ ] สมัครสมาชิก (Register) - บทบาท User
- [ ] เข้าสู่ระบบ (Login) ได้
- [ ] ออกจากระบบ (Logout) ได้
- [ ] สมัครเจ้าของร้าน (Register Owner) ได้

### ทดสอบ Restaurant Features:
- [ ] ดูรายการร้านอาหารทั้งหมด
- [ ] ค้นหาร้านอาหาร (พิมพ์ชื่อร้าน)
- [ ] กรองตามประเภทอาหาร
- [ ] กรองตามช่วงราคา
- [ ] ดูรายละเอียดร้าน
- [ ] (Owner) เพิ่มร้านอาหารใหม่
- [ ] (Owner) อัพโหลดรูปภาพร้าน
- [ ] (Owner) แก้ไขข้อมูลร้าน
- [ ] (Owner) ลบร้านอาหาร

### ตรวจสอบ Console:
- [ ] เปิด Developer Tools (F12)
- [ ] ตรวจสอบ Console ไม่มี Error สีแดง
- [ ] ตรวจสอบ Network tab - API calls สำเร็จ (200 OK)

---

## 🎯 Optional Improvements

### Custom Domain:
- [ ] ซื้อ Domain จาก Namecheap, GoDaddy
- [ ] เชื่อม Domain กับ Vercel (ฟรี)
- [ ] ตั้งค่า SSL Certificate (Vercel ทำให้อัตโนมัติ)

### Upload Images to Cloud:
- [ ] สมัคร Cloudinary (https://cloudinary.com)
- [ ] แก้โค้ด upload ให้ใช้ Cloudinary API
- [ ] เพราะ Render จะลบไฟล์เมื่อ restart

### Database Backup:
- [ ] ตั้งค่า Automated Backup ใน MongoDB Atlas
- [ ] Export data เป็น JSON (Backup manual)

### Monitoring:
- [ ] ใช้ UptimeRobot ตรวจสอบ uptime
- [ ] ดู Logs ใน Render/Vercel Dashboard
- [ ] ตั้งค่า Email alerts เมื่อ app down

---

## 📝 บันทึกข้อมูลสำคัญ

```
=== MongoDB Atlas ===
Username: restaurant_admin
Password: ___________________________________________
Connection String: ___________________________________________

=== Render (Backend) ===
Service Name: restaurant-api
URL: ___________________________________________
JWT_SECRET: ___________________________________________

=== Vercel (Frontend) ===
Project Name: restaurant-website
URL: ___________________________________________

=== Credentials for Testing ===
Admin Email: ___________________________________________
Admin Password: ___________________________________________
```

---

## 🎉 Complete!

เมื่อทำครบทุกขั้นตอนแล้ว แอปพลิเคชันของคุณพร้อมใช้งานบนอินเทอร์เน็ต!

**แชร์ลิงก์ให้เพื่อนทดสอบได้เลย! 🚀**

---

## 🆘 เจอปัญหา?

อ่าน **DEPLOYMENT_GUIDE.md** ส่วน Troubleshooting

หรือตรวจสอบ:
- Render Logs (Backend)
- Vercel Logs (Frontend)
- Browser Console (F12)
- MongoDB Atlas Metrics

