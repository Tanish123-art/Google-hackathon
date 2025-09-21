import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import sendEmail from '../utils/sendEmail.js';

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({ 
      msg: 'Please provide username, email, and password',
      success: false 
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      msg: 'Please provide a valid email address',
      success: false 
    });
  }

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({ 
      msg: 'Password must be at least 6 characters long',
      success: false 
    });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    try {
      await sendEmail({
        email,
        subject: 'Email Verification',
        message: `Your OTP for email verification is: ${otp}`,
      });
      res.status(200).json({ 
        msg: 'OTP sent to your email',
        success: true 
      });
    } catch (err) {
      console.error('Email sending failed:', err.message);
      // Don't fail the signup if email fails, just return the OTP in response
      res.status(200).json({ 
        msg: 'Account created successfully. Email sending failed, but you can use this OTP: ' + otp,
        otp: otp, // Include OTP in response for development/testing
        success: true,
        emailSent: false
      });
    }
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ 
      msg: 'Server error during signup',
      success: false,
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

