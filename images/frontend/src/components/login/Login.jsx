import React, { useState } from 'react';
import axios from 'axios';
import "../login/login.scss"

const Login = ({ onLoginSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:80/users', {
        firstName: firstName,
        lastName: lastName,
      });
      console.log(response.data);
      if (response.data) {
        onLoginSuccess(response.data);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
