const express = require('express');
const router  = express.Router();
const asyncHandler = require('express-async-handler');
const User    = require('../models/User');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

// We store the cart in a simple in-memory/session approach here.
// For production you'd add a Cart model.
// Cart is stored in user document as virtual (we keep it simple with req body).

// GET /api/cart — returns wishlist products
router.get('/wishlist', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.json(user.wishlist);
}));

// POST /api/cart/wishlist/:productId
router.post('/wishlist/:productId', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const pid  = req.params.productId;
  const idx  = user.wishlist.indexOf(pid);
  if (idx > -1) user.wishlist.splice(idx, 1);
  else user.wishlist.push(pid);
  await user.save();
  res.json({ wishlist: user.wishlist });
}));

module.exports = router;
