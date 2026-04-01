import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Receive 'user' as a prop from App.js for real-time updates
function Home({ user }) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState("");
  
  // 2. Logic uses the PROP instead of localStorage directly.
  // This ensures the banner vanishes immediately after the first order is placed.
  const showOffer = !user || user.isFirstOrder === true;

  // Timer Logic for the Top Promo Banner
  useEffect(() => {
    // Setting expiry to end of March 2026 as per your current project timeframe
    const expiryDate = new Date("2026-04-31T23:59:59").getTime(); 
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = expiryDate - now;

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft("EXPIRED");
      } else {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#fffaf0', minHeight: '100vh', fontFamily: "'Poppins', sans-serif", position: 'relative' }}>
      
      {/* --- NEW USER PROMO BANNER --- */}
      {showOffer && timeLeft !== "EXPIRED" && (
        <div style={bannerStyle}>
          <span>
            🎁 <strong>{user ? "EXCLUSIVE:" : "NEW USER OFFER:"}</strong> Use code 
            <span style={codeBadge}>DESI50</span> for 50% OFF your first order!
          </span>
          <span style={timerStyle}>Ends in: {timeLeft}</span>
          <button style={bannerBtn} onClick={() => navigate('/products')}>ORDER NOW</button>
        </div>
      )}

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
          style={ctaButtonStyle}
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

      {/* --- FLOATING PROMO ACTION BUTTON --- */}
      {showOffer && (
        <div 
          style={fabStyle}
          onClick={() => navigate(user ? '/products' : '/register')}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
        >
          <div style={{fontSize: '0.6rem', fontWeight: 'bold'}}>CODE:</div>
          <div style={{fontSize: '1rem', fontWeight: '900'}}>DESI50</div>
          <div style={{fontSize: '0.5rem', marginTop: '2px'}}>50% OFF</div>
        </div>
      )}

      {/* 2. CIRCULAR CATEGORIES SECTION */}
      <div style={{ padding: '80px 20px', backgroundColor: '#fffaf0' }}>
        <h2 style={{ textAlign: 'center', color: '#8B4513', fontSize: '2.5rem', marginBottom: '60px', fontWeight: 'bold' }}>SHOP BY CATEGORY</h2>
        <div style={flexContainerStyle}>
          {[
            { name: 'Pickles', cat: 'Pickles', img: 'https://twobrothersindiashop.com/cdn/shop/articles/Untitled_design_2_c2613306-8bfa-4ef6-aa96-1f9bf7d4c715.png?v=1694174770&width=1024' },
            { name: 'Sweets', cat: 'Sweets', img: 'https://cdn.pixabay.com/photo/2017/08/10/18/14/indian-sweets-2625911_640.jpg' },
            { name: 'Spices', cat: 'Spices', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format' },
            { name: 'Snacks', cat: 'Snacks', img: 'https://www.tastingtable.com/img/gallery/20-indian-snacks-you-absolutely-must-try/intro-1744722583.jpg' },
            { name: 'Essentials', cat: 'Essentials', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVS9kTFxhoB_aNxPM55KLZwbUdwTqeOxrO9g&s' }
          ].map((item, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div 
                style={{ ...circleWrapperStyle, backgroundImage: `url(${item.img})` }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <button 
                  onClick={() => navigate(`/products?cat=${item.cat}`)}
                  style={shopButtonStyle}
                >
                  SHOP {item.name.toUpperCase()}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. OUR PROMISE SECTION */}
      <div style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#fdf5e6' }}>
        <h2 style={{ color: '#8B4513', fontSize: '2.5rem', marginBottom: '50px' }}>Our Promise to You</h2>
        <div style={flexContainerStyle}>
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

      {/* 4. TRUST FOOTER SECTION */}
      <div style={{ background: '#482c18', padding: '30px 20px', color: 'white', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '15px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>✅ FSSAI Approved</div>
          <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>💳 Secure Payment</div>
          <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>📦 Eco-friendly Packing</div>
        </div>
      </div>
    </div>
  );
}

// --- STYLES ---
const bannerStyle = {
  backgroundColor: '#3a2e23',
  color: '#fdfcf0',
  padding: '10px 20px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '15px',
  fontSize: '0.85rem',
  borderBottom: '2px solid #FFD700',
  flexWrap: 'wrap',
  zIndex: 10
};

const codeBadge = {
  backgroundColor: '#FFD700',
  color: '#3a2e23',
  padding: '2px 8px',
  borderRadius: '4px',
  fontWeight: 'bold',
  marginLeft: '5px'
};

const timerStyle = {
  backgroundColor: 'rgba(230, 126, 34, 0.15)',
  padding: '3px 10px',
  borderRadius: '20px',
  color: '#FFD700',
  fontWeight: 'bold',
  border: '1px solid #FFD700'
};

const bannerBtn = {
  backgroundColor: '#e67e22',
  color: 'white',
  border: 'none',
  padding: '4px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.75rem'
};

const fabStyle = {
  position: 'fixed',
  bottom: '40px',
  right: '30px',
  width: '80px',
  height: '80px',
  backgroundColor: '#FFD700',
  color: '#8B4513',
  borderRadius: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
  zIndex: 1000,
  cursor: 'pointer',
  border: '4px solid white',
  transition: 'all 0.3s ease'
};

const flexContainerStyle = { display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', maxWidth: '1400px', margin: '0 auto' };
const ctaButtonStyle = { padding: '18px 50px', fontSize: '1.2rem', backgroundColor: '#FFD700', color: '#8B4513', border: 'none', borderRadius: '50px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.3)', transition: 'all 0.3s ease' };
const premiumCardStyle = { backgroundColor: '#ffffff', padding: '40px 30px', borderRadius: '20px', width: '300px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #eee' };
const circleWrapperStyle = { width: '240px', height: '240px', borderRadius: '50%', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 15px 35px rgba(0,0,0,0.15)', border: '6px solid white', position: 'relative', overflow: 'hidden', transition: 'transform 0.3s ease' };
const shopButtonStyle = { backgroundColor: 'rgba(255, 255, 255, 0.95)', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '25px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', transition: 'all 0.3s ease' };

export default Home;