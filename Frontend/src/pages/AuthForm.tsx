import React, { useState } from 'react';
import { SignInFormData, SignUpFormData } from '../types/auth';
import '../auth.css';

type AuthMode = 'signin' | 'signup';

interface AuthFormProps {
  mode: AuthMode;
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
  const [formData, setFormData] = useState<SignInFormData & SignUpFormData>({
    fullName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [remember, setRemember] = useState(true);

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score; // 0..4
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'signup') {
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
    } else {
      if (!emailRegex.test(formData.email)) {
        setFormError('Please enter a valid email address.');
        return;
      }
      if (formData.password.length < 6) {
        setFormError('Password must be at least 6 characters.');
        return;
      }
    }

    setFormError(null);
    
    if (mode === 'signin' && remember) {
      localStorage.setItem('last_signin_email', formData.email);
    } else if (mode === 'signin') {
      localStorage.removeItem('last_signin_email');
    }
    
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const strength = getPasswordStrength(formData.password);
  const isSignUp = mode === 'signup';

  return (
    <div className="auth-form">
      <div className="auth-card">
        <h2 className="auth-title">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h2>
        
        {!isSignUp && (
          <div className="text-xs mb-3 text-gray-600 dark:text-gray-300">
            Demo account: <code>demo@counselling.app</code> / <code>Demo@123</code>
          </div>
        )}

        {/* Google button is rendered in the page above this form */}
        {/* Divider moved to page to separate Google button and the form */}
        
        {(error || formError) && (
          <div className="auth-error">
            <p>{formError ?? error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} noValidate>
          {isSignUp && (
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
          )}
          
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
              autoComplete={isSignUp ? "new-password" : "current-password"}
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

          {isSignUp && formData.password && (
            <div className={`auth-password-meter strength-${strength}`}>
              <span />
              <span />
              <span />
              <span />
            </div>
          )}
          
          {!isSignUp && (
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
          )}
          
          {isSignUp && (
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
          )}
          
          <div className="auth-form-group">
            <button
              type="submit"
              disabled={isLoading}
              className="auth-submit-btn auth-submit-btn-full"
            >
              {isLoading 
                ? (isSignUp ? 'Creating Account...' : 'Signing In...') 
                : (isSignUp ? 'Create Account' : 'Sign In')
              }
            </button>
          </div>
        </form>
        
        <div className="auth-switch">
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
            <button
              onClick={onSwitchMode}
              className="auth-switch-btn"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
