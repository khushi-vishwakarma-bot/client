import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', backgroundColor: '#fdf5e6', minHeight: '80vh' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', display: 'inline-block', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '4rem', margin: 0 }}>🎉</h1>
        <h2 style={{ color: '#8B4513', marginTop: '20px' }}>Order Placed Successfully!</h2>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Thank you for choosing <strong>Desi Delight</strong>. <br />
          Your delicious homemade treats are being prepared with love.
        </p>
        <button 
          onClick={() => navigate('/products')}
          style={{ 
            marginTop: '30px', backgroundColor: '#8B4513', color: 'white', 
            padding: '12px 30px', border: 'none', borderRadius: '8px', 
            fontWeight: 'bold', cursor: 'pointer' 
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;