import React, { useState } from 'react';
import './App.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="left-side">
          <img 
            src="https://storage.googleapis.com/a1aa/image/w6y3iULn6z45RKOeaslKCG7kWAkNqtUMAIBC1-6zf54.jpg" 
            alt="Illustration of a desk with a computer, lamp, and other office items" 
          />
        </div>
        <div className="right-side">
          <h2>{isLogin ? 'Login to Your Account' : 'Save You Account Now'}</h2>
          <p>Get unlimited type of forms, questions and responses, Free forever</p>
          <form>
            {!isLogin && (
              <div className="input-group">
                <FaUser className="icon" />
                <input type="text" placeholder="Full Name" />
              </div>
            )}
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input type="email" placeholder="E-mail" />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input type="password" placeholder="Password" />
            </div>
            <button type="button" onClick={toggleForm}>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <p>
            {isLogin ? 'Don’t have an account?' : 'Already have an account?'} 
            <span onClick={toggleForm} className="toggle-text">
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;