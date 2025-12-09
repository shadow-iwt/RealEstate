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

    const testUser = await User.create({
      username: 'test',
      email: 'text@example.com',
      password: '123456',
      fullName: 'Test User',
      phone: '(555) 000-0001',
      role: 'agent',
      avatar: 'https://i.pravatar.cc/150?img=99',
      isActive: true,
    });

    console.log('✅ Test user created:');
    console.log('   Email: text@example.com');
    console.log('   Password: 123456');
    console.log('   Full Name: Test User');
    console.log('   Role: agent');

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
