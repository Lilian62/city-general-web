const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const Settings = require('../models/Settings');

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// --- NEW LOGIN ROUTE (SECURE) ---
router.post('/login', (req, res) => {
  const { password } = req.body;
  
  // ADD THIS LINE FOR TESTING
  console.log("Password entered:", password);
  console.log("Secret from .env:", process.env.ADMIN_PASSWORD);

  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true, message: "Authenticated successfully" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// --- SETTINGS ROUTES ---
router.get('/settings', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings || { welcomeText: "Welcome" });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/settings', upload.single('heroElement'), async (req, res) => {
  try {
    const { welcomeText } = req.body;
    let updateData = { welcomeText };
    if (req.file) {
      const fileUrl = `/uploads/${req.file.filename}`;
      const isVideo = req.file.mimetype.startsWith('video/');
      if (isVideo) { updateData.heroVideoUrl = fileUrl; updateData.heroImageUrl = ""; }
      else { updateData.heroImageUrl = fileUrl; updateData.heroVideoUrl = ""; }
    }
    const settings = await Settings.findOneAndUpdate({}, updateData, { upsert: true, new: true });
    res.json(settings);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- PRODUCT ROUTES ---
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, slug, description, category } = req.body;
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res.status(400).json({ message: "A product with this name already exists." });
    }
    const newProduct = new Product({
      name,
      slug,
      description,
      category,
      imageUrl: `/uploads/${req.file.filename}`
    });
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;