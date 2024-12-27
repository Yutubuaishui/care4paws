import React from 'react';
import './About_Us.css';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <div className="about-us-left">
                <h1 class="about-us-title">About Us</h1>
                <p>
                    We’re passionate about improving the lives of pets and the people who love them. Through innovative tools and a supportive community, we connect animals in need with caring families, reunite lost pets with their owners, and provide resources to support responsible pet ownership.
                </p>
            </div>
            <div className="about-us-right">
                {/* Future image or content goes here */}
            </div>
        </div>
    );
};

export default AboutUs;