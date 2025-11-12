const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  name: {
    type: String,
    required: [true, 'ชื่อร้านอาหารเป็นสิ่งจำเป็น'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'ที่อยู่เป็นสิ่งจำเป็น'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'รายละเอียดเป็นสิ่งจำเป็น'],
    trim: true
  },
  cuisine: {
    type: String,
    required: [true, 'ประเภทอาหารเป็นสิ่งจำเป็น'],
    trim: true
  },
  priceRange: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  openingHours: {
    type: String,
    trim: true
  },
  imagePath: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  location: {
    latitude: {
      type: Number,
      required: false
    },
    longitude: {
      type: Number,
      required: false
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
restaurantSchema.index({ name: 'text', description: 'text', cuisine: 'text' });

module.exports = mongoose.model('Restaurant', restaurantSchema); 