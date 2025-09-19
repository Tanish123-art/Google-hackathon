import React, { useState } from 'react';
import { SignInFormData } from './types/auth';
import './auth.css';

interface SignInFormProps {
  onSubmit: (data: SignInFormData) => void;
  onSwitchToSignUp: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignInForm: React.FC<SignInFormProps> = ({ 
  onSubmit, 
  onSwitchToSignUp, 
  isLoading = false,
  error 
}) => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }

    setFormError(null);
    if (remember) {
      localStorage.setItem('last_signin_email', formData.email);
    } else {
      localStorage.removeItem('last_signin_email');
    }
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="auth-form">
      <div className="auth-card">
        <h2 className="auth-title">
          Sign In
        </h2>
        <div className="text-xs mb-3 text-gray-600 dark:text-gray-300">
          Demo account: <code>demo@counselling.app</code> / <code>Demo@123</code>
        </div>

        {/* Google button is rendered in the page above this form */}

        {/* Divider moved to page to separate Google button and the form */}
        
        {(error || formError) && (
          <div className="auth-error">
            <p>{formError ?? error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} noValidate>
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
        
        <div className="auth-switch">
          <p>
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignUp}
              className="auth-switch-btn"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;