import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const palette = {
    primaryOrange: '#e67e22',
    deepBrown: '#3a2e23',
    softCream: '#fdfcf0'
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px', backgroundColor: palette.softCream },
    card: { backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
    header: { fontSize: '2.4rem', fontWeight: '800', color: palette.deepBrown, marginBottom: '10px' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    input: { padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd' },
    button: { backgroundColor: palette.primaryOrange, color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: '600' },
    linkRow: { marginTop: '20px' },
    link: { color: palette.primaryOrange, textDecoration: 'none', fontWeight: '600' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>DESI DELIGHT</h2>
        <form style={styles.form}>
          <input name="name" placeholder="Full Name" onChange={handleChange} style={styles.input} />
          <input name="email" placeholder="Email" onChange={handleChange} style={styles.input} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} />
          <button type="submit" style={styles.button}>Create Account</button>
        </form>
        {/* This uses the 'message' variable! */}
        {message && (
          <p style={{ color: '#e67e22', marginTop: '10px', fontWeight: 'bold' }}>
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
 
