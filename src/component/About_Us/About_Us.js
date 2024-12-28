import React from 'react';
import './About_Us.css';
import AboutUsPageImage from '../../assets/AboutUsPageImage.jpg';

const AboutUs = () => {
    return (
        <div className="common-container">
            <div className="about-us-content">
                <div className="about-us-left">
                    <h1 className="about-us-title">About Us</h1>
                    <p className="about-us-text">
                        We’re passionate about improving the lives of pets and the people who love them. Through innovative tools and a supportive community, we connect animals in need with caring families, reunite lost pets with their owners, and provide resources to support responsible pet ownership.
                    </p>
                </div>
                <div className="about-us-right">
                    <img className="about-us-image" src={AboutUsPageImage} alt="About Us" />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;