const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/city-general');

const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  slug: String,
  category: String,
  description: String,
  imageUrl: String
});

const Product = mongoose.model('Product', productSchema);

// Map products to their image filenames
// You need to match each product with the correct image
const updates = [
  { 
    _id: "1", 
    name: "Solar Panel 100W",
    imageUrl: "/uploads/1785172689191.jpg" // or the correct filename
  },
  { 
    _id: "2", 
    name: "Generator 5KVA",
    imageUrl: "/uploads/1785165828390.png"
  },
  { 
    _id: "3", 
    name: "Circuit Breaker 63A",
    imageUrl: "/uploads/1785173726774.jfif"
  },
  { 
    _id: "4", 
    name: "Digital Multimeter",
    imageUrl: "/uploads/1785173645868.jpg"
  },
  { 
    _id: "5", 
    name: "Solar Installation Kit",
    imageUrl: "/uploads/1785166027841.png"
  }
];

async function updateProducts() {
  try {
    for (const update of updates) {
      await Product.updateOne(
        { _id: update._id },
        { $set: { imageUrl: update.imageUrl } }
      );
      console.log(`✅ Updated ${update.name} with image: ${update.imageUrl}`);
    }
    console.log('✅ All products updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating products:', error);
    process.exit(1);
  }
}

updateProducts();