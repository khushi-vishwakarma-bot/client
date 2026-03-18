import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingBadge = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/cart')}
      style={badgeStyle}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>CODE:</div>
      <div style={{ fontSize: '0.9rem', fontWeight: '900' }}>DESI50</div>
      <div style={{ fontSize: '0.6rem', marginTop: '2px' }}>CLICK TO APPLY</div>
      
      {/* Pulse Animation Effect */}
      <style>
        {`
          @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.5; }
            100% { transform: scale(1.3); opacity: 0; }
          }
        `}
      </style>
      <div style={pulseEffectStyle}></div>
    </div>
  );
};

const badgeStyle = {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  width: '80px',
  height: '80px',
  backgroundColor: '#FFD700',
  color: '#8B4513',
  borderRadius: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  zIndex: 2000,
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  border: '2px solid #8B4513',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
};

const pulseEffectStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  border: '4px solid #FFD700',
  animation: 'pulse-ring 2s infinite',
  zIndex: -1
};

export default FloatingBadge;