import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PromoTicket = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState("");
  const [isEligible, setIsEligible] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const startTime = localStorage.getItem('promo_start_time');
    
    if (!startTime) {
      setIsEligible(false);
      return;
    }

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

  if (!isEligible) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Please sign up to claim your first-time discount!</h2>
        <button onClick={() => navigate('/register')} style={{ padding: '10px 20px', marginTop: '20px' }}>
          Go to Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="promo-wrapper" style={{ textAlign: 'center', padding: '20px' }}>
      <div className="timer-banner" style={{ background: '#FFD700', padding: '10px', marginBottom: '20px' }}>
        Your 50% discount expires in: <strong>{timeLeft}</strong>
      </div>

      <div className="printer-container" style={{ position: 'relative', overflow: 'hidden', height: '300px' }}>
        <img src="/printer.png" className="printer-base" alt="printer" style={{ width: '250px', position: 'relative', zIndex: 2 }} />
        
        {/* Ticket slide-out animation */}
        <div 
          className={`discount-ticket ${isPrinting ? 'slide-down' : ''}`}
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: isPrinting ? 'translate(-50%, 100px)' : 'translate(-50%, 0)',
            opacity: isPrinting ? 1 : 0,
            transition: 'all 2s ease-out',
            background: 'white',
            border: '2px dashed red',
            padding: '20px',
            zIndex: 1
          }}
        >
          <div className="ticket-content">
            <h4>WELCOME50</h4>
            <p>Use at Checkout</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        {!isPrinting ? (
          <button onClick={() => setIsPrinting(true)} className="btn-print" style={{ padding: '15px 30px', cursor: 'pointer' }}>
            Claim My Reward
          </button>
        ) : (
          <button onClick={() => alert("Discount Applied!")} className="btn-apply" style={{ padding: '15px 30px', backgroundColor: 'green', color: 'white' }}>
            APPLY TO CART
          </button>
        )}
      </div>
    </div>
  );
};

export default PromoTicket;


