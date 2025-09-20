import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import sendEmail from '../utils/sendEmail.js';

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

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
      res.status(200).json({ msg: 'OTP sent to your email' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error sending email');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

