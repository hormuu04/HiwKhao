#!/usr/bin/env node

/**
 * สคริปต์สำหรับสร้างไฟล์ Environment Variables
 * รัน: node setup-env.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 ตั้งค่า Environment Variables สำหรับโปรเจค Restaurant Website\n');

// ฟังก์ชันถามคำถาม
function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// ฟังก์ชันสร้างไฟล์
function createEnvFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ สร้างไฟล์ ${filePath} สำเร็จ!`);
    return true;
  } catch (error) {
    console.error(`❌ ไม่สามารถสร้างไฟล์ ${filePath}:`, error.message);
    return false;
  }
}

// ฟังก์ชันสร้าง JWT Secret แบบสุ่ม
function generateJWTSecret() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let secret = '';
  for (let i = 0; i < 64; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return secret;
}

async function main() {
  try {
    // 1. ถามว่าเป็น Development หรือ Production
    console.log('📋 เลือกโหมด:');
    console.log('1) Development (Local)');
    console.log('2) Production (Deploy)');
    const mode = await question('\nเลือกโหมด (1 หรือ 2): ');

    const isDev = mode.trim() === '1';

    // 2. ตั้งค่า Backend Environment
    console.log('\n🔧 ตั้งค่า Backend Environment Variables...\n');

    let backendEnv = '';
    
    if (isDev) {
      // Development Mode
      const jwtSecret = generateJWTSecret();
      backendEnv = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurantdb
NODE_ENV=development
JWT_SECRET=${jwtSecret}
FRONTEND_URL=http://localhost:3000
`;
      createEnvFile(path.join(__dirname, 'backend', 'config.env'), backendEnv);
      console.log('📝 ใช้ค่า default สำหรับ Development\n');
      
    } else {
      // Production Mode
      const mongoUri = await question('MongoDB Atlas Connection String: ');
      const jwtSecret = await question('JWT Secret (หรือกด Enter เพื่อสร้างอัตโนมัติ): ');
      const frontendUrl = await question('Frontend URL (เช่น https://yourapp.vercel.app): ');
      
      const finalJwtSecret = jwtSecret.trim() || generateJWTSecret();
      
      backendEnv = `PORT=5000
MONGODB_URI=${mongoUri.trim()}
NODE_ENV=production
JWT_SECRET=${finalJwtSecret}
FRONTEND_URL=${frontendUrl.trim()}
`;
      createEnvFile(path.join(__dirname, 'backend', 'config.env'), backendEnv);
    }

    // 3. ตั้งค่า Frontend Environment
    console.log('\n🎨 ตั้งค่า Frontend Environment Variables...\n');

    let frontendEnv = '';
    
    if (isDev) {
      frontendEnv = 'REACT_APP_API_URL=http://localhost:5000/api\n';
      console.log('📝 ใช้ค่า default สำหรับ Development\n');
    } else {
      const backendUrl = await question('Backend API URL (เช่น https://your-api.onrender.com/api): ');
      frontendEnv = `REACT_APP_API_URL=${backendUrl.trim()}\n`;
    }
    
    createEnvFile(path.join(__dirname, 'frontend', '.env'), frontendEnv);

    // 4. สรุปผล
    console.log('\n✨ ตั้งค่าเสร็จสิ้น!\n');
    console.log('📁 ไฟล์ที่สร้างแล้ว:');
    console.log('  - backend/config.env');
    console.log('  - frontend/.env');
    console.log('\n💡 ขั้นตอนถัดไป:');
    if (isDev) {
      console.log('  1. ติดตั้ง MongoDB (หรือใช้ MongoDB Atlas)');
      console.log('  2. cd backend && npm install');
      console.log('  3. cd frontend && npm install');
      console.log('  4. รัน Backend: cd backend && npm start');
      console.log('  5. รัน Frontend: cd frontend && npm start');
      console.log('\n📖 อ่านเพิ่มเติมที่: QUICK_START.md');
    } else {
      console.log('  1. ตรวจสอบค่าใน backend/config.env');
      console.log('  2. ตรวจสอบค่าใน frontend/.env');
      console.log('  3. Copy Environment Variables ไปใส่ใน Render/Vercel');
      console.log('\n📖 อ่านเพิ่มเติมที่: DEPLOYMENT_GUIDE.md');
    }
    console.log('\n🎉 Happy Coding!\n');

  } catch (error) {
    console.error('\n❌ เกิดข้อผิดพลาด:', error.message);
  } finally {
    rl.close();
  }
}

// รันสคริปต์
main();

