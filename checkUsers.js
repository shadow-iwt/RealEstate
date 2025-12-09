import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  username: { type: String, required: true, unique: true },
  password: String,
  fullName: String,
  email: String,
  phone: String,
  role: String,
  avatar: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

(async () => {
  try {
    const dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/hobbyconnect';
    await mongoose.connect(dbUrl);

    const users = await User.find().lean();
    console.log('📋 Users in database:');
    users.forEach((u) => {
      console.log(`   Email: ${u.email} | Password: ${u.password} | Username: ${u.username}`);
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
})();
