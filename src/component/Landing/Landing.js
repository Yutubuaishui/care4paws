import React from "react";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <nav>
          <ul className="nav-list">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
          <button className="login-button">Login</button>
        </nav>
      </header>
      <main>
      <h1 className="main-title">Care4Paws</h1>
        <div className="buttons">
          <button>Find a Pet</button>
          <button>Report Lost</button>
          <button>Get Involved</button>
        </div>
      </main>
    </div>
  );
}

export default Landing;