require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const username = 'admin'; // change if you want
    const plainPassword = 'admin123'; // CHANGE THIS ASAP after first login!

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    console.log('Admin user created:');
    console.log(`Username: ${username}`);
    console.log(`Password: ${plainPassword}`);

    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
}

createAdmin();
