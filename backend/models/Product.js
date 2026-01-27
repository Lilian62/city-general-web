const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // ADDED: Unique slug for SEO URLs
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);