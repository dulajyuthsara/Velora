const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     String,
  image:    String,
  price:    Number,
  size:     String,
  color:    String,
  quantity: { type: Number, required: true, default: 1 },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  shippingAddress: {
    name:    String,
    street:  String,
    city:    String,
    state:   String,
    zip:     String,
    country: String,
  },
  paymentMethod:  { type: String, required: true },
  paymentResult:  { id: String, status: String, email: String },
  itemsPrice:     { type: Number, required: true },
  shippingPrice:  { type: Number, required: true },
  taxPrice:       { type: Number, required: true },
  totalPrice:     { type: Number, required: true },
  isPaid:         { type: Boolean, default: false },
  paidAt:         Date,
  isDelivered:    { type: Boolean, default: false },
  deliveredAt:    Date,
  status:         { type: String, enum: ['pending','processing','shipped','delivered','cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
