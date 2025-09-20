import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import User from '../models/user.js';

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const encryptedToken = CryptoJS.AES.encrypt(token, process.env.AES_SECRET).toString();

    res.json({ token: encryptedToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
