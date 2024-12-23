import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbot from "./Component/Chatbot";
import Homepage from "./Component/Homepage";
import EditProfilePage from "./Component/EditProfilePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/be-pet-experts" element={<Chatbot />} />
          <Route path="/view-all-pets" element={<Chatbot />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
// <div className="App">
//   <Chatbot />
//   <Homepage />
// </div>
