require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();

// 1. CORS - Manual headers (most reliable, no library issues)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://city-general-web-frontend.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Database Connection
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('❌ MONGO_URI is not defined. Add it in Render Environment tab.');
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// 3. Routes
app.use('/api/products', productRoutes);

// 4. Static uploads folder
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 5. Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// 6. Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// 7. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});