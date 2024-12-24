import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import UserDashboard from './pages/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/coordinator" element={<ProtectedRoute allowedRoles={['admin', 'coordinator']}><CoordinatorDashboard /></ProtectedRoute>} />
                <Route path="/user" element={<ProtectedRoute allowedRoles={['admin', 'user']}><UserDashboard /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
