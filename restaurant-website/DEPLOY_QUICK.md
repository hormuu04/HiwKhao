# ⚡ Deploy แบบรวดเร็ว (15 นาที)

คู่มือย่อสำหรับ deploy Restaurant Website แบบเร็วที่สุด

---

## 📋 เตรียมความพร้อม (5 นาที)

### 1. สมัครบัญชี
- [ ] GitHub: https://github.com
- [ ] MongoDB Atlas: https://mongodb.com/cloud/atlas
- [ ] Render: https://render.com
- [ ] Vercel: https://vercel.com

### 2. Push โค้ดขึ้น GitHub
```bash
cd restaurant-website
git init
git add .
git commit -m "Ready to deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/restaurant-website.git
git push -u origin main
```

---

## 1️⃣ MongoDB Atlas (3 นาที)

1. Create **Free Cluster** (M0)
2. Create **Database User**: `restaurant_admin` / `[password]`
3. **Network Access**: Allow `0.0.0.0/0`
4. Get **Connection String**:
```
mongodb+srv://restaurant_admin:[password]@cluster.xxxxx.mongodb.net/restaurantdb
```
📝 **บันทึก Connection String ไว้!**

---

## 2️⃣ Render - Backend (4 นาที)

### สร้าง Web Service:
- Repository: `restaurant-website`
- Root Directory: `restaurant-website/backend`
- Build: `npm install`
- Start: `npm start`

### Environment Variables:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=[ใส่ Connection String จาก MongoDB Atlas]
JWT_SECRET=[สุ่ม string ยาวๆ เช่น abc123XYZ!@#456]
```

**Note:** รอ frontend URL ก่อน จะมาเพิ่ม `FRONTEND_URL` ทีหลัง

📝 **บันทึก Backend URL: `https://restaurant-api-xxxx.onrender.com`**

---

## 3️⃣ Vercel - Frontend (3 นาที)

### Import Project:
- Repository: `restaurant-website`
- Framework: `Create React App`
- Root Directory: `restaurant-website/frontend`

### Environment Variable:
```
REACT_APP_API_URL=https://restaurant-api-xxxx.onrender.com/api
```
*แทนที่ด้วย Backend URL จริง*

**Deploy!**

📝 **บันทึก Frontend URL: `https://restaurant-xxxx.vercel.app`**

---

## 4️⃣ เชื่อมต่อ Backend ↔ Frontend (1 นาที)

กลับไปที่ **Render Dashboard**:
1. เพิ่ม Environment Variable:
```
FRONTEND_URL=https://restaurant-xxxx.vercel.app
```
*แทนที่ด้วย Frontend URL จริง*

2. **Manual Deploy** (Deploy ใหม่)

---

## ✅ ทดสอบ

เปิด Frontend URL:
- ✅ หน้า Home โหลดได้
- ✅ ดูรายการร้านอาหาร
- ✅ สมัครสมาชิก
- ✅ Login
- ✅ เพิ่มร้านอาหาร (Owner)

---

## 🎉 เสร็จแล้ว!

**URLs:**
- Frontend: `https://restaurant-xxxx.vercel.app`
- Backend: `https://restaurant-api-xxxx.onrender.com`

---

## ⚠️ หมายเหตุสำคัญ

1. **Cold Start**: Backend จะ sleep หลัง 15 นาที → แก้: อัพเกรด Render ($7/เดือน)
2. **Upload Images**: Render จะลบรูปเมื่อ restart → แก้: ใช้ Cloudinary
3. **MongoDB Free**: จำกัด 512 MB → เพียงพอสำหรับ learning

---

## 🔧 Troubleshooting

### CORS Error?
ตรวจสอบ `FRONTEND_URL` ใน Render ถูกต้องไหม

### API ไม่ตอบกลับ?
- รอ 30 วินาที (cold start)
- ตรวจสอบ Logs ใน Render

### ไม่มี Environment Variable?
- Frontend: ต้องขึ้นต้นด้วย `REACT_APP_`
- Redeploy หลังเปลี่ยน env vars

---

## 📖 เอกสารเพิ่มเติม

- **คู่มือละเอียด:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Checklist:** [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
- **เปรียบเทียบ Platform:** [DEPLOY_PLATFORMS.md](DEPLOY_PLATFORMS.md)

---

💡 **Tips:**
- ใช้ Custom Domain ฟรีใน Vercel
- Monitor Logs ใน Dashboard
- Backup MongoDB เป็นประจำ

🚀 **Happy Deploying!**

