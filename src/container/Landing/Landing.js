import React from "react";
import "./Landing.css";
import About_Us from "./About_Us/About_Us";
import WhatWeOffer from "./WhatWeOffer/WhatWeOffer";
import Testimonials from "./Testimonials/Testimonials";
import JoinUs from "./JoinUs/JoinUs";
import ContactUs from "./ContactUs/ContactUs";

const Landing = () => {
  return (
    <div className="landing-page">
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
        <div id="about">
          <About_Us />
        </div>
        <div id="services">
          <WhatWeOffer />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="join">
          <JoinUs />
        </div>
        <div id="contact">
          <ContactUs />
        </div>
      </main>
    </div>
  );
};

export default Landing;