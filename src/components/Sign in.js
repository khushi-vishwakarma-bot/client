import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const palette = {
    primaryOrange: '#e67e22',
    deepBrown: '#3a2e23',
    softCream: '#fdfcf0',
    textDark: '#1d1d1f',
    bgLight: '#ffffff'
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('Connecting...');
  };

  const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px', backgroundColor: palette.softCream },
    card: { backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
    header: { fontSize: '2.4rem', fontWeight: '800', color: palette.deepBrown, marginBottom: '10px' },
    subHeader: { fontSize: '1rem', color: '#777', marginBottom: '30px' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    input: { padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' },
    button: { backgroundColor: palette.primaryOrange, color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600' },
    linkRow: { marginTop: '20px', fontSize: '0.9rem', color: '#555' },
    link: { color: palette.primaryOrange, textDecoration: 'none', fontWeight: '600' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>DESI<span style={{color: palette.primaryOrange}}> DELIGHT</span></div>
        <p style={styles.subHeader}>Join our family for pure, homemade happiness.</p>
        
        <form style={styles.form} onSubmit={handleRegister}>
          <input name="name" type="text" placeholder="Full Name" value={user.name} onChange={handleChange} required style={styles.input} />
          <input name="email" type="email" placeholder="Email" value={user.email} onChange={handleChange} required style={styles.input} />
          <input name="password" type="password" placeholder="Password" value={user.password} onChange={handleChange} required style={styles.input} />
          <button type="submit" style={styles.button}>Create Account</button>
        </form>

        <div style={styles.linkRow}>
          Already a member? <Link to="/login" style={styles.link}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
