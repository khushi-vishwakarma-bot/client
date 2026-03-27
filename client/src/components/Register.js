import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    // Adding a loading state to prevent multiple clicks
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { name, email, password } = formData;

    // Updates the state as the user types
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        try {
            // Updated to include basic headers for JSON communication
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const res = await axios.post('http://localhost:5000/api/register', formData, config);
            
            if (res.data.success) {
                alert("Registration Successful! Welcome to DesiDelight.");
                // Reset form
                setFormData({ name: '', email: '', password: '' });
                navigate('/login'); 
            }
        } catch (err) {
            // Improved error handling to catch specific backend messages
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-container">
            <div className="auth-form">
                <h2>Sign Up for DesiDelight</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={name} 
                            onChange={onChange} 
                            placeholder="Enter your name" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={onChange} 
                            placeholder="Enter your email" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={onChange} 
                            placeholder="Create a password" 
                            required 
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p>Already have an account? <span onClick={() => navigate('/login')} style={{cursor:'pointer', color:'orange'}}>Login here</span></p>
            </div>
        </div>
    );
};

export default Register;