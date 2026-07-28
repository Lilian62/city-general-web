const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/city-general');

// Define Admin Schema (if you have one)
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});

const Admin = mongoose.model('Admin', adminSchema);

async function resetPassword() {
  try {
    // Set new password
    const newPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Find or create admin
    const admin = await Admin.findOneAndUpdate(
      { username: 'admin' },
      { 
        username: 'admin',
        password: hashedPassword,
        email: 'admin@citygeneral.com'
      },
      { upsert: true, new: true }
    );

    console.log('✅ Admin password reset successfully!');
    console.log(`📝 Username: admin`);
    console.log(`🔑 New Password: ${newPassword}`);
    console.log(`📧 Email: admin@citygeneral.com`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting password:', error);
    process.exit(1);
  }
}

resetPassword();