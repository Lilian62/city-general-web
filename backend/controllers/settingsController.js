const Settings = require('../models/Settings'); // Make sure this model exists
const path = require('path');

// 1. Get current Hero settings
exports.getSettings = async (req, res) => {
    try {
        // Find the first document (we only ever need one settings record)
        const settings = await Settings.findOne();
        res.json(settings || { welcomeText: "Welcome to City General" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 2. Update Hero section (Text + File)
exports.updateSettings = async (req, res) => {
    try {
        const { welcomeText } = req.body;
        let updateData = { welcomeText };

        // If a new file was uploaded, determine if it's a video or image
        if (req.file) {
            const fileName = req.file.filename;
            const filePath = `/uploads/${fileName}`;
            const isVideo = fileName.match(/\.(mp4|mov|webm)$/i);

            if (isVideo) {
                updateData.heroVideoUrl = filePath;
                updateData.heroImageUrl = ""; // Clear image if video is uploaded
            } else {
                updateData.heroImageUrl = filePath;
                updateData.heroVideoUrl = ""; // Clear video if image is uploaded
            }
        }

        // upsert: true means "Update it if it exists, Create it if it doesn't"
        const settings = await Settings.findOneAndUpdate(
            {}, 
            updateData, 
            { new: true, upsert: true }
        );

        res.json(settings);
    } catch (err) {
        console.error("Hero Update Error:", err);
        res.status(500).json({ message: err.message });
    }
};