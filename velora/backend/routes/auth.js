const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User    = require('../models/User');
const { protect } = require('../middleware/auth');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });

// POST /api/auth/register
router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' });
  if (await User.findOne({ email }))
    return res.status(400).json({ message: 'Email already registered' });
  const user = await User.create({ name, email, password });
  res.status(201).json({ token: signToken(user._id), user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
}));

// POST /api/auth/login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ token: signToken(user._id), user: { _id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
}));

// GET /api/auth/me
router.get('/me', protect, asyncHandler(async (req, res) => {
  res.json(req.user);
}));

// PUT /api/auth/profile
router.put('/profile', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.name    = req.body.name    || user.name;
  user.email   = req.body.email   || user.email;
  user.address = req.body.address || user.address;
  if (req.body.password) user.password = req.body.password;
  const updated = await user.save();
  res.json({ _id: updated._id, name: updated.name, email: updated.email, address: updated.address });
}));

module.exports = router;
