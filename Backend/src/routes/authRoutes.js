import express from 'express';
const router = express.Router();
import { signUp } from '../auth/signup.js';
import { onboarding } from '../auth/onboarding.js';
import auth from '../middleware/auth.js';
import { verifyOtp } from '../auth/verifyOtp.js';
import { signIn } from '../auth/signin.js';
import { forgotPassword } from '../auth/forgotPassword.js';
import { resetPassword } from '../auth/resetPassword.js';
import { googleAuth } from '../auth/googleAuth.js';

// @route   POST api/auth/signup
// @desc    Register user
// @access  Public
router.post('/signup', signUp);

// @route   POST api/auth/verify-otp
// @desc    Verify OTP
// @access  Public
router.post('/verify-otp', verifyOtp);

// @route   POST api/auth/signin
// @desc    Authenticate user & get token
// @access  Public
router.post('/signin', signIn);

// @route   POST api/auth/google
// @desc    Authenticate user with Google & get token
// @access  Public
router.post('/google', googleAuth);

// @route   POST api/auth/forgot-password
// @desc    Forgot password
// @access  Public
router.post('/forgot-password', forgotPassword);

// @route   POST api/auth/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password', resetPassword);

// @route   POST api/auth/onboarding
// @desc    Onboarding user
// @access  Private
router.post('/onboarding', auth, onboarding);

export default router;
