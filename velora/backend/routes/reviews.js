const express = require('express');
const router  = express.Router();
const asyncHandler = require('express-async-handler');
const Review  = require('../models/Review');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

// GET /api/reviews/:productId
router.get('/:productId', asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate('user', 'name avatar')
    .sort('-createdAt');
  res.json(reviews);
}));

// POST /api/reviews/:productId
router.post('/:productId', protect, asyncHandler(async (req, res) => {
  const { rating, title, comment } = req.body;
  const existing = await Review.findOne({ user: req.user._id, product: req.params.productId });
  if (existing) return res.status(400).json({ message: 'Already reviewed this product' });

  const review = await Review.create({
    user: req.user._id, name: req.user.name,
    product: req.params.productId, rating, title, comment,
  });

  // Recalculate product rating
  const reviews = await Review.find({ product: req.params.productId });
  const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  await Product.findByIdAndUpdate(req.params.productId, { rating: avg, numReviews: reviews.length });

  res.status(201).json(review);
}));

// DELETE /api/reviews/:id
router.delete('/:id', protect, asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Not authorized' });
  await review.deleteOne();
  res.json({ message: 'Review deleted' });
}));

module.exports = router;
