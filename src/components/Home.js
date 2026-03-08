import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#fffaf0', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      
      {/* 1. LUXURY HERO SECTION */}
      <div style={{
        height: '80vh',
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '0 20px',
        borderBottom: '8px solid #FFD700'
      }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: '800', 
          marginBottom: '20px', 
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          Authentic <span style={{ color: '#FFD700' }}>Desi</span> Flavors
        </h1>
        <p style={{ fontSize: '1.4rem', maxWidth: '700px', lineHeight: '1.6', marginBottom: '40px', fontWeight: '300' }}>
           100% Pure veg. 100% Homemade.
        </p>
        <button 
          onClick={() => navigate('/products')}
          style={{
            padding: '18px 50px',
            fontSize: '1.2rem',
            backgroundColor: '#FFD700',
            color: '#8B4513',
            border: 'none',
            borderRadius: '50px',
            fontWeight: '900',
            cursor: 'pointer',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 15px 30px rgba(255, 215, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
          }}
        >
          EXPLORE THE COLLECTION
        </button>
      </div>

      {/* 2. OUR PROMISE SECTION */}
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#8B4513', fontSize: '2.5rem', marginBottom: '50px' }}>Our Promise to You</h2>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '40px', 
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '0 auto' 
        }}>
          <div style={premiumCardStyle}>
            <div style={{ fontSize: '4rem' }}>🍯</div>
            <h3 style={{ color: '#8B4513' }}>Pure Ghee Based</h3>
            <p style={{ color: '#555' }}>We use only premium cow ghee for that unmistakable homemade aroma.</p>
          </div>

          <div style={premiumCardStyle}>
            <div style={{ fontSize: '4rem' }}>🌶️</div>
            <h3 style={{ color: '#8B4513' }}>Farm Fresh Spices</h3>
            <p style={{ color: '#555' }}>Hand-picked spices ground traditionally to preserve essential oils.</p>
          </div>

          <div style={premiumCardStyle}>
            <div style={{ fontSize: '4rem' }}>❤️</div>
            <h3 style={{ color: '#8B4513' }}>Made with Love</h3>
            <p style={{ color: '#555' }}>Every jar is packed by hand, ensuring the quality your family deserves.</p>
          </div>
        </div>
      </div>

      {/* 3. TRUST FOOTER SECTION (Updated to remove reviews) */}
      <div style={{ 
        background: '#8B4513', 
        padding: '40px 20px', 
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '40px', 
          opacity: '0.9',
          flexWrap: 'wrap'
        }}>
          <div style={{ fontWeight: 'bold' }}>✅ FSSAI Approved</div>
          <div style={{ fontWeight: 'bold' }}>💳 Secure Payment</div>
          <div style={{ fontWeight: 'bold' }}>📦 Eco-friendly Packing</div>
        </div>
      </div>
    </div>
  );
}

// STYLES
const premiumCardStyle = {
  backgroundColor: '#ffffff',
  padding: '40px 30px',
  borderRadius: '30px',
  width: '320px',
  boxShadow: '0 20px 40px rgba(139, 69, 19, 0.1)',
  border: '2px solid #fff5e6',
  transition: 'all 0.3s ease',
};

export default Home;