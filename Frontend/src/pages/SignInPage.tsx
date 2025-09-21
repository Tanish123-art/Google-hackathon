import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../auth/AuthLayout';
import AuthForm from './AuthForm';
import { SignInFormData, SignUpFormData } from '../types/auth';
import { initGoogleSignIn, renderGoogleButton, parseJwt } from '../utils/googleAuth';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (data: SignInFormData | SignUpFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      if ('email' in data && 'password' in data && data.email && data.password) {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`, {
          email: data.email,
          password: data.password,
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isAuthenticated', 'true');
        
        // Create user data object
        const userData = {
          email: data.email,
          username: data.email.split('@')[0], // Use email prefix as username
          fullName: data.email.split('@')[0],
          id: Date.now().toString(), // Temporary ID
          createdAt: new Date()
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Dispatch custom event to notify navbar of auth state change
        window.dispatchEvent(new CustomEvent('authStateChanged'));
        
        if (typeof window !== 'undefined') {
          window.location.replace('/dashboard');
        } else {
          navigate('/dashboard', { replace: true });
        }
      } else {
        setError('Please enter valid credentials');
      }
    } catch (err: any) {
      console.error('Signin error:', err);
      console.error('Error response:', err.response?.data);
      
      if (err.response?.data?.msg) {
        console.log('Setting error message:', err.response.data.msg);
        setError(err.response.data.msg);
      } else if (err.response?.status === 400) {
        setError('Invalid credentials. Please check your email and password.');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Network error. Please check your connection.');
      } else {
        setError('An error occurred during sign in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchMode = () => {
    navigate('/signup');
  };

  const handleGoogleCredential = async (credential: string) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Google credential received:', credential);

      // Send credential to backend for verification
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, {
        credential: credential
      });

      console.log('Google auth response:', response.data);

      // Store authentication data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Dispatch custom event to notify navbar of auth state change
      window.dispatchEvent(new CustomEvent('authStateChanged'));

      // Redirect to dashboard
      if (typeof window !== 'undefined') {
        window.location.replace('/dashboard');
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      console.error('Google auth error:', err);
      console.error('Error response:', err.response?.data);
      
      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else if (err.response?.status === 400) {
        setError('Invalid Google authentication. Please try again.');
      } else if (err.response?.status === 500) {
        setError('Server error during Google authentication. Please try again.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Network error. Please check your connection.');
      } else {
        setError('An error occurred during Google authentication. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const googleDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    initGoogleSignIn((cred) => { if (mounted) handleGoogleCredential(cred); }).then(() => {
      if (googleDivRef.current) {
        renderGoogleButton(googleDivRef.current);
      }
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Sign in to continue your career journey and access personalized recommendations."
    >
      <div className="mb-3">
        <div ref={googleDivRef} />
      </div>
      <div className="auth-or"><span>or</span></div>
      <AuthForm
        mode="signin"
        onSubmit={handleAuth}
        onSwitchMode={handleSwitchMode}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
};

export default SignInPage;
