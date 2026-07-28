const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  welcomeText: { type: String, default: "Welcome" },
  heroImageUrl: { type: String, default: "" },
  heroVideoUrl: { type: String, default: "" }
});

module.exports = mongoose.model('Settings', settingsSchema);