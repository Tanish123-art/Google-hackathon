import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

export default function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const bytes = CryptoJS.AES.decrypt(token, process.env.AES_SECRET);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
    const decoded = jwt.verify(decryptedToken, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

