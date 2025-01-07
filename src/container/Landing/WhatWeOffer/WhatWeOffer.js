import React from 'react';
import './WhatWeOffer.css';
import Service1Image from '../../../assets/LostAndFound.png';
import Service2Image from '../../../assets/PetCommunity.png';
import Service3Image from '../../../assets/Adoption.png';
import Service4Image from '../../../assets/EduAndDonation.png';

const WhatWeOffer = () => {
    return (
        <div className="what-we-offer-page">
            <div className="common-container">
                <h1 className="what-we-offer-title">What We Offer</h1>
                <div className="services">
                    <div className="service">
                        <img src={Service1Image} alt="Service 1" className="service-image" />
                        <h2 className="service-title">Lost & Found</h2>
                        <p className="service-description">Reunite lost pets with their families quickly</p>
                    </div>
                    <div className="service">
                        <img src={Service2Image} alt="Service 2" className="service-image" />
                        <h2 className="service-title">Pet Community</h2>
                        <p className="service-description">Connect with other pet lovers and exclusive rewards</p>
                    </div>
                    <div className="service">
                        <img src={Service3Image} alt="Service 3" className="service-image" />
                        <h2 className="service-title">Adoption</h2>
                        <p className="service-description">Find your new best friend through our adoption services</p>
                    </div>
                    <div className="service">
                        <img src={Service4Image} alt="Service 4" className="service-image" />
                        <h2 className="service-title">Education & Donation</h2>
                        <p className="service-description">Learn and contribute to our cause</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatWeOffer;