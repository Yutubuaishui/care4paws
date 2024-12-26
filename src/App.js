import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './component/Register';
import LoginPage from './component/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
