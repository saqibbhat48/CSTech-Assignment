const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function createUser() {
  await mongoose.connect(process.env.MONGO_URI);
  const existing = await User.findOne({ email: 'admin@example.com' });
  if (existing) return console.log('Admin already exists');

  const hash = await bcrypt.hash('Admin@123', 10);
  await User.create({ email: 'admin@example.com', password: hash });
  console.log("Admin created: admin@example.com / Admin1@23");
  process.exit();
}

createUser(); // This will create an admin user with email '
