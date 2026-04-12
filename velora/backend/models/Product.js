const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDesc:   { type: String },
  price:       { type: Number, required: true },
  comparePrice:{ type: Number },
  category:    { type: String, required: true, enum: ['tops', 'bottoms', 'dresses', 'outerwear', 'footwear', 'accessories'] },
  tier:        { type: String, enum: ['essential', 'pro', 'max'], default: 'essential' },
  images:      [{ url: String, publicId: String }],
  sizes:       [{ type: String, enum: ['XS','S','M','L','XL','XXL'] }],
  colors:      [{ name: String, hex: String }],
  stock:       { type: Number, default: 0 },
  featured:    { type: Boolean, default: false },
  isNew:       { type: Boolean, default: false },
  tags:        [String],
  material:    { type: String },
  rating:      { type: Number, default: 0 },
  numReviews:  { type: Number, default: 0 },
  badge:       { type: String }, // e.g. "BESTSELLER", "NEW"
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
