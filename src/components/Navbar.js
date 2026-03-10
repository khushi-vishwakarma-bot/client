import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartCount, user, onLogout }) {
  const palette = { deepBrown: '#8B4513', primaryOrange: '#e67e22' };

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        <Link to="/" style={{ textDecoration: 'none', color: palette.deepBrown }}>
          Desi Delight 🛍️
        </Link>
      </div>

      <div style={linkContainerStyle}>
        <Link to="/" style={navLinkStyle}>Home</Link>
        <Link to="/products" style={navLinkStyle}>Products</Link>
        
        {user ? (
          <div style={profileWrapperStyle}>
            <div style={avatarStyle}>{user.email.charAt(0).toUpperCase()}</div>
            <span style={userEmailStyle}>{user.email.split('@')[0]}</span>
            <button onClick={onLogout} style={logoutButtonStyle}>Logout</button>
          </div>
        ) : (
          <Link to="/login" style={authButtonStyle}>Login</Link>
        )}

        <Link to="/cart" style={cartContainerStyle}>
          🛒 {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 50px', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', sticky: 'top', zIndex: 1000 };
const logoStyle = { fontSize: '1.8rem', fontWeight: 'bold' };
const linkContainerStyle = { display: 'flex', alignItems: 'center', gap: '20px' };
const navLinkStyle = { textDecoration: 'none', color: '#333', fontWeight: '500' };

const authButtonStyle = {
  textDecoration: 'none', color: '#8B4513', fontWeight: '600', padding: '8px 20px', borderRadius: '5px', border: '2px solid #8B4513'
};

const profileWrapperStyle = { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fdfcf0', padding: '5px 12px', borderRadius: '25px', border: '1px solid #ddd' };
const avatarStyle = { width: '30px', height: '30px', backgroundColor: '#e67e22', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' };
const userEmailStyle = { fontSize: '0.9rem', color: '#333', fontWeight: '500' };
const logoutButtonStyle = { background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' };

const cartContainerStyle = { textDecoration: 'none', fontSize: '1.5rem', position: 'relative' };
const badgeStyle = { position: 'absolute', top: '-5px', right: '-10px', backgroundColor: '#FFD700', color: '#8B4513', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem', fontWeight: 'bold' };

export default Navbar;