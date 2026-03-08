import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const palette = {
    primaryOrange: '#e67e22',
    deepBrown: '#3a2e23',
    softCream: '#fdfcf0'
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Attempting login with:", credentials);
    // You will add your backend API call here later!
  };

  const styles = {
    container: { 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh', 
      padding: '20px', 
      backgroundColor: palette.softCream 
    },
    card: { 
      backgroundColor: 'white', 
      padding: '40px', 
      borderRadius: '15px', 
      boxShadow: '0 8px 30px rgba(0,0,0,0.1)', 
      width: '100%', 
      maxWidth: '400px', 
      textAlign: 'center' 
    },
    header: { 
      fontSize: '2.4rem', 
      fontWeight: '800', 
      color: palette.deepBrown, 
      marginBottom: '10px' 
    },
    subHeader: { 
      fontSize: '1rem', 
      color: '#777', 
      marginBottom: '30px' 
    },
    form: { 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '15px' 
    },
    input: { 
      padding: '12px 15px', 
      borderRadius: '8px', 
      border: '1px solid #ddd', 
      fontSize: '1rem' 
    },
    button: { 
      backgroundColor: palette.primaryOrange, 
      color: 'white', 
      border: 'none', 
      padding: '15px', 
      borderRadius: '8px', 
      fontSize: '1.1rem', 
      fontWeight: '600', 
      cursor: 'pointer' 
    },
    linkRow: { 
      marginTop: '20px', 
      fontSize: '0.9rem', 
      color: '#555' 
    },
    link: { 
      color: palette.primaryOrange, 
      textDecoration: 'none', 
      fontWeight: '600' 
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          WELCOME<span style={{color: palette.primaryOrange}}> BACK</span>
        </div>
        <p style={styles.subHeader}>Sign in to continue to Desi Delight.</p>
        
        <form style={styles.form} onSubmit={handleLogin}>
          <input 
            name="email" 
            type="email" 
            placeholder="Email Address" 
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
          <button type="submit" style={styles.button}>Login</button>
        </form>

        <div style={styles.linkRow}>
          New to Desi Delight? <Link to="/register" style={styles.link}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
