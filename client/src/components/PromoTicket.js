import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PromoTicket = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState("");
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    const startTime = localStorage.getItem('promo_start_time');
    if (!startTime) { setIsEligible(false); return; }
    setIsEligible(true);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const expiration = parseInt(startTime) + 24 * 60 * 60 * 1000;
      const distance = expiration - now;
      if (distance < 0) {
        setTimeLeft("EXPIRED");
        localStorage.removeItem('promo_start_time'); 
        clearInterval(timer);
      } else {
        const h = Math.floor((distance / (1000 * 60 * 60)));
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
      backgroundColor: isEligible ? '#FFD700' : '#fdf5e6',
      borderBottom: '1px solid #e0e0e0',
      padding: '8px 0',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', padding: '0 20px' }}>
        <span style={{ fontSize: '0.9rem', color: '#8B4513', fontWeight: '500' }}>
          {isEligible 
            ? `🎁 Your 50% discount expires in: ${timeLeft}` 
            : "🎁 Exclusive Offer: Sign up now to claim your first-time 50% discount!"}
        </span>
        <button 
          onClick={() => navigate(isEligible ? '/products' : '/register')} 
          style={{
            padding: '5px 15px',
            backgroundColor: '#8B4513',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {isEligible ? "SHOP NOW" : "GO TO SIGN UP"}
        </button>
      </div>
    </div>
  );
};

export default PromoTicket;