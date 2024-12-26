import React, { useState } from "react";
import "./PasswordToggle.css";

const PasswordToggle = ({ placeholder }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="password-in">
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder={placeholder}
        required
      />
      <button
        type="button"
        className="toggle-pass"
        onClick={togglePasswordVisibility}
      >
        {passwordVisible ? "👁️" : "🙈"}
      </button>
    </div>
  );
};

export default PasswordToggle;
