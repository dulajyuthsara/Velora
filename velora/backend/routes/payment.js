const express = require('express');
const router  = express.Router();
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/auth');

// POST /api/payment/intent
router.post('/intent', protect, asyncHandler(async (req, res) => {
  // Stripe integration — ensure STRIPE_SECRET_KEY is set in .env
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const { amount } = req.body; // amount in cents
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
  });
  res.json({ clientSecret: paymentIntent.client_secret });
}));

module.exports = router;
