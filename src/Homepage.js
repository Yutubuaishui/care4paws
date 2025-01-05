import React from "react";
import Landing from "./component/Landing/Landing";
import About_Us from "./component/About_Us/About_Us";
import WhatWeOffer from "./component/WhatWeOffer/WhatWeOffer";
import Testimonials from "./component/Testimonials/Testimonials";
import JoinUs from "./component/JoinUs/JoinUs";
import ContactUs from "./component/ContactUs/ContactUs";

function Homepage() {
  return (
    <div>
      <Landing />
      <About_Us />
      <WhatWeOffer />
      <Testimonials />
      <JoinUs />
      <ContactUs />  
    </div>
  );
}

export default Homepage;