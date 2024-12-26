import React, { useState } from "react";
import "./Register.css";
import care4pawsLogo from "../asset/Logo_Care4Paws.png";
import GoogloLogo from "../asset/Logo_Google.png";
import { Link } from "react-router-dom";

function Register() {
  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="register-container">
      
      <div className= "first-container">
              <div className="welcome-section">
                <h1>Welcome to <span className="care4paws-title">Care4Paws</span></h1>
                <p>Find your loyal companion and connect with fellow pet lovers.<br />
                  Together, we can share, care, and make a difference.
                </p>
   
                <div className="logo-container">
                  <img src={care4pawsLogo} alt="Care4Paws Logo" className="logo" />
        </div>
      </div>
      <div className="register-section">
        <h2>Register</h2>
        <p>First create your account.</p>
        <form className="register-form">
          <div className="form-row">
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
          </div>
          <div className="form-row">
            <input type="email" placeholder="Email or phone number" />
            <input type="date" placeholder="Date of birth" />
          </div>
          <div className="form-row">
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm password" />
          </div>
          <div className="role-row">
          <p className="role-title">Set Role:</p>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={handleRoleChange}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="shelter"
                  checked={role === "shelter"}
                  onChange={handleRoleChange}
                />
                Shelter
              </label>
            </div>
          <div className="checkbox-row">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <label>
              <input type="checkbox" /> I agree to the Terms and Privacy policy
            </label>
          </div>
          <button type="submit" className="create-account-btn">Create account</button>
          <button type="button" className="google-signin-btn">
            <img src={GoogloLogo} alt="Google" />
            Sign in with Google
          </button>
        </form>
        <p>Already have an account? <Link to="/">Sign In</Link></p>
      </div>
      
      </div>
      <footer>
        Copyright © Care4Paws, 2020 - 2024. All rights reserved.
      </footer>
    </div>
    
  );
}

export default Register;
