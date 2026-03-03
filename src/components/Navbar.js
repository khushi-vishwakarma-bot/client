import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '15px 30px', 
      backgroundColor: '#8B4513', 
      color: 'white',
      position: 'sticky', 
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }}>
      {/* Clickable Logo - takes you home */}
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
        <h2 style={{ margin: 0, cursor: 'pointer' }}>Desi Delight 🛍️</h2>
      </Link>
      
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/products" style={linkStyle}>Products</Link>
        
        {/* CLICKABLE CART LINK */}
        <Link to="/cart" style={{ textDecoration: 'none' }}>
          <div 
            style={{ 
              backgroundColor: cartCount > 0 ? '#FFD700' : 'white', 
              color: '#8B4513', 
              padding: '8px 16px', 
              borderRadius: '25px', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            🛒 <span style={{ fontSize: '1.1rem' }}>{cartCount}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

// Reusable style for Home/Products links
const linkStyle = { 
  color: 'white', 
  textDecoration: 'none', 
  fontWeight: '500',
  transition: 'opacity 0.2s'
};

export default Navbar;