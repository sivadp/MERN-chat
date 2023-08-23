import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { SignupForm } from './components/signup';
import { LoginForm } from './components/login';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleLoginClick = () => {
    setActiveComponent('login');
  };

  const handleSignupClick = () => {
    setActiveComponent('signup');
  };

  const handleSuccessfulSignup = () => {
    setActiveComponent('login');
  };

  return (
    <Router>
      <div className="App">
        <div className="content-container">
          <div className="button-container">
            {activeComponent === null && (
              <>
                <button className="button login-button" onClick={handleLoginClick}>
                  <span>Login</span>
                </button>
                <button className="button signup-button" onClick={handleSignupClick}>
                  <span>Signup</span>
                </button>
              </>
            )}
          </div>

          {activeComponent === 'login' && (
            <LoginForm onClose={() => setActiveComponent(null)} />
          )}
          {activeComponent === 'signup' && (
            <SignupForm
              onSuccess={handleSuccessfulSignup}
              onClose={() => setActiveComponent(null)}
            />
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
