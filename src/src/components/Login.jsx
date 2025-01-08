import React, { useState } from "react";

const Login = () => {
  const [toggle, setToggle] = useState(false);

  return toggle ? (
    <Register toggle={() => setToggle(false)} />
  ) : (
    <div>
      <h2>Login</h2>
      <form>{/* Add login form fields */}</form>
      <button onClick={() => setToggle(true)}>Register</button>
    </div>
  );
};

const Register = ({ toggle }) => (
  <div>
    <h2>Register</h2>
    <form>{/* Add register form fields */}</form>
    <button onClick={toggle}>Back to Login</button>
  </div>
);

export default Login;
