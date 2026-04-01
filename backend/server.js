require('dotenv').config(); // MUST BE AT THE TOP
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// 1. Middlewares
const allowedOrigins = [
  'https://city-general-web-frontend.onrender.com',
  'http://localhost:3000', // for local development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight OPTIONS requests for all routes
app.options('(.*)', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // needed for form data

// 2. Database Connection
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('❌ MONGO_URI is not defined. Set it in .env (locally) and in Render Environment.');
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

// 4. Static Folder for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 5. Health check route (useful for Render uptime monitoring)
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