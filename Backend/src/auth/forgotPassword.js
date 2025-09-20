import User from '../models/user.js';
import sendEmail from '../utils/sendEmail.js';

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    try {
      await sendEmail({
        email,
        subject: 'Password Reset',
        message: `Your OTP for password reset is: ${otp}`,
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
