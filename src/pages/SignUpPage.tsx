import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../AuthLayout';
import SignUpForm from '../SignUpForm';
import { SignUpFormData } from '../types/auth';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any valid data
      if (data.fullName && data.email && data.password && data.agreeToTerms) {
        // Store user data in localStorage
        const userData = {
          id: '1',
          fullName: data.fullName,
          email: data.email,
          avatar: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          location: 'Bengaluru, India',
          createdAt: new Date()
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        navigate('/onboarding');
      } else {
        setError('Please fill in all required fields and agree to terms');
      }
    } catch (err) {
      setError('An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToSignIn = () => {
    navigate('/signin');
  };

  return (
    <AuthLayout
      title="Start Your Career Journey!"
      subtitle="Join thousands of professionals who are advancing their careers with personalized guidance and opportunities."
    >
      <SignUpForm
        onSubmit={handleSignUp}
        onSwitchToSignIn={handleSwitchToSignIn}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
};

export default SignUpPage;
