// src/App.js
import React, { useState } from 'react';
import Login from '../login/Login';

const Hero = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <div className="hero">
      {user ? (
        <div>Welcome, {user.firstName} {user.lastName}!</div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Hero;
