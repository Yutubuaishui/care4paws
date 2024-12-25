import React from "react";
import HomeIcon from "../Assets/home-icon.svg";
import AdoptIcon from "../Assets/adopt-icon.svg";
import LostAndFoundIcon from "../Assets/lost-pet-found-icon.png";
import CommunityIcon from "../Assets/community-icon.svg";
import EducationIcon from "../Assets/education-hub-icon.svg";
import DonationIcon from "../Assets/donation-icon.svg";

export const SidebarData = [
  {
    title: "Home",
    icon: <img src={HomeIcon} alt="Home Icon" className="icon" />,
    link: "/home",
  },
  {
    title: "Discover Cute Pet",
    icon: <img src={AdoptIcon} alt="Adopt Icon" className="icon" />,
    link: "/home",
  },
  {
    title: "Lost and Found Corner",
    icon: (
      <img src={LostAndFoundIcon} alt="Lost and Found Icon" className="lostAndFoundIcon" />
    ),
    link: "/home",
  },
  {
    title: "Explore Community",
    icon: <img src={CommunityIcon} alt="Community Icon" className="icon" />,
    link: "/home",
  },
  {
    title: "Be Pet Experts",
    icon: <img src={EducationIcon} alt="Education Icon" className="icon" />,
    link: "/be-pet-experts",
  },
  {
    title: "Donation",
    icon: <img src={DonationIcon} alt="Donation Icon" className="icon" />,
    link: "/home",
  },
];
