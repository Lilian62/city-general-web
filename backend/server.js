require('dotenv').config(); // MUST BE AT THE TOP
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// 1. Middlewares
app.use(cors({ origin: '*' })); // For now allow all; you can tighten later
app.use(express.json());

// 2. Database Connection
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('❌ MONGO_URI is not defined. Set it in .env (locally) and in Render Environment.');
  process.exit(1);
}

mongoose
  .connect(mongoUri) // ← fixed here
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // fail fast if DB can't connect
  });

// 3. Routes
app.use('/api/products', productRoutes);

// 4. Static Folder for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 5. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});