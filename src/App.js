import React, { useState, useEffect } from 'react';
import './App.css';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://dummyjson.com/auth';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedFullName = localStorage.getItem('fullName');
    if (token) {
      setIsAuthenticated(true);
      setFullName(storedFullName);
    }
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setFullName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        if (!isLogin) {
          const token = uuidv4();
          localStorage.setItem(email, JSON.stringify({ email, password, token }));
          localStorage.setItem('fullName', fullName);
          alert('Registration Successful! Please Login.');
          toggleForm();
        } else {
          const storedData = localStorage.getItem(email);
          if (storedData) {
            const { password: storedPassword, token } = JSON.parse(storedData);
            if (password === storedPassword) {
              localStorage.setItem('token', token);
              setIsAuthenticated(true);
              alert(`Welcome ${fullName}! Login Successful!`);
            } else {
              alert('Invalid Credentials!');
            }
          } else {
            alert('User not registered!');
          }
        }
      } catch (error) {
        alert('Operation Failed!');
      }
    } else {
      alert('Please fill all fields!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    setFullName('');
    alert('Logout Successful!');
  };

  return (
    <div className="container">
      {isAuthenticated && (
        <div className="logout-container">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {isAuthenticated ? (
        <div className="dashboard" style={{ border: 'none' }}>
          <h2>Welcome {fullName} to Your Dashboard!</h2>
        </div>
      ) : (
        <div className="form-wrapper">
          <div className="left-side">
            <img 
              src="https://storage.googleapis.com/a1aa/image/w6y3iULn6z45RKOeaslKCG7kWAkNqtUMAIBC1-6zf54.jpg" 
              alt="Illustration" 
            />
          </div>
          <div className="right-side">
            <h2>{isLogin ? 'Login to Your Account' : 'Save Your Account Now'}</h2>
            <p>Get unlimited forms and responses, Free forever</p>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="input-group">
                  <FaUser className="icon" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              )}
              <div className="input-group">
                <FaEnvelope className="icon" />
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <FaLock className="icon" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">
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
      )}
    </div>
  );
};

export default App;
