import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import care4pawsLogo from "../asset/Logo_Care4Paws.png";
import GoogleLogo from "../asset/Logo_Google.png"; // Add the path to your Google logo image
import { Link, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLoginSuccess = (response) => {
    console.log("Google Login Success: ", response);
    // Handle the response from Google (e.g., send to your backend for authentication)
  };

  const handleLoginFailure = (error) => {
    console.log("Google Login Failure: ", error);
  };

  const location = useLocation();

  useEffect(() => {
    const customGoogleBtn = document.getElementById("custom-google-btn");
    if (customGoogleBtn) {
      customGoogleBtn.addEventListener("click", () => {
        const googleLoginButton = document.querySelector(".g_id_signin div[role=button]");
        if (googleLoginButton) {
          googleLoginButton.click();
        }
      });
    }

    return () => {
      if (customGoogleBtn) {
        customGoogleBtn.removeEventListener("click", () => {});
      }
    };
  }, []);

  return (
    <div className="login-container">
      <div className="first-container">
        <div className="welcome-section">
          <h1>
            Welcome to <span className="care4paws-title">Care4Paws</span>
          </h1>
          <p>
            Find your loyal companion and connect with fellow pet lovers.<br />
            Together, we can share, care, and make a difference.
          </p>
          <Link to="/register" className="join-link">
            Join Us Today!
          </Link>
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
                className={`auth-link ${location.pathname === "/" ? "bold-link" : ""}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`auth-link ${location.pathname === "/register" ? "bold-link" : ""}`}
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
              <a href="/forgot-password" className="forgot-password-link">
                Forgot Password
              </a>
            </div>

            <button type="submit" className="login-btn">
              Sign in
            </button>
            <p className="or-divider">Or</p>

            {/* Custom Google Button */}
            <button type="button" id="custom-google-btn" className="google-login-btn">
              <img src={GoogleLogo} alt="Google" className="google-logo" />
              Sign in with Google
            </button>

            {/* Hidden Default Google Button */}
            <div className="g_id_signin">
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                clientId="950088629547-fc39n2kf17m9c7ehdk0tkucl4kn8jc0m.apps.googleusercontent.com"
            />
            </div>

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
