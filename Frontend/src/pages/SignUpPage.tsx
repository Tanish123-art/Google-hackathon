import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../auth/AuthLayout';
import AuthForm from './AuthForm';
import { SignInFormData, SignUpFormData } from '../types/auth';
import { initGoogleSignIn, renderGoogleButton, parseJwt } from '../utils/googleAuth';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (data: SignInFormData | SignUpFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      if ('fullName' in data && 'agreeToTerms' in data && data.fullName && data.email && data.password && data.agreeToTerms) {
        const signupData = {
          username: data.fullName,
          email: data.email,
          password: data.password,
        };
        console.log('Sending signup request:', signupData);
        console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
        
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, signupData);
        localStorage.setItem('token', res.data.token);
        if (typeof window !== 'undefined') {
          window.location.replace('/onboarding');
        } else {
          navigate('/onboarding', { replace: true });
        }
      } else {
        setError('Please fill in all required fields and agree to terms');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      console.error('Error response:', err.response?.data);
      
      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else if (err.response?.status === 400) {
        setError('Invalid signup data. Please check your information.');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Network error. Please check your connection.');
      } else {
        setError('An error occurred during sign up. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchMode = () => {
    navigate('/signin');
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
      title="Start Your Career Journey!"
      subtitle="Join thousands of professionals who are advancing their careers with personalized guidance and opportunities."
    >
      <div className="mb-3">
        <div ref={googleDivRef} />
      </div>
      <div className="auth-or"><span>or</span></div>
      <AuthForm
        mode="signup"
        onSubmit={handleAuth}
        onSwitchMode={handleSwitchMode}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
};

export default SignUpPage;
