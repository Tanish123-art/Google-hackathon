import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo account support
      const demoEmail = 'demo@counselling.app';

      // For demo purposes, accept any email/password
      if ('email' in data && 'password' in data && data.email && data.password) {
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

  const handleSwitchMode = () => {
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
