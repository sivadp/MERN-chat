import React, { useState } from 'react';
import './LoginForm.css';
import {Chatter} from './Chatter';

export const LoginForm = ({ onClose }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });

      if (response.status === 200) {
        const user = await response.json(); // Parse the JSON response
      setIsLoggedIn(true);
      setLoggedInUser(user); // Set the user data in state
      } else  {
        window.alert('Invalid Credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  if (isLoggedIn) {
    return <Chatter user={loggedInUser} />;
  }

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-button-group">
          <button type="submit">Login</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};


