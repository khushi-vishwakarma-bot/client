import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, updateQuantity }) {
  const navigate = useNavigate();

  // Calculate Total based on Price * Quantity
  const total = cartItems.reduce((acc, item) => {
    // Remove '₹' and comma if any, then convert to number
    const price = parseInt(item.price.replace(/[₹,]/g, ''));
    return acc + (price * item.quantity);
  }, 0);

  return (
    <div style={{ padding: '40px', backgroundColor: '#fffaf0', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      <h2 style={{ color: '#8B4513', textAlign: 'center', fontSize: '2.5rem' }}>Your Shopping Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>Your cart is empty! Time to add some delicious treats.</p>
          <button onClick={() => navigate('/products')} style={btnStyle}>Go to Shop</button>
        </div>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img src={item.img} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ margin: 0, color: '#8B4513', fontWeight: 'bold' }}>{item.price}</p>
                </div>
              </div>

              {/* + and - BUTTONS */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button 
                  onClick={() => updateQuantity(item.id, -1)} 
                  style={qtyBtnStyle}
                  title="Decrease quantity"
                >
                  -
                </button>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', minWidth: '20px', textAlign: 'center' }}>
                  {item.quantity}
                </span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)} 
                  style={qtyBtnStyle}
                  title="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#333' }}>Total: ₹{total}</h3>
            
            {/* UPDATED BUTTON: Navigates to the Checkout Page */}
            <button 
              style={checkoutBtnStyle} 
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// STYLES (Kept consistent with your theme)
const qtyBtnStyle = {
  backgroundColor: '#fdf5e6',
  border: '1px solid #8B4513',
  color: '#8B4513',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: '0.2s'
};

const btnStyle = { 
  padding: '10px 30px', 
  backgroundColor: '#8B4513', 
  color: 'white', 
  border: 'none', 
  borderRadius: '25px', 
  cursor: 'pointer', 
  marginTop: '20px',
  fontWeight: 'bold' 
};

const checkoutBtnStyle = { 
  padding: '15px 40px', 
  backgroundColor: '#FFD700', 
  color: '#8B4513', 
  border: 'none', 
  borderRadius: '30px', 
  fontWeight: 'bold', 
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
};

export default Cart;