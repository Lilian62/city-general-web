const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Mock data storage (in-memory for demo mode)
let mockProducts = [
  { _id: "1", name: "Solar Panel 100W", slug: "solar-panel-100w", category: "Solar Panels", description: "High efficiency solar panel 100W output", imageUrl: "" },
  { _id: "2", name: "Generator 5KVA", slug: "generator-5kva", category: "Generators", description: "Reliable 5KVA diesel generator for backup power", imageUrl: "" },
  { _id: "3", name: "Circuit Breaker 63A", slug: "circuit-breaker-63a", category: "Low voltage", description: "Single phase circuit breaker 63A rated", imageUrl: "" },
  { _id: "4", name: "Digital Multimeter", slug: "digital-multimeter", category: "Instruments and Meters", description: "Precision digital multimeter for electrical testing", imageUrl: "" },
  { _id: "5", name: "Solar Installation Kit", slug: "solar-installation-kit", category: "Solar Systems Sales and Services", description: "Complete solar installation kit with mounting hardware", imageUrl: "" }
];

let mockSettings = {
  welcomeText: "Welcome to City General Appliances. We are your trusted partner for high-quality electrical appliances.",
  heroImageUrl: "https://via.placeholder.com/1200x400?text=City+General+Electric",
  heroVideoUrl: ""
};

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
router.get('/settings', (req, res) => {
  res.json(mockSettings);
});

router.post('/settings', upload.single('heroElement'), (req, res) => {
  const { welcomeText } = req.body;
  if (welcomeText) {
    mockSettings.welcomeText = welcomeText;
  }
  if (req.file) {
    const fileUrl = `/uploads/${req.file.filename}`;
    const isVideo = req.file.mimetype.startsWith('video/');
    if (isVideo) {
      mockSettings.heroVideoUrl = fileUrl;
      mockSettings.heroImageUrl = "";
    } else {
      mockSettings.heroImageUrl = fileUrl;
      mockSettings.heroVideoUrl = "";
    }
  }
  res.json(mockSettings);
});

// --- PRODUCT ROUTES ---
router.get('/', (req, res) => {
  res.json(mockProducts);
});

router.get('/slug/:slug', (req, res) => {
  const product = mockProducts.find(p => p.slug === req.params.slug);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

router.post('/', upload.single('image'), (req, res) => {
  const { name, slug, description, category } = req.body;
  const existingProduct = mockProducts.find(p => p.slug === slug);
  if (existingProduct) {
    return res.status(400).json({ message: "A product with this name already exists." });
  }
  const newProduct = {
    _id: Date.now().toString(),
    name,
    slug,
    description,
    category,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : "/uploads/default.jpg"
  };
  mockProducts.push(newProduct);
  res.json(newProduct);
});

router.delete('/:id', (req, res) => {
  const index = mockProducts.findIndex(p => p._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  mockProducts.splice(index, 1);
  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = router;