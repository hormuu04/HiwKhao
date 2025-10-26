const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const sampleData = require('../sample-data.json');

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurantdb';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedDatabase = async () => {
  try {
    // ลบข้อมูลเดิม
    await Restaurant.deleteMany({});
    console.log('Cleared existing data');

    // เพิ่มข้อมูลตัวอย่าง
    const restaurants = await Restaurant.insertMany(sampleData);
    console.log(`Added ${restaurants.length} restaurants to database`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 