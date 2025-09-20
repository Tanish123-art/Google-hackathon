import React from 'react';
import Header from '../components/Header';
import './auth.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="auth-container">
      <Header />
      
      <div className="auth-layout">
        {/* Left Side - Welcome Message */}
        <div className="auth-sidebar hidden lg:flex">
          <div className="auth-sidebar-content">
            <h1>
              {title}
            </h1>
            <p>
              {subtitle}
            </p>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <div className="auth-form-container">
          <div className="auth-form glass-card section-enter section-enter-active">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
