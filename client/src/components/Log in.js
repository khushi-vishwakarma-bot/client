import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // New state for error messages
  const navigate = useNavigate();

  const palette = { primaryOrange: '#e67e22', deepBrown: '#3a2e23', softCream: '#fdfcf0' };

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Communicate with your backend server on port 5000
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // If successful, pass user data (like email/fullName) to App.js
        onLogin(data.user); 
        navigate('/'); 
      } else {
        // Show "Invalid email or password" from your server logic
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Server error. Please ensure your backend is running.');
    }
  };

  const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: palette.softCream },
    card: { backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
    inputWrapper: { position: 'relative', width: '100%' },
    input: { width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' },
    eyeIcon: { position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#999', fontSize: '0.8rem', fontWeight: 'bold' },
    button: { backgroundColor: palette.primaryOrange, color: 'white', border: 'none', padding: '15px', borderRadius: '8px', width: '100%', cursor: 'pointer', fontWeight: 'bold' },
    errorText: { color: 'red', fontSize: '0.85rem', marginBottom: '10px' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{color: palette.deepBrown}}>WELCOME <span style={{color: palette.primaryOrange}}>BACK</span></h2>
        
        {/* Display error message if login fails */}
        {error && <div style={styles.errorText}>{error}</div>}

        <form onSubmit={handleLogin} style={{display:'flex', flexDirection:'column', gap:'15px'}}>
          <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required style={styles.input} />
          <div style={styles.inputWrapper}>
            <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" onChange={handleChange} required style={styles.input} />
            <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "HIDE" : "SHOW"}
            </span>
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={{marginTop:'20px', fontSize:'0.9rem'}}>New here? <Link to="/register" style={{color: palette.primaryOrange, textDecoration:'none'}}>Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;