import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import User from '../models/user.js';

export const googleAuth = async (req, res) => {
  const { credential } = req.body;

  try {
    if (!credential) {
      return res.status(400).json({ msg: 'No credential provided' });
    }

    // Decode the JWT token from Google
    const decoded = jwt.decode(credential);
    
    if (!decoded) {
      return res.status(400).json({ msg: 'Invalid credential' });
    }

    const { sub: googleId, email, name, picture } = decoded;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = new User({
        username: name || email.split('@')[0],
        email: email,
        password: 'google-auth', // Placeholder password for Google users
        isVerified: true, // Google users are automatically verified
        googleId: googleId,
        profilePicture: picture
      });
      await user.save();
    } else {
      // Update existing user with Google ID if not present
      if (!user.googleId) {
        user.googleId = googleId;
        user.isVerified = true;
        if (picture) user.profilePicture = picture;
        await user.save();
      }
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const encryptedToken = CryptoJS.AES.encrypt(token, process.env.AES_SECRET).toString();

    res.json({ 
      token: encryptedToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.username,
        avatar: user.profilePicture || picture
      }
    });
  } catch (err) {
    console.error('Google auth error:', err.message);
    res.status(500).json({ msg: 'Server error during Google authentication' });
  }
};
