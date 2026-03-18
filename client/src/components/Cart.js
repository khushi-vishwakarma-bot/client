import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, updateQuantity }) {
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[₹,]/g, ''));
    return acc + (price * item.quantity);
  }, 0);

  return (
    <div style={{ padding: '40px', backgroundColor: '#fffaf0', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      <h2 style={{ color: '#8B4513', textAlign: 'center', fontSize: '2.5rem', marginBottom: '30px' }}>Your Shopping Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>Your cart is empty! Time to add some delicious treats.</p>
          <button onClick={() => navigate('/products')} style={btnStyle}>Go to Shop</button>
        </div>
      ) : (
        <div style={{ maxWidth: '850px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '25px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #f5f5f5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img src={item.img} alt={item.name} style={{ width: '70px', height: '70px', borderRadius: '15px', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#333' }}>{item.name}</h4>
                  <p style={{ margin: '5px 0 0', color: '#8B4513', fontWeight: 'bold' }}>{item.price}</p>
                </div>
              </div>

              {/* Only Quantity Controls Left */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#fdf5e6', padding: '5px 15px', borderRadius: '20px' }}>
                <button 
                  onClick={() => updateQuantity(item.id, -1)} 
                  style={qtyBtnStyle}
                  title="Decrease quantity"
                >
                  -
                </button>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', minWidth: '25px', textAlign: 'center' }}>
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

          <div style={{ marginTop: '40px', textAlign: 'right', borderTop: '2px solid #fffaf0', paddingTop: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '1.2rem', color: '#666' }}>Subtotal: </span>
              <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333' }}>₹{total}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
              <button 
                onClick={() => navigate('/products')} 
                style={{ ...btnStyle, backgroundColor: '#f0f0f0', color: '#333' }}
              >
                Continue Shopping
              </button>
              <button 
                style={checkoutBtnStyle} 
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const qtyBtnStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#8B4513',
  width: '30px',
  height: '30px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1.3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const btnStyle = { padding: '12px 25px', backgroundColor: '#8B4513', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' };
const checkoutBtnStyle = { padding: '15px 45px', backgroundColor: '#FFD700', color: '#8B4513', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' };

export default Cart;