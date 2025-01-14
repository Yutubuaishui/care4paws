import React from "react";
import { ReactComponent as HomeIcon } from "../Assets/home-icon.svg";
import { ReactComponent as AdoptIcon } from "../Assets/adopt-icon.svg";
import LostAndFoundIcon from "../Assets/lost-pet-found-icon.png";
import { ReactComponent as CommunityIcon } from "../Assets/community-icon.svg";
import { ReactComponent as EducationIcon } from "../Assets/education-hub-icon.svg";
import { ReactComponent as Donationicon } from "../Assets/donation-icon.svg";

export const SidebarDataU = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/user",
  },
  {
    title: "Discover Cute Pet",
    icon: <AdoptIcon />,
    link: "/user",
  },
  {
    title: "Lost and Found Corner",
    icon: (
      <img src={LostAndFoundIcon} alt="Adopt" className="lostAndFoundIcon" />
    ),
    link: "/user/reportpet",
  },
  {
    title: "Explore Community",
    icon: <CommunityIcon />,
    link: "/user",
  },
  {
    title: "Be Pet Experts",
    icon: <EducationIcon />,
    link: "user/be-pet-experts",
  },
  {
    title: "Donation",
    icon: <Donationicon />,
    link: "/user/donation",
  },
];
