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
    if (req.file) {
      payload.imagePath = `/uploads/${req.file.filename}`;
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
    if (req.file) {
      update.imagePath = `/uploads/${req.file.filename}`;
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