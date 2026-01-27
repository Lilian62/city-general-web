const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// 1. Upload/Create a new item
exports.createProduct = async (req, res) => {
    try {
        // Safety check: Ensure a file was actually uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No image file uploaded" });
        }

        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            imageUrl: `/uploads/${req.file.filename}`
          });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Create Product Error:", err);
        res.status(500).json({ message: err.message });
    }
};

// 2. Delete an item and its image
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (product) {
            // Build the absolute path to the file to delete it safely
            const filePath = path.join(process.cwd(), product.imageUrl);
            
            // Check if file exists before trying to delete it
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            await Product.findByIdAndDelete(req.params.id);
            res.json({ message: "Item and Image deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        console.error("Delete Product Error:", err);
        res.status(500).json({ message: err.message });
    }
};

// 3. Update an existing item
exports.updateProduct = async (req, res) => {
    try {
        const updatedData = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category
        };
        
        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            updatedData, 
            { new: true }
        );
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.json(product);
    } catch (err) {
        console.error("Update Product Error:", err);
        res.status(500).json({ message: err.message });
    }
};

// 4. Get all products (Added this to ensure your frontend can fetch data)
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};