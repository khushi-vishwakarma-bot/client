import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartCount, user, onLogout }) {
  const palette = { deepBrown: '#8B4513', primaryOrange: '#e67e22' };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '12px 5%', 
      backgroundColor: '#fff', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)', 
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>
        <Link to="/" style={{ textDecoration: 'none', color: palette.deepBrown }}>
          Desi Delight 🛍️
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <Link to="/" style={navLinkStyle}>Home</Link>
        <Link to="/products" style={navLinkStyle}>Products</Link>
        
        {user ? (
          <div style={profileWrapperStyle}>
            <Link to="/profile" style={profileLinkStyle}>
              <div style={avatarStyle}>{user.email.charAt(0).toUpperCase()}</div>
              <span style={userEmailStyle}>{user.email.split('@')[0]}</span>
            </Link>
            <button onClick={onLogout} style={logoutButtonStyle}>Logout</button>
          </div>
        ) : (
          <Link to="/login" style={authButtonStyle}>Login</Link>
        )}

        <Link to="/cart" style={{ textDecoration: 'none', fontSize: '1.4rem', position: 'relative' }}>
          🛒 {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

// Sub-styles
const navLinkStyle = { textDecoration: 'none', color: '#444', fontWeight: '600', fontSize: '0.95rem' };
const authButtonStyle = { textDecoration: 'none', color: '#8B4513', fontWeight: '700', padding: '8px 22px', borderRadius: '25px', border: '2px solid #8B4513' };
const profileWrapperStyle = { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#f9f9f9', padding: '5px 12px', borderRadius: '30px', border: '1px solid #eee' };
const profileLinkStyle = { display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' };
const avatarStyle = { width: '28px', height: '28px', backgroundColor: '#e67e22', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '0.8rem' };
const userEmailStyle = { fontSize: '0.85rem', color: '#333', fontWeight: '600' };
const logoutButtonStyle = { background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem', borderLeft: '1px solid #ddd', paddingLeft: '8px' };
const badgeStyle = { position: 'absolute', top: '-8px', right: '-10px', backgroundColor: '#FFD700', color: '#8B4513', borderRadius: '50%', minWidth: '18px', height: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.65rem', fontWeight: 'bold' };

export default Navbar;