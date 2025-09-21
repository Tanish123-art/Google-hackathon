import React, { useState } from 'react';
import axios from 'axios';

const SignupDebugPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Testing signup with:', formData);
      console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
      
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, formData);
      setResult(response.data);
      console.log('Success:', response.data);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Signup Debug Page</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Testing...' : 'Test Signup'}
        </button>
      </form>

      {result && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#d4edda', 
          border: '1px solid #c3e6cb',
          borderRadius: '4px'
        }}>
          <h3>Success Response:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#f8d7da', 
          border: '1px solid #f5c6cb',
          borderRadius: '4px'
        }}>
          <h3>Error Response:</h3>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p><strong>Backend URL:</strong> {import.meta.env.VITE_BACKEND_URL}</p>
        <p><strong>Current Time:</strong> {new Date().toISOString()}</p>
      </div>
    </div>
  );
};

export default SignupDebugPage;
