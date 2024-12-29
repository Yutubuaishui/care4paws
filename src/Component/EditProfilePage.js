import React, { useState } from "react";

import SidebarAndNavbar from "./SidebarAndNavbar";
import Navbar from "./Navbar";
// import EditIcon from "../Assets/edit-icon.svg";
import ProfilePic from "../Assets/ProfilePic1.jpg";
import "./EditProfilePage.css";

const EditProfilePage = () => {
  const [profileImage, setProfileImage] = useState(ProfilePic);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };
  return (
    <div className="EditProfilePage">
      <Navbar />
      <div className="bottom">
        <SidebarAndNavbar />
        <div className="editProfileContainer">
          <div className="editProfileHeader">
            <h1>Edit Profile</h1>
            <div className="profileImageWrapper">
              <img src={profileImage} alt="Profile" className="profileImage" />
              <button
                className="editImageButton"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                ✏️
              </button>
              <input
                type="file"
                id="imageUpload"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <form className="editProfileForm">
            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="firstName">First name</label>
                <input type="text" id="firstName" placeholder="First name" />
              </div>
              <div className="formGroup">
                <label htmlFor="lastName">Last name</label>
                <input type="text" id="lastName" placeholder="Last name" />
              </div>
            </div>
            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="email">Email or phone number</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email or phone number"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="dob">Date of birth (mm/dd/yyyy)</label>
                <input type="text" id="dob" placeholder="MM/DD/YYYY" />
              </div>
            </div>
            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Password" />
              </div>
              <div className="formGroup">
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <div className="formActions">
              <button type="button" className="cancelButton">
                Cancel
              </button>
              <button type="submit" className="saveButton">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
