import React from "react";
import Landing from "./component/Landing/Landing";
import About_Us from "./component/About_Us/About_Us";
import WhatWeOffer from "./component/WhatWeOffer/WhatWeOffer";
// import Testimonials from "./components/Testimonials";
// import JoinAsMember from "./components/JoinAsMember";
// import ContactUs from "./components/ContactUs";

function Homepage() {
  return (
    <div>
      <Landing />
      <About_Us />
      <WhatWeOffer />
      {/* <Testimonials />
      <JoinAsMember />
      <ContactUs />   */}
    </div>
  );
}

export default Homepage;