import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // Generate a random Order ID for a professional look
    const randomId = 'DD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomId);
    
    // Optional: Clear any temporary checkout data from localStorage here
    // localStorage.removeItem('last_order_total');
  }, []);

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.successCard}>
        {/* Animated Checkmark Circle */}
        <div style={styles.iconCircle}>
          <span style={{ fontSize: '3rem' }}>✔</span>
        </div>
        
        <h1 style={styles.title}>Order Placed Successfully!</h1>
        
        <div style={styles.orderIdBadge}>
          Order ID: <strong>{orderNumber}</strong>
        </div>

        <p style={styles.message}>
          Thank you for choosing <strong>Desi Delight</strong>. <br />
          Your delicious homemade treats are being prepared with love and will reach you shortly.
        </p>

        <div style={styles.deliveryInfo}>
          <span style={{ marginRight: '10px' }}>🚚</span>
          Estimated Delivery: <strong>30-45 Minutes</strong>
        </div>

        <div style={styles.buttonGroup}>
          <button 
            onClick={() => navigate('/')}
            style={styles.secondaryBtn}
          >
            Go to Home
          </button>
          <button 
            onClick={() => navigate('/products')}
            style={styles.primaryBtn}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: { 
    textAlign: 'center', 
    padding: '80px 20px', 
    backgroundColor: '#fdf5e6', 
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Poppins', sans-serif"
  },
  successCard: { 
    backgroundColor: 'white', 
    padding: '50px 40px', 
    borderRadius: '24px', 
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 10px 30px rgba(139, 69, 19, 0.1)',
    border: '1px solid #eee'
  },
  iconCircle: {
    width: '80px',
    height: '80px',
    backgroundColor: '#27ae60',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)'
  },
  title: { color: '#8B4513', fontSize: '1.8rem', marginBottom: '10px' },
  orderIdBadge: {
    backgroundColor: '#fff9f0',
    color: '#8B4513',
    padding: '8px 15px',
    borderRadius: '50px',
    display: 'inline-block',
    fontSize: '0.9rem',
    marginBottom: '20px',
    border: '1px dashed #d2b48c'
  },
  message: { color: '#666', fontSize: '1rem', lineHeight: '1.6', marginBottom: '25px' },
  deliveryInfo: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '12px',
    fontSize: '0.95rem',
    color: '#444',
    marginBottom: '30px'
  },
  buttonGroup: { display: 'flex', gap: '15px', justifyContent: 'center' },
  primaryBtn: { 
    backgroundColor: '#8B4513', color: 'white', 
    padding: '12px 25px', border: 'none', borderRadius: '10px', 
    fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' 
  },
  secondaryBtn: { 
    backgroundColor: 'transparent', color: '#8B4513', 
    padding: '12px 25px', border: '2px solid #8B4513', borderRadius: '10px', 
    fontWeight: 'bold', cursor: 'pointer' 
  }
};

export default OrderSuccess;