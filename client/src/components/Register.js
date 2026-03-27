import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { name, email, password } = formData;

    // Theme Palette
    const palette = { 
        primaryOrange: '#e67e22', 
        deepBrown: '#3a2e23', 
        softCream: '#fdfcf0',
        white: '#ffffff' 
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const res = await axios.post('http://localhost:5000/api/register', formData, config);
            
            if (res.data.success) {
                alert("Registration Successful! Welcome to DesiDelight.");
                setFormData({ name: '', email: '', password: '' });
                navigate('/login'); 
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // --- Modern UI Styles ---
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '75vh', // Centering between Header & Footer
            backgroundColor: palette.softCream,
            fontFamily: "'Poppins', sans-serif",
            padding: '20px'
        },
        card: {
            backgroundColor: palette.white,
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            width: '100%',
            maxWidth: '450px',
            textAlign: 'center'
        },
        title: {
            color: palette.deepBrown,
            marginBottom: '10px',
            fontSize: '1.8rem',
            fontWeight: 'bold'
        },
        subtitle: {
            color: '#666',
            marginBottom: '30px',
            fontSize: '0.9rem'
        },
        formGroup: {
            textAlign: 'left',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },
        label: {
            fontSize: '0.9rem',
            fontWeight: '600',
            color: palette.deepBrown,
            marginLeft: '4px'
        },
        input: {
            padding: '12px 15px',
            borderRadius: '10px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            outline: 'none',
            transition: '0.3s',
            boxSizing: 'border-box',
            width: '100%'
        },
        button: {
            backgroundColor: palette.primaryOrange,
            color: 'white',
            padding: '15px',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            width: '100%',
            marginTop: '10px',
            transition: '0.3s',
            opacity: loading ? 0.7 : 1
        },
        footerText: {
            marginTop: '25px',
            fontSize: '0.9rem',
            color: '#555'
        },
        loginLink: {
            color: palette.primaryOrange,
            textDecoration: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Join DesiDelight 🍲</h2>
                <p style={styles.subtitle}>Homemade taste, delivered with love.</p>
                
                <form onSubmit={onSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input 
                            style={styles.input}
                            type="text" 
                            name="name" 
                            value={name} 
                            onChange={onChange} 
                           
                            required 
                        />
                    </div>
                    
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input 
                            style={styles.input}
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={onChange} 
                           
                            required 
                        />
                    </div>
                    
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
                        <input 
                            style={styles.input}
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={onChange} 
                           
                            required 
                        />
                    </div>
                    
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? "Creating Account..." : "REGISTER"}
                    </button>
                </form>
                
                <p style={styles.footerText}>
                    Already have an account?{' '}
                    <span onClick={() => navigate('/login')} style={styles.loginLink}>
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;