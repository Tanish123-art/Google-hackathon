import mongoose from 'mongoose';
import User from './src/models/user.js';
import 'dotenv/config';

async function clearUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Clear all users
    const result = await User.deleteMany({});
    console.log(`✅ Cleared ${result.deletedCount} users from database`);

    // List remaining users
    const remainingUsers = await User.find({});
    console.log(`📊 Remaining users: ${remainingUsers.length}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

clearUsers();
