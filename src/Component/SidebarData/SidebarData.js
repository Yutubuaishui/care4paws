import React from "react";
import { ReactComponent as HomeIcon } from "../../assets/home-icon.svg";
import { ReactComponent as AdoptIcon } from "../../assets/adopt-icon.svg";
import LostAndFoundIcon from "../../assets/lost-pet-found-icon.png";
import { ReactComponent as CommunityIcon } from "../../assets/community-icon.svg";
import { ReactComponent as EducationIcon } from "../../assets/education-hub-icon.svg";
import { ReactComponent as Donationicon } from "../../assets/donation-icon.svg";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/home",
  },
  {
    title: "Discover Cute Pet",
    icon: <AdoptIcon />,
    link: "/adopt-pet",
  },
  {
    title: "Lost and Found Corner",
    icon: (
      <img src={LostAndFoundIcon} alt="Adopt" className="lostAndFoundIcon" />
    ),
    link: "/home",
  },
  {
    title: "Explore Community",
    icon: <CommunityIcon />,
    link: "/home",
  },
  {
    title: "Be Pet Experts",
    icon: <EducationIcon />,
    link: "/be-pet-experts",
  },
  {
    title: "Donation",
    icon: <Donationicon />,
    link: "/home",
  },
];