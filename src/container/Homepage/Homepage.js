import { Link } from "react-router-dom";
import "./Homepage.css";
import Navbar from "../../Component/Navbar/Navbar";
import SidebarAndNavbar from "../../Component/SidebarAndNavbar/SidebarAndNavbar";
import Adopt1 from "../../assets/Adopt1.png";
import Adopt2 from "../../assets/Adopt2.png";
import Adopt3 from "../../assets/Adopt3.png";
import Adopt4 from "../../assets/Adopt4.png";
import LostAndFound from "../../assets/LostAndFound2.png";
import Donation from "../../assets/donation.png";

const Homepage = () => {
  return (
    <div className="Homepage">
      <Navbar />
      <div className="homebottom">
        <SidebarAndNavbar />
        <div className="wrappingModule">
          <div className="wrappingleft">
            <div className="wlt">
              <p className="bigText">
                Be the Light in Their Life: Help Homeless Animals Find a Safe
                Haven
              </p>
              <img src={Adopt1} alt="" className="bigTextImage" />
            </div>
            <div className="wlm">
              <p className="text">
                Looking for a loyal companion? Caesie is ready to join your
                family today!
              </p>
              <div className="galleryImages">
                <img src={Adopt2} alt="" />
                <img src={Adopt3} alt="" />
                <img src={Adopt4} alt="" />
              </div>
            </div>
            <div className="wlb">
              <Link to="/view-all-pets">
                <button>View All Pets</button>
              </Link>
              <Link to="/adopt-pet">
                <button>Adopt Them</button>
              </Link>
            </div>
          </div>
          <div className="wrappingright">
            <div className="donation">
              <p>Your Donation Saves Lives</p>
              <img src={Donation} alt="" />
              <Link to="/donate">
                <button>Donate Now</button>
              </Link>
            </div>
            <div className="lostAndFound">
              <p>Lost and Found</p>
              <div className="lafimages">
                <img src={Adopt3} alt="" />
                <img src={LostAndFound} alt="" />
              </div>
              <Link to="/lost-and-found">
                <button>View All</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;