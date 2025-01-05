import React from 'react';
import './ContactUs.css';
import Logo from '../../assets/Logo.png'; 
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="contactus-page">
      <div className="contactus-section left-most">
        <h2>Care4Paws</h2>
        <img src={Logo} alt="Care4Paws Logo" className="logo" />
      </div>
      <div className="contactus-section middle-left">
        <h3>Menu</h3>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="contactus-section middle-right">
        <h3>Contact</h3>
        <p>Pawfections@contact.com</p>
        <p>+012-345-6789</p>
        <p>9889 Lorem Ipsum street, Pellentesque, CA, USA</p>
      </div>
      <div className="contactus-section right-most">
        <h3>Social</h3>
        <div className="social-icons">
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;