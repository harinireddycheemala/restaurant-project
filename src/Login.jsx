import React, { useState } from 'react';
import './LoginStyles.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = "/home"; 
  };

  return (
    <div className="login-container">
      <div className="left-half"></div>
      <div className="right-half">
        <div className="login-box">
          <div className="logo-small">SmartCrave</div>
          <h1 className="welcome-text">Welcome Back</h1>
          <p className="sub-text">Log in to manage your reservations and orders.</p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" className="form-control" placeholder="name@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="form-control" placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn-primary">Log In</button>
          </form>
          <a href="#" className="forgot-password">Forgot your password?</a>
          <div className="divider"><span>Or continue with</span></div>
          <div className="social-grid">
            <a href="/home" className="social-btn google"><i className="fab fa-google"></i> Google</a>
            <a href="/home" className="social-btn fb"><i className="fab fa-facebook-f"></i> Facebook</a>
            <a href="/home" className="social-btn microsoft"><i className="fab fa-microsoft"></i> Microsoft</a>
            <a href="/home" className="social-btn apple"><i className="fab fa-apple"></i> Apple</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
