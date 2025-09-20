import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../contexts/AuthLayout';
import { SignUpFormData } from '../types/auth';
import { initGoogleSignIn, renderGoogleButton, parseJwt } from '../utils/googleAuth';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score; // 0..4
  };

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any valid data
      if (data.fullName && data.email && data.password && data.agreeToTerms) {
        // Store user data in localStorage
        const userData = {
          id: '1',
          fullName: data.fullName,
          email: data.email,
          avatar: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          location: 'Bengaluru, India',
          createdAt: new Date()
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        if (typeof window !== 'undefined') {
          window.location.replace('/onboarding');
        } else {
          navigate('/onboarding', { replace: true });
        }
      } else {
        setError('Please fill in all required fields and agree to terms');
      }
    } catch (err) {
      setError('An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToSignIn = () => {
    navigate('/signin');
  };

  const handleGoogleCredential = (credential: string) => {
    const payload = parseJwt(credential);
    if (!payload) return;
    const userData = {
      id: payload.sub,
      fullName: payload.name ?? 'Google User',
      email: payload.email,
      avatar: payload.picture,
      location: '—',
      createdAt: new Date()
    };
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    if (typeof window !== 'undefined') {
      window.location.replace('/onboarding');
    } else {
      navigate('/onboarding', { replace: true });
    }
  };

  const googleDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    initGoogleSignIn((cred) => { if (mounted) handleGoogleCredential(cred); }).then(() => {
      if (googleDivRef.current) {
        renderGoogleButton(googleDivRef.current);
      }
    }).catch((error) => {
      console.error('Google Sign-In initialization failed:', error);
      // Still try to render the button even if initialization fails
      if (googleDivRef.current) {
        try {
          renderGoogleButton(googleDivRef.current);
        } catch (renderError) {
          console.error('Failed to render Google button:', renderError);
        }
      }
    });
    return () => { mounted = false; };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (getPasswordStrength(formData.password) < 2) {
      setFormError('Use a stronger password (8+ chars, numbers, capital letters).');
      return;
    }
    if (!formData.agreeToTerms) {
      setFormError('Please agree to the Terms & Conditions.');
      return;
    }

    setFormError(null);
    handleSignUp(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <AuthLayout
      title="Start Your Career Journey!"
      subtitle="Join thousands of professionals who are advancing their careers with personalized guidance and opportunities."
    >
      <div className="mb-3">
        <div ref={googleDivRef} />
      </div>
      <div className="auth-or"><span>or</span></div>
      <div className="auth-form">
        <div className="auth-card">
          <h2 className="auth-title">
            Create Account
          </h2>
          {(error || formError) && (
            <div className="auth-error">
              <p>{formError ?? error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-form-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="auth-input"
                autoComplete="name"
              />
            </div>
            <div className="auth-form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="auth-input"
                autoComplete="email"
              />
            </div>
            <div className="auth-form-group auth-password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="auth-input"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-toggle-password"
                onClick={() => setShowPassword(s => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {formData.password && (
              <div className={`auth-password-meter strength-${strength}`}>
                <span />
                <span />
                <span />
                <span />
              </div>
            )}
            <div className="auth-checkbox-group">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="auth-checkbox"
              />
              <label htmlFor="agreeToTerms" className="auth-checkbox-label">
                I agree to the{' '}
                <a href="#" className="auth-link">
                  Terms & Conditions
                </a>
              </label>
            </div>
            <div className="auth-form-group">
              <button
                type="submit"
                disabled={isLoading}
                className="auth-submit-btn auth-submit-btn-full"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
          <div className="auth-switch">
            <p>
              Already have an account?{' '}
              <button
                onClick={handleSwitchToSignIn}
                className="auth-switch-btn"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
