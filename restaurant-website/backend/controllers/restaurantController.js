const Restaurant = require('../models/Restaurant');

// Get all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const { search, cuisine, priceRange } = req.query;
    let query = { isActive: true };

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by cuisine
    if (cuisine) {
      query.cuisine = cuisine;
    }

    // Filter by price range
    if (priceRange) {
      query.priceRange = priceRange;
    }

    const restaurants = await Restaurant.find(query).sort({ createdAt: -1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single restaurant
const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'ไม่พบร้านอาหาร' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new restaurant (owner only)
const createRestaurant = async (req, res) => {
  try {
    const payload = { ...req.body, owner: req.userId };
    // ถ้ามีการอัปโหลดไฟล์ ให้ใช้ imagePath
    if (req.file) {
      payload.imagePath = `/uploads/${req.file.filename}`;
      // ถ้ามีการอัปโหลดไฟล์ ให้ลบ imageUrl ออก (ใช้ไฟล์แทน)
      delete payload.imageUrl;
    } else if (req.body.imageUrl && typeof req.body.imageUrl === 'string' && req.body.imageUrl.trim()) {
      // ถ้ามี imageUrl แต่ไม่มีไฟล์อัปโหลด ให้ใช้ imageUrl
      payload.imageUrl = req.body.imageUrl.trim();
      // ลบ imagePath ออก (ใช้ URL แทน)
      delete payload.imagePath;
    } else {
      // ถ้าไม่มีทั้งไฟล์และ imageUrl ให้ลบทั้งสองออก
      delete payload.imageUrl;
      delete payload.imagePath;
    }
    const restaurant = new Restaurant(payload);
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update restaurant (only owner can update)
const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'ไม่พบร้านอาหาร' });
    }
    if (restaurant.owner && restaurant.owner.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'ไม่มีสิทธิ์แก้ไขร้านนี้' });
    }
    const update = { ...req.body };
    // ถ้ามีการอัปโหลดไฟล์ ให้ใช้ imagePath
    if (req.file) {
      update.imagePath = `/uploads/${req.file.filename}`;
      // ถ้ามีการอัปโหลดไฟล์ ให้ลบ imageUrl ออก (ใช้ไฟล์แทน)
      delete update.imageUrl;
    } else if (req.body.imageUrl !== undefined) {
      // ถ้ามี imageUrl แต่ไม่มีไฟล์อัปโหลด ให้ใช้ imageUrl
      if (typeof req.body.imageUrl === 'string' && req.body.imageUrl.trim()) {
        update.imageUrl = req.body.imageUrl.trim();
        // ลบ imagePath ออก (ใช้ URL แทน)
        delete update.imagePath;
      } else {
        // ถ้า imageUrl เป็นค่าว่าง หรือ null ให้ลบทั้ง imageUrl และ imagePath
        update.imageUrl = '';
        delete update.imagePath;
      }
    }
    const updated = await Restaurant.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete restaurant (soft delete, owner only)
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'ไม่พบร้านอาหาร' });
    }
    if (restaurant.owner && restaurant.owner.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'ไม่มีสิทธิ์ลบร้านนี้' });
    }
    restaurant.isActive = false;
    await restaurant.save();
    res.json({ message: 'ลบร้านอาหารเรียบร้อยแล้ว' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get restaurants owned by current user (owner dashboard)
const getMyRestaurants = async (req, res) => {
  try {
    const list = await Restaurant.find({ owner: req.userId, isActive: true }).sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cuisines for filter
const getCuisines = async (req, res) => {
  try {
    const cuisines = await Restaurant.distinct('cuisine');
    res.json(cuisines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getCuisines,
  getMyRestaurants
}; 