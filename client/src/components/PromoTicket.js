import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PromoTicket = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState("");
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    // Check for existing promo timer in local storage
    const startTime = localStorage.getItem('promo_start_time');
    if (!startTime) { 
      setIsEligible(false); 
      return; 
    }
    setIsEligible(true);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const expiration = parseInt(startTime) + 24 * 60 * 60 * 1000; // 24-hour window
      const distance = expiration - now;

      if (distance < 0) {
        setTimeLeft("EXPIRED");
        localStorage.removeItem('promo_start_time'); 
        setIsEligible(false);
        clearInterval(timer);
      } else {
        const h = Math.floor(distance / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      width: '100%',
      // Gold background if active, cream if not
      backgroundColor: isEligible ? '#FFD700' : '#fdf5e6', 
      borderBottom: '1px solid #e0e0e0',
      padding: '5px 0', // Reduced padding for a slimmer, professional look
      textAlign: 'center',
      zIndex: 1100,
      position: 'relative'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '15px', 
        padding: '0 20px' 
      }}>
        <span style={{ 
          fontSize: '0.85rem', 
          color: '#8B4513', 
          fontWeight: '600',
          letterSpacing: '0.3px' 
        }}>
          {isEligible 
            ? `✨ Limited Time: Your 50% discount expires in ${timeLeft}!` 
            : "🎁 Exclusive Offer: Sign up now to claim your first-time 50% discount!"}
        </span>
        
        <button 
          onClick={() => navigate(isEligible ? '/products' : '/register')} 
          style={{
            padding: '4px 12px',
            backgroundColor: '#8B4513',
            color: 'white',
            border: 'none',
            borderRadius: '4px', // Squared off slightly for a modern feel
            fontSize: '0.7rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#A0522D'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#8B4513'}
        >
          {isEligible ? "SHOP NOW" : "GO TO SIGN UP"}
        </button>
      </div>
    </div>
  );
};

export default PromoTicket;