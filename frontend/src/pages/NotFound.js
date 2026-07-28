import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '6rem', color: '#e74c3c', margin: '0' }}>404</h1>
      <h2 style={{ color: '#2c3e50' }}>Oops! Page Not Found</h2>
      <p style={{ color: '#7f8c8d', maxWidth: '400px' }}>
        The page you are looking for doesn't exist or has been moved. 
        You will be redirected to our home page in a few seconds.
      </p>
      <button 
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px',
          padding: '12px 25px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Go Back Home Now
      </button>
    </div>
  );
};

export default NotFound;