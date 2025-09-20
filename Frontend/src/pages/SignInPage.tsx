import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../contexts/AuthLayout';
import { SignInFormData } from '../types/auth';
import { initGoogleSignIn, renderGoogleButton, parseJwt } from '../utils/googleAuth';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleSignIn = async (data: SignInFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo account support
      const demoEmail = 'demo@counselling.app';

      // For demo purposes, accept any email/password
      if (data.email && data.password) {
        // Store user data in localStorage
        const userData = {
          id: '1',
          fullName: data.email === demoEmail ? 'Demo User' : 'New User',
          email: data.email,
          avatar: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          location: 'Bengaluru, India',
          createdAt: new Date()
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        if (typeof window !== 'undefined') {
          window.location.replace('/');
        } else {
          navigate('/', { replace: true });
        }
      } else {
        setError('Please enter valid credentials');
      }
    } catch (err) {
      setError('An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToSignUp = () => {
    navigate('/signup');
  };

  const handleGoogleCredential = (credential: string) => {
    const payload = parseJwt(credential);
    if (!payload) return;
    const userData = {
      id: payload.sub,
      fullName: `${payload.name ?? payload.given_name ?? ''}`.trim() || 'Google User',
      email: payload.email,
      avatar: payload.picture,
      location: '—',
      createdAt: new Date()
    };
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    if (typeof window !== 'undefined') {
      window.location.replace('/');
    } else {
      navigate('/', { replace: true });
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
    handleSignIn(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Sign in to continue your career journey and access personalized recommendations."
    >
      <div className="mb-3">
        <div ref={googleDivRef} />
      </div>
      <div className="auth-or"><span>or</span></div>
      <div className="auth-form">
        <div className="auth-card">
          <h2 className="auth-title">
            Sign In
          </h2>
          <div className="text-xs mb-3 text-gray-600 dark:text-gray-300">
            Demo account: <code>demo@counselling.app</code> / <code>Demo@123</code>
          </div>
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
                onClick={handleSwitchToSignUp}
                className="auth-switch-btn"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
