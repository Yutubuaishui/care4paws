import React, { useState } from "react";
import './LoginPage.css';
import care4pawsLogo from "../asset/Logo_Care4Paws.png";
import GoogloLogo from "../asset/Logo_Google.png";
import { Link, useLocation } from "react-router-dom";

function LoginPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const location = useLocation(); // Get the current URL path
  
    return (
      <div className="login-container">
        <div className= "first-container">
        <div className="welcome-section">
          <h1>Welcome to <span className="care4paws-title">Care4Paws</span></h1>
          <p>Find your loyal companion and connect with fellow pet lovers.<br />
            Together, we can share, care, and make a difference.
          </p>
          <Link to="/register" className="join-link">Join Us Today!</Link>
          <div className="logo-container">
            <img src={care4pawsLogo} alt="Care4Paws Logo" className="logo" />

          </div>
        </div>
        <div className="login-section">
          <div className="language-and-auth">
            <select className="language-select">
              <option>English</option>
              <option>Chinese</option>
            </select>
            <div>
            <Link 
              to="/" 
              className={`auth-link ${location.pathname === '/' ? 'bold-link' : ''}`} // Add bold-link if on login page
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className={`auth-link ${location.pathname === '/register' ? 'bold-link' : ''}`} // Add bold-link if on register page
            >
              Register
            </Link>
            </div>
          </div>
          <form className="login-form">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
            <label>Password</label>
            <div className="password-input">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "👁️" : "🙈"}
              </button>
            </div>
            <div className="remember-forgot">
            <label>
                <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password" className="forgot-password-link">Forgot Password</a>
            </div>

            <button type="submit" className="login-btn">Sign in</button>
            <p className="or-divider">Or</p>
            <button type="button" className="google-login-btn">
            <img src={GoogloLogo} alt="Google" />
            Sign in with Google
            </button>
          </form>
        </div>
        </div>
      <footer>
        Copyright © Care4Paws, 2020 - 2024. All rights reserved.
      </footer>
      </div>
    );
  }
  
  export default LoginPage;