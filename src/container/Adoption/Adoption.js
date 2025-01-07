import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import SidebarAndNavbar from "../../Component/SidebarAndNavbar/SidebarAndNavbar";
import Navbar from "../../Component/Navbar/Navbar";
import "./Adoption.css";
import CrossIcon from "../../assets/cross-icon.png";
import LoveIcon from "../../assets/love-icon.png";
import Animal1 from "../../assets/animal1.jpg";
import Animal2 from "../../assets/animal2.jpg";
import Animal3 from "../../assets/animal3.jpg";

const Adoption = () => {
  const [currentTab, setCurrentTab] = useState("Swipe/Match");
  const [currentIndex, setCurrentIndex] = useState(0);
  const animals = [
    { img: Animal1, name: "Caesie", age: "2 years", gender: "Female", breed: "Labrador" },
    { img: Animal2, name: "Max", age: "3 years", gender: "Male", breed: "German Shepherd" },
    { img: Animal3, name: "Bella", age: "1 year", gender: "Female", breed: "Golden Retriever" },
  ];

  const handleSwipe = (direction) => {
    if (direction === "left" || direction === "right") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % animals.length);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
  });

  return (
    <div className="adoption-page">
      <Navbar />
      <div className="adoption-content">
        <SidebarAndNavbar />
        <div className="main-content">
          <div className="tab-navigation">
            <button
              className={currentTab === "Swipe/Match" ? "active" : ""}
              onClick={() => setCurrentTab("Swipe/Match")}
            >
              Swipe/Match
            </button>
            <button
              className={currentTab === "All Pets" ? "active" : ""}
              onClick={() => setCurrentTab("All Pets")}
            >
              All Pets
            </button>
          </div>
          {currentTab === "Swipe/Match" && (
            <div className="swipe-container" {...handlers}>
              <div className="photo-gallery">
                <div className="left-photo">
                  <img
                    src={animals[currentIndex].img}
                    alt="Animal"
                    className="animal-photo large"
                  />
                </div>
                <div className="right-photos">
                  {animals.map((animal, index) => (
                    index !== currentIndex && (
                      <img
                        key={index}
                        src={animal.img}
                        alt={`Animal ${index + 1}`}
                        className="animal-photo small"
                      />
                    )
                  ))}
                </div>
              </div>
              <div className="swipe-buttons">
                <button onClick={() => handleSwipe("left")}>
                  <img src={CrossIcon} alt="Cross" className="icon" />
                </button>
                <button onClick={() => handleSwipe("right")}>
                  <img src={LoveIcon} alt="Love" className="icon" />
                </button>
              </div>
            </div>
          )}
          {currentTab === "All Pets" && (
            <div className="all-pets">
              {animals.map((animal, index) => (
                <div key={index} className="pet-box">
                  <img src={animal.img} alt={`Animal ${index + 1}`} className="pet-photo" />
                  <div className="pet-details">
                    <p><strong>Name:</strong> {animal.name}</p>
                    <p><strong>Age:</strong> {animal.age}</p>
                    <p><strong>Gender:</strong> {animal.gender}</p>
                    <p><strong>Breed:</strong> {animal.breed}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Adoption;