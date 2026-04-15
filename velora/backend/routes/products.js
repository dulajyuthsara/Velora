const express = require('express');
const router  = express.Router();
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

// GET /api/products
router.get('/', asyncHandler(async (req, res) => {
  const { category, tier, featured, search, sort = '-createdAt', page = 1, limit = 12 } = req.query;
  const query = {};
  if (category) query.category = category;
  if (tier)     query.tier     = tier;
  if (featured) query.featured = featured === 'true';
  if (search)   query.$text    = { $search: search };

  const total    = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ products, total, pages: Math.ceil(total / limit), page: Number(page) });
}));

// GET /api/products/featured
router.get('/featured', asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true }).limit(6);
  res.json(products);
}));

// GET /api/products/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}));

// POST /api/products (admin)
router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
}));

// PUT /api/products/:id (admin)
router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}));

// DELETE /api/products/:id (admin)
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted' });
}));

module.exports = router;
