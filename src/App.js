import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbot from "./Component/Chatbot";
import Homepage from "./Component/Homepage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/be-pet-experts" element={<Chatbot />} />
          <Route path="/view-all-pets" element={<Chatbot />} />

          {/* <Route path="/adopt-pet" component={AdoptPet} />
          <Route path="/donate" component={Donate} />
          <Route path="/lost-and-found" component={LostAndFoundPage} /> */}
        </Routes>
      </div>
    </Router>
  );
}
