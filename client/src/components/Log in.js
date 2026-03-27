import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const palette = { primaryOrange: '#e67e22', deepBrown: '#3a2e23', softCream: '#fdfcf0' };

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // --- SECURE STORAGE ---
        
        // 1. Store the JWT token
        localStorage.setItem('token', data.token);
        
        // 2. Store user info
        // data.user now contains { id, name, email, isFirstOrder } from backend
        localStorage.setItem('user', JSON.stringify(data.user));

        // 3. Update the App global state (Important for Home.js to react immediately)
        if (onLogin) {
            onLogin(data.user); 
        }
        
        // 4. Success and Redirect
        // Removing the alert makes the transition smoother for the UI
        navigate('/'); 
        
        // Optional: Force a small window reload if Home.js isn't picking up changes
        // window.location.reload(); 

      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError('Connection refused. Please ensure your backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: palette.softCream, fontFamily: "'Poppins', sans-serif" },
    card: { backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
    inputWrapper: { position: 'relative', width: '100%' },
    input: { width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', outline: 'none', fontSize: '1rem' },
    eyeIcon: { position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#999', fontSize: '0.7rem', fontWeight: 'bold', background: 'none', border: 'none', padding: '5px' },
    button: { backgroundColor: palette.primaryOrange, color: 'white', border: 'none', padding: '15px', borderRadius: '8px', width: '100%', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', transition: '0.3s', opacity: loading ? 0.7 : 1 },
    errorText: { backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '15px', border: '1px solid #fecaca' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{color: palette.deepBrown, marginBottom: '25px'}}>WELCOME <span style={{color: palette.primaryOrange}}>BACK</span></h2>
        
        {error && <div style={styles.errorText}>{error}</div>}

        <form onSubmit={handleLogin} style={{display:'flex', flexDirection:'column', gap:'15px'}}>
          <input 
            name="email" 
            type="email" 
            placeholder="Email Address" 
            value={credentials.email}
            onChange={handleChange} 
            required 
            style={styles.input} 
          />
          <div style={styles.inputWrapper}>
            <input 
              name="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={credentials.password}
              onChange={handleChange} 
              required 
              style={styles.input} 
            />
            <button 
              type="button" 
              style={styles.eyeIcon} 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "AUTHENTICATING..." : "LOGIN"}
          </button>
        </form>
        <p style={{marginTop:'25px', fontSize:'0.9rem', color: '#666'}}>
          New here? <Link to="/register" style={{color: palette.primaryOrange, textDecoration:'none', fontWeight: 'bold'}}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;