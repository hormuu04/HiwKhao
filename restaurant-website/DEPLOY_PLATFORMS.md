# 🚀 แพลตฟอร์มสำหรับ Deploy

เอกสารนี้เปรียบเทียบแพลตฟอร์มต่างๆ สำหรับ deploy แอปพลิเคชัน Restaurant Website

---

## 🗄️ Database - MongoDB Atlas

**แนะนำ: ⭐⭐⭐⭐⭐ (บังคับใช้)**

### ข้อดี:
- ✅ Free tier (512 MB storage)
- ✅ ง่ายต่อการตั้งค่า
- ✅ Auto backup
- ✅ Global deployment
- ✅ Monitoring built-in

### ข้อเสีย:
- ❌ จำกัดพื้นที่ใน free tier

### เหมาะสำหรับ:
- ทุกโปรเจค (Development + Production)

**ลิงก์:** https://www.mongodb.com/cloud/atlas

---

## 🔧 Backend Deployment

### 1. Render ⭐⭐⭐⭐⭐ (แนะนำ)

**Free Tier:** ✅ มี (750 ชม./เดือน)

#### ข้อดี:
- ✅ ติดตั้งง่าย เชื่อม GitHub ตรงๆ
- ✅ Auto-deploy เมื่อ push code
- ✅ Free SSL certificate
- ✅ Environment variables ง่าย
- ✅ Logs แสดงผลชัดเจน
- ✅ Support Node.js native

#### ข้อเสีย:
- ❌ Cold start (app นอนหลัง 15 นาทีไม่ได้ใช้)
- ❌ Build time นานกว่า
- ❌ ไม่เก็บไฟล์ที่ upload (ใช้ Cloudinary แทน)

#### เหมาะสำหรับ:
- โปรเจคเล็ก-กลาง
- Demo projects
- MVPs

**ราคา Production:** $7/เดือน (ไม่มี cold start)

**ลิงก์:** https://render.com

---

### 2. Railway ⭐⭐⭐⭐

**Free Tier:** ✅ มี ($5 credit/เดือน)

#### ข้อดี:
- ✅ ใช้งานง่ายมาก (UI สวย)
- ✅ ไม่มี cold start ใน free tier
- ✅ Deploy เร็ว
- ✅ Support Docker
- ✅ Database ในแพลตฟอร์มเดียวกัน

#### ข้อเสีย:
- ❌ Free credit จำกัด (หมดเร็ว)
- ❌ ราคาแพงกว่า Render

#### เหมาะสำหรับ:
- Development/Testing
- โปรเจคที่ต้องการ performance ดี

**ราคา Production:** ตาม usage (~$5-10/เดือน)

**ลิงก์:** https://railway.app

---

### 3. Vercel (Serverless Functions) ⭐⭐⭐

**Free Tier:** ✅ มี

#### ข้อดี:
- ✅ Free tier ดี
- ✅ Deploy เร็วมาก
- ✅ ไม่มี cold start
- ✅ Global CDN

#### ข้อเสีย:
- ❌ ต้องเขียน Serverless functions (ไม่ใช่ Express แบบเดิม)
- ❌ จำกัด 10 second execution time
- ❌ ไม่เหมาะกับ long-running processes

#### เหมาะสำหรับ:
- API ขนาดเล็ก
- Static sites ที่มี API routes

**ราคา Production:** ฟรี (จำกัดเรื่อง bandwidth)

**ลิงก์:** https://vercel.com

---

### 4. Heroku ⭐⭐

**Free Tier:** ❌ ไม่มีแล้ว (ตั้งแต่ Nov 2022)

#### ข้อดี:
- ✅ ชื่อเสียงดี
- ✅ Add-ons เยอะ
- ✅ Documentation ดี

#### ข้อเสีย:
- ❌ ไม่มี free tier
- ❌ ราคาแพง ($7/เดือน)

**ราคา:** $7/เดือน (Basic)

**ลิงก์:** https://heroku.com

---

### 5. DigitalOcean App Platform ⭐⭐⭐

**Free Tier:** ❌ ไม่มี

**ราคา:** $5/เดือน

#### ข้อดี:
- ✅ ราคาคุ้มค่า
- ✅ Performance ดี
- ✅ Scalable

#### ข้อเสีย:
- ❌ ไม่มี free tier
- ❌ Setup ซับซ้อนกว่า

**ลิงก์:** https://www.digitalocean.com/products/app-platform

---

## 💻 Frontend Deployment

### 1. Vercel ⭐⭐⭐⭐⭐ (แนะนำ)

**Free Tier:** ✅ มี (Unlimited projects)

#### ข้อดี:
- ✅ ออกแบบมาสำหรับ React/Next.js
- ✅ Deploy สุดง่าย (เชื่อม GitHub)
- ✅ Auto-deploy เมื่อ push
- ✅ Free SSL
- ✅ Global CDN เร็วมาก
- ✅ Preview deployments (แต่ละ PR)
- ✅ Custom domain ฟรี
- ✅ Environment variables ง่าย

#### ข้อเสีย:
- ไม่มีข้อเสียสำหรับ free tier

#### เหมาะสำหรับ:
- React, Vue, Angular, Next.js
- Static sites
- SPAs (Single Page Applications)

**ราคา Production:** ฟรี (Pro $20/เดือน)

**ลิงก์:** https://vercel.com

---

### 2. Netlify ⭐⭐⭐⭐⭐

**Free Tier:** ✅ มี (100 GB bandwidth)

#### ข้อดี:
- ✅ ใช้งานง่ายมาก
- ✅ Drag & drop deploy
- ✅ Free SSL
- ✅ Forms handling
- ✅ Functions (serverless)
- ✅ Split testing

#### ข้อเสีย:
- ❌ Build time นานกว่า Vercel เล็กน้อย

#### เหมาะสำหรับ:
- Static sites
- JAMstack projects

**ราคา Production:** ฟรี (Pro $19/เดือน)

**ลิงก์:** https://netlify.com

---

### 3. GitHub Pages ⭐⭐⭐

**Free Tier:** ✅ มี (ฟรีทั้งหมด)

#### ข้อดี:
- ✅ ฟรีตลอดกาล
- ✅ เชื่อม GitHub ตรงๆ
- ✅ ใช้งานง่าย

#### ข้อเสีย:
- ❌ ไม่รองรับ client-side routing ดีนัก
- ❌ ต้องใช้ HashRouter แทน BrowserRouter
- ❌ ไม่มี environment variables
- ❌ Build ต้องทำเอง

#### เหมาะสำหรับ:
- Static sites แบบง่ายๆ
- Documentation sites

**ลิงก์:** https://pages.github.com

---

### 4. Cloudflare Pages ⭐⭐⭐⭐

**Free Tier:** ✅ มี (Unlimited bandwidth)

#### ข้อดี:
- ✅ CDN เร็วที่สุดในโลก
- ✅ Unlimited bandwidth
- ✅ Deploy เร็ว
- ✅ Free SSL

#### ข้อเสีย:
- ❌ UI ซับซ้อนกว่า

**ลิงก์:** https://pages.cloudflare.com

---

## 📊 เปรียบเทียบแบบตาราง

### Backend

| Platform | Free Tier | Cold Start | Price/mo | แนะนำ |
|----------|-----------|------------|----------|-------|
| **Render** | ✅ 750 hr | ✅ มี | $7 | ⭐⭐⭐⭐⭐ |
| Railway | ✅ $5 credit | ❌ ไม่มี | ~$5-10 | ⭐⭐⭐⭐ |
| Vercel | ✅ | ❌ ไม่มี | ฟรี | ⭐⭐⭐ |
| Heroku | ❌ | ✅ มี | $7 | ⭐⭐ |
| DigitalOcean | ❌ | ❌ ไม่มี | $5 | ⭐⭐⭐ |

### Frontend

| Platform | Free Tier | Bandwidth | Price/mo | แนะนำ |
|----------|-----------|-----------|----------|-------|
| **Vercel** | ✅ | Unlimited* | ฟรี | ⭐⭐⭐⭐⭐ |
| Netlify | ✅ | 100 GB | ฟรี | ⭐⭐⭐⭐⭐ |
| GitHub Pages | ✅ | 100 GB | ฟรี | ⭐⭐⭐ |
| Cloudflare Pages | ✅ | Unlimited | ฟรี | ⭐⭐⭐⭐ |

*จำกัดตาม fair use policy

---

## 🎯 คำแนะนำสำหรับโปรเจคนี้

### ฟรีทั้งระบบ (แนะนำ):
```
Database:  MongoDB Atlas (Free M0)
Backend:   Render (Free Tier)
Frontend:  Vercel (Free Tier)
```

**ข้อดี:**
- ฟรี 100%
- ติดตั้งง่าย
- เหมาะสำหรับ learning และ portfolio

**ข้อเสีย:**
- Backend มี cold start (~30 วินาที)

---

### Production (แนะนำ):
```
Database:  MongoDB Atlas ($9/mo สำหรับ M10)
Backend:   Render ($7/mo)
Frontend:  Vercel (ฟรี)
Storage:   Cloudinary (ฟรี)
```

**ราคารวม:** ~$16/เดือน

**ข้อดี:**
- ไม่มี cold start
- Performance ดี
- Professional

---

### Budget-Friendly:
```
Database:  MongoDB Atlas (Free M0)
Backend:   Railway ($5/mo)
Frontend:  Vercel (ฟรี)
```

**ราคารวม:** ~$5/เดือน

---

## 🔧 การเพิ่มฟีเจอร์ Cloud Storage

เนื่องจาก Render จะลบไฟล์ที่ upload เมื่อ restart แนะนำให้ใช้:

### Cloudinary ⭐⭐⭐⭐⭐ (แนะนำ)

**Free Tier:** 25 GB storage, 25 GB bandwidth

**ข้อดี:**
- ✅ ฟรีเยอะมาก
- ✅ Image transformation built-in
- ✅ CDN เร็ว
- ✅ Easy integration

**ลิงก์:** https://cloudinary.com

### AWS S3

**ราคา:** ~$0.023/GB

**ข้อดี:**
- ✅ เชื่อถือได้
- ✅ Scalable

**ข้อเสีย:**
- ❌ ซับซ้อน
- ❌ ต้องเสียค่าใช้จ่าย

---

## 📝 สรุป

### สำหรับ Development/Learning:
👉 **Render (Backend) + Vercel (Frontend) + MongoDB Atlas**

### สำหรับ Production:
👉 **Render Paid (Backend) + Vercel (Frontend) + MongoDB Atlas M10 + Cloudinary**

### งบน้อย:
👉 **Railway (Backend) + Vercel (Frontend) + MongoDB Atlas Free**

---

## 📖 อ่านเพิ่มเติม

- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - คู่มือ deploy ทีละขั้นตอน
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Checklist ครบถ้วน
- [QUICK_START.md](QUICK_START.md) - เริ่มต้น Development

