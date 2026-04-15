const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config({ path: '../.env' });

const Product = require('../models/Product');
const User    = require('../models/User');

const products = [
  {
    name: 'The Signature Tee',
    slug: 'signature-tee',
    description: 'Cotton that feels like it was grown specifically for you. 100% organic pima cotton, pre-washed for an instant broken-in feel. Our most returned product — because people keep buying more.',
    shortDesc: 'Organic pima cotton. Effortlessly perfect.',
    price: 49,
    comparePrice: 69,
    category: 'tops',
    tier: 'essential',
    images: [
      { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', publicId: 'sig-tee-1' },
      { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', publicId: 'sig-tee-2' },
    ],
    sizes: ['XS','S','M','L','XL'],
    colors: [{ name: 'Ivory', hex: '#F5F0EB' }, { name: 'Charcoal', hex: '#2A2A2A' }, { name: 'Sand', hex: '#C9A96E' }],
    stock: 150,
    featured: true,
    isNew: false,
    tags: ['basics','cotton','everyday'],
    material: '100% Organic Pima Cotton',
    badge: 'BESTSELLER',
  },
  {
    name: 'Cloud Linen Trousers',
    slug: 'cloud-linen-trousers',
    description: 'Belgian linen cut wide and easy. So light, HR filed a dress code complaint. We ignored it. Elastic waist with a drawstring for those days you need both comfort and the illusion of structure.',
    shortDesc: 'Belgian linen. Structured comfort.',
    price: 129,
    comparePrice: 169,
    category: 'bottoms',
    tier: 'pro',
    images: [
      { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4d8b?w=800&q=80', publicId: 'linen-1' },
      { url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80', publicId: 'linen-2' },
    ],
    sizes: ['XS','S','M','L','XL','XXL'],
    colors: [{ name: 'Ecru', hex: '#E8DFD4' }, { name: 'Black', hex: '#0A0A0A' }, { name: 'Sage', hex: '#8A9A7B' }],
    stock: 80,
    featured: true,
    isNew: true,
    tags: ['linen','trousers','summer','wide-leg'],
    material: '100% Belgian Linen',
    badge: 'NEW',
  },
  {
    name: 'The Architecture Blazer',
    slug: 'architecture-blazer',
    description: 'Structured. Intentional. Structurally more intentional than most buildings. Japanese wool-blend with canvas interlining that holds its shape through whatever life throws at it (meetings, heartbreaks, airport sprints).',
    shortDesc: 'Japanese wool-blend. Sharp authority.',
    price: 349,
    comparePrice: 449,
    category: 'outerwear',
    tier: 'max',
    images: [
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', publicId: 'blazer-1' },
      { url: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80', publicId: 'blazer-2' },
    ],
    sizes: ['XS','S','M','L','XL'],
    colors: [{ name: 'Midnight', hex: '#1A1A2E' }, { name: 'Camel', hex: '#C19A6B' }, { name: 'Chalk', hex: '#F0ECE3' }],
    stock: 40,
    featured: true,
    isNew: false,
    tags: ['blazer','formal','japanese-wool','structured'],
    material: '70% Wool, 30% Polyamide',
    badge: 'EDITOR\'S PICK',
  },
  {
    name: 'Gradient Knit Dress',
    slug: 'gradient-knit-dress',
    description: 'The gradient was engineered by our AI. The compliments will be engineered by your entrance. Hand-finished merino wool that transitions from bone to deep charcoal — seamlessly, like a well-written sentence.',
    shortDesc: 'Hand-finished merino. Entrance-level dressing.',
    price: 229,
    comparePrice: 289,
    category: 'dresses',
    tier: 'pro',
    images: [
      { url: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80', publicId: 'dress-1' },
      { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', publicId: 'dress-2' },
    ],
    sizes: ['XS','S','M','L'],
    colors: [{ name: 'Bone to Charcoal', hex: '#888' }],
    stock: 55,
    featured: false,
    isNew: true,
    tags: ['dress','knit','merino','gradient'],
    material: '100% Merino Wool',
    badge: 'NEW',
  },
  {
    name: 'Precision Sneakers',
    slug: 'precision-sneakers',
    description: 'Aerodynamics for walking. You will walk faster. Science says so (our science). Full-grain leather upper, hand-stitched welt, and a sole engineered for the person who is always 3 minutes late.',
    shortDesc: 'Full-grain leather. Velocity optimized.',
    price: 289,
    comparePrice: 349,
    category: 'footwear',
    tier: 'pro',
    images: [
      { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', publicId: 'sneaker-1' },
      { url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', publicId: 'sneaker-2' },
    ],
    sizes: ['S','M','L','XL'],
    colors: [{ name: 'White', hex: '#F5F0EB' }, { name: 'Black', hex: '#0A0A0A' }],
    stock: 90,
    featured: true,
    isNew: false,
    tags: ['sneakers','leather','footwear'],
    material: 'Full-Grain Leather',
  },
  {
    name: 'The Infinite Scarf',
    slug: 'infinite-scarf',
    description: '3 metres of purpose. Infinite styling configurations. One impeccable vibes score. Cashmere-blend in a gauge so fine it passed through airport security without triggering the machine (probably coincidence).',
    shortDesc: 'Cashmere-blend. 3m of intention.',
    price: 169,
    comparePrice: 199,
    category: 'accessories',
    tier: 'essential',
    images: [
      { url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80', publicId: 'scarf-1' },
      { url: 'https://images.unsplash.com/photo-1609803384069-19f3f2f8b8c2?w=800&q=80', publicId: 'scarf-2' },
    ],
    sizes: ['S','M','L'],
    colors: [{ name: 'Camel', hex: '#C9A96E' }, { name: 'Oat', hex: '#E8DFD4' }, { name: 'Charcoal', hex: '#2A2A2A' }],
    stock: 120,
    featured: false,
    isNew: false,
    tags: ['scarf','cashmere','accessories','winter'],
    material: '70% Cashmere, 30% Silk',
    badge: 'VELORA CLASSIC',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/velora');
    console.log('Connected to MongoDB');

    await Product.deleteMany();
    await User.deleteMany();

    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products`);

    await User.create({ name: 'Admin', email: 'admin@velora.com', password: 'admin123', role: 'admin' });
    await User.create({ name: 'Demo User', email: 'user@velora.com', password: 'user123' });
    console.log('✅ Seeded users: admin@velora.com / admin123 | user@velora.com / user123');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
