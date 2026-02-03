require('dotenv').config(); // MUST BE AT THE TOP
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors'); 
const productRoutes = require('./routes/productRoutes');

const app = express();

// 1. Middlewares
app.use(cors({ origin: '*' })); // For staging, allowing all is easiest to start
app.use(express.json());

// 2. Database Connection
// Note: Changed DB name to city_general_db to match your .env file
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/city_general_db')
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 3. Routes
app.use('/api/products', productRoutes);

// 4. Static Folder for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Use the PORT from .env if it exists, otherwise use 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});