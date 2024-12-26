import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './component/Register';
import LoginPage from './component/LoginPage';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import the GoogleOAuthProvider

function App() {
  return (
    <GoogleOAuthProvider clientId="950088629547-fc39n2kf17m9c7ehdk0tkucl4kn8jc0m.apps.googleusercontent.com">
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
