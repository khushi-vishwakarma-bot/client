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
          From grandmother's secret recipes to your modern dining table. 100% Pure. 100% Homemade.
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

      {/* 3. THE "TRUST & REVIEWS" SECTION */}
      <div style={{ 
        background: 'linear-gradient(135deg, #8B4513 0%, #a0522d 100%)', 
        padding: '80px 20px', 
        marginTop: '60px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Join Our Happy Family</h2>
        <p style={{ fontSize: '1.2rem', opacity: '0.9', marginBottom: '50px' }}>What our Desi Delight family is saying across India</p>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '25px', 
          flexWrap: 'wrap', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}>
          
          <div style={reviewCardStyle}>
            <div style={{ color: '#FFD700', fontSize: '1.2rem', marginBottom: '10px' }}>⭐⭐⭐⭐⭐</div>
            <p style={{ fontStyle: 'italic', color: '#444' }}>"The Mango Pickle tastes exactly like my Nani used to make. Truly authentic and nostalgic!"</p>
            <h4 style={{ marginTop: '15px', color: '#8B4513' }}>— Priya S., Mumbai</h4>
          </div>

          <div style={reviewCardStyle}>
            <div style={{ color: '#FFD700', fontSize: '1.2rem', marginBottom: '10px' }}>⭐⭐⭐⭐⭐</div>
            <p style={{ fontStyle: 'italic', color: '#444' }}>"Finally found pure Cow Ghee that smells real. The packaging was safe and delivery was fast."</p>
            <h4 style={{ marginTop: '15px', color: '#8B4513' }}>— Rajesh K., Delhi</h4>
          </div>

          <div style={reviewCardStyle}>
            <div style={{ color: '#FFD700', fontSize: '1.2rem', marginBottom: '10px' }}>⭐⭐⭐⭐⭐</div>
            <p style={{ fontStyle: 'italic', color: '#444' }}>"The Besan Ladoos melted in my mouth. My kids loved them. Thank you for keeping traditions alive!"</p>
            <h4 style={{ marginTop: '15px', color: '#8B4513' }}>— Anjali M., Bangalore</h4>
          </div>

        </div>

        {/* Trust Badges */}
        <div style={{ 
          marginTop: '60px', 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '40px', 
          opacity: '0.8',
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

const reviewCardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  color: '#333',
  padding: '30px',
  borderRadius: '20px',
  width: '300px',
  textAlign: 'left',
  boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
  borderTop: '5px solid #FFD700'
};

export default Home;