import React, { useState } from 'react';
import { SignUpFormData } from './types/auth';
import './auth.css';

interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => void;
  onSwitchToSignIn: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUpForm: React.FC<SignUpFormProps> = ({ 
  onSubmit, 
  onSwitchToSignIn, 
  isLoading = false,
  error 
}) => {
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

  return (
    <div className="auth-form">
      <div className="auth-card">
        <h2 className="auth-title">
          Create Account
        </h2>
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
              onClick={onSwitchToSignIn}
              className="auth-switch-btn"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;