import React, { useState } from 'react';
import { SignInFormData, SignUpFormData } from '../types/auth';
import '../auth/auth.css';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onSubmit: (data: SignInFormData | SignUpFormData) => void;
  onSwitchMode: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthForm: React.FC<AuthFormProps> = ({ 
  mode,
  onSubmit, 
  onSwitchMode, 
  isLoading = false,
  error 
}) => {
  const [signInData, setSignInData] = useState<SignInFormData>({
    email: '',
    password: ''
  });
  const [signUpData, setSignUpData] = useState<SignUpFormData>({
    fullName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Debug logging
  console.log('AuthForm received error:', error);
  console.log('AuthForm formError:', formError);
  const [remember, setRemember] = useState(true);

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score; // 0..4
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(signInData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (signInData.password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }

    setFormError(null);
    if (remember) {
      localStorage.setItem('last_signin_email', signInData.email);
    } else {
      localStorage.removeItem('last_signin_email');
    }
    onSubmit(signInData);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!signUpData.fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!emailRegex.test(signUpData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (getPasswordStrength(signUpData.password) < 2) {
      setFormError('Use a stronger password (8+ chars, numbers, capital letters).');
      return;
    }
    if (!signUpData.agreeToTerms) {
      setFormError('Please agree to the Terms & Conditions.');
      return;
    }

    setFormError(null);
    onSubmit(signUpData);
  };

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setSignUpData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const strength = getPasswordStrength(signUpData.password);

  return (
    <div className="auth-form">
      <div className="auth-card">
        <h2 className="auth-title">
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </h2>
        
        {mode === 'signin' && (
          <div className="text-xs mb-3 text-gray-600 dark:text-gray-300">
            Demo account: <code>demo@counselling.app</code> / <code>Demo@123</code>
          </div>
        )}

        {(error || formError) && (
          <div className="auth-error" style={{ 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            padding: '10px', 
            borderRadius: '4px', 
            marginBottom: '15px',
            border: '1px solid #f5c6cb'
          }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>{formError ?? error}</p>
          </div>
        )}
        
        {mode === 'signin' ? (
          <form onSubmit={handleSignInSubmit} noValidate>
            <div className="auth-form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={signInData.email}
                onChange={handleSignInChange}
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
                value={signInData.password}
                onChange={handleSignInChange}
                required
                className="auth-input"
                autoComplete="current-password"
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
            
            <div className="auth-row-between">
              <label className="auth-remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <button
                type="button"
                className="auth-forgot-password"
              >
                Forgot Password?
              </button>
            </div>
            
            <div className="auth-form-group">
              <button
                type="submit"
                disabled={isLoading}
                className="auth-submit-btn auth-submit-btn-full"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignUpSubmit} noValidate>
            <div className="auth-form-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={signUpData.fullName}
                onChange={handleSignUpChange}
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
                value={signUpData.email}
                onChange={handleSignUpChange}
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
                value={signUpData.password}
                onChange={handleSignUpChange}
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

            {signUpData.password && (
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
                checked={signUpData.agreeToTerms}
                onChange={handleSignUpChange}
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
        )}
        
        <div className="auth-switch">
          <p>
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={onSwitchMode}
              className="auth-switch-btn"
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
