import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../AuthLayout';
import SignInForm from '../SignInForm';
import { SignInFormData } from '../types/auth';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (data: SignInFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo account support
      const demoEmail = 'demo@counselling.app';
      const demoPassword = 'Demo@123';

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
        
        navigate('/');
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

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Sign in to continue your career journey and access personalized recommendations."
    >
      <SignInForm
        onSubmit={handleSignIn}
        onSwitchToSignUp={handleSwitchToSignUp}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
};

export default SignInPage;
