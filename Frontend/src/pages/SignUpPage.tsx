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
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
          username: data.fullName,
          email: data.email,
          password: data.password,
        });
        localStorage.setItem('token', res.data.token);
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

  const handleSwitchMode = () => {
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
