const express = require('express');
const router  = express.Router();
const asyncHandler = require('express-async-handler');
const Order   = require('../models/Order');
const { protect, admin } = require('../middleware/auth');

// POST /api/orders
router.post('/', protect, asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;
  if (!items?.length) return res.status(400).json({ message: 'No order items' });
  const order = await Order.create({ user: req.user._id, items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice });
  res.status(201).json(order);
}));

// GET /api/orders/my
router.get('/my', protect, asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
  res.json(orders);
}));

// GET /api/orders (admin)
router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort('-createdAt');
  res.json(orders);
}));

// GET /api/orders/:id
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Not authorized' });
  res.json(order);
}));

// PUT /api/orders/:id/pay
router.put('/:id/pay', protect, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.isPaid       = true;
  order.paidAt       = Date.now();
  order.status       = 'processing';
  order.paymentResult = req.body;
  res.json(await order.save());
}));

// PUT /api/orders/:id/deliver (admin)
router.put('/:id/deliver', protect, admin, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.isDelivered = true;
  order.deliveredAt = Date.now();
  order.status      = 'delivered';
  res.json(await order.save());
}));

module.exports = router;
