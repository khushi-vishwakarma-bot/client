import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate

const Register = () => {
  // Updated state names to match your backend expectations (fullName, email, password)
  const [user, setUser] = useState({ fullName: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for redirection

  const palette = {
    primaryOrange: '#e67e22',
    deepBrown: '#3a2e23',
    softCream: '#fdfcf0'
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // Connects to the backend port you established in the VS Code terminal
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Success! Redirecting to login...");
        // Wait 2 seconds so the user can see the success message
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      setMessage("Server error. Please check if your backend is running.");
    }
  };

  const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px', backgroundColor: palette.softCream },
    card: { backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
    header: { fontSize: '2.4rem', fontWeight: '800', color: palette.deepBrown, marginBottom: '10px' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    input: { padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd' },
    button: { backgroundColor: palette.primaryOrange, color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
    linkRow: { marginTop: '20px' },
    link: { color: palette.primaryOrange, textDecoration: 'none', fontWeight: '600' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>DESI DELIGHT</h2>
        {/* Added the onSubmit handler here */}
        <form style={styles.form} onSubmit={handleRegister}>
          <input 
            name="fullName" 
            placeholder="Full Name" 
            onChange={handleChange} 
            required 
            style={styles.input} 
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            onChange={handleChange} 
            required 
            style={styles.input} 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
            style={styles.input} 
          />
          <button type="submit" style={styles.button}>Create Account</button>
        </form>
        
        {message && (
          <p style={{ color: palette.primaryOrange, marginTop: '10px', fontWeight: 'bold' }}>
            {message}
          </p>
        )}

        <div style={styles.linkRow}>
          Already a member? <Link to="/login" style={styles.link}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;