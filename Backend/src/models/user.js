import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  onboardingComplete: { type: Boolean, default: false },
  careerPath: { type: String },
  skills: [{ type: String }],
  interests: [{ type: String }],
  otp: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

export default User;
