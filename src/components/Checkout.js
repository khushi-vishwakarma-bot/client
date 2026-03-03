import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout({ cartItems }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  });

  const total = cartItems.reduce((acc, item) => {
    const price = parseInt(item.price.replace('₹', ''));
    return acc + (price * item.quantity);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your order of ₹${total} has been placed successfully.`);
    // In a real app, you would send this data to a database here
    navigate('/'); 
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#fdf5e6', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: '#8B4513' }}>Finalize Your Order 📦</h2>
      
      <div style={{ display: 'flex', gap: '40px', maxWidth: '1000px', margin: '0 auto', flexWrap: 'wrap' }}>
        
        {/* ORDER SUMMARY */}
        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <h3>Order Summary</h3>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>{item.name} (x{item.quantity})</span>
              <span>₹{parseInt(item.price.replace('₹', '')) * item.quantity}</span>
            </div>
          ))}
          <hr />
          <h4 style={{ textAlign: 'right', color: '#8B4513' }}>Total: ₹{total}</h4>
        </div>

        {/* SHIPMENT FORM */}
        <div style={{ flex: 1.5, backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <h3>Shipping Details</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" placeholder="Full Name" required 
              style={inputStyle} onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
            <input 
              type="tel" placeholder="Phone Number" required 
              style={inputStyle} onChange={(e) => setFormData({...formData, phone: e.target.value})} 
            />
            <textarea 
              placeholder="Full Address" required 
              style={{...inputStyle, height: '80px'}} onChange={(e) => setFormData({...formData, address: e.target.value})} 
            />
            <button type="submit" style={confirmBtnStyle}>Confirm Order</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' };
const confirmBtnStyle = { backgroundColor: '#8B4513', color: 'white', padding: '15px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };

export default Checkout;