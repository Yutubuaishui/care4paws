import { useState } from 'react';
import { registerUser } from '../api';
import Header from '../components/Header';

function RegisterPage() {
    console.log("RegisterPage component rendered!");

    // Include email in the formData state
    const [formData, setFormData] = useState({ email: '', username: '', password: '', role: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData); // Send formData including email
            alert('Registration successful');
        } catch (err) {
            console.error(err);
            alert('Error during registration');
        }
    };

    return (
        <div>
            <Header />
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                    type="email"
                    required
                />
                <input
                    name="username"
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    required
                />
                <select
                    name="role"
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="coordinator">Coordinator</option>
                    <option value="user">User</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
