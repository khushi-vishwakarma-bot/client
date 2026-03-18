import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout({ cartItems, clearCart }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'UPI'
  });

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [applied, setApplied] = useState(false);

  // Helper to safely convert price strings or numbers to integers
  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseInt(price.replace(/[^\d]/g, '')) || 0;
    }
    return price || 0;
  };

  // 1. Financial Calculations
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (parsePrice(item.price) * item.quantity);
  }, 0);

  const tax = Math.round(subtotal * 0.05); 
  const shipping = subtotal > 500 ? 0 : 50;

  // 2. Updated Coupon Logic for 50% OFF
  const handleApplyCoupon = () => {
    const code = coupon.toUpperCase().trim();
    
    if (code === "DESI50") {
      const reduction = Math.round(subtotal * 0.50); // 50% Calculation
      setDiscount(reduction);
      setApplied(true);
      alert("Success! DESI50 applied. You saved 50% on your order!");
    } else if (code === "DESI10") {
      const reduction = Math.round(subtotal * 0.10); // 10% Calculation
      setDiscount(reduction);
      setApplied(true);
      alert("Coupon DESI10 applied! 10% discount added.");
    } else {
      alert("Invalid Coupon Code. Try using DESI50.");
    }
  };

  const finalTotal = subtotal + tax + shipping - discount;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    clearCart(); 
    navigate('/order-success'); 
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#fdf5e6', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      
      <div style={stepContainer}>
        <div style={{ ...stepItem, borderBottom: step === 1 ? '3px solid #8B4513' : '3px solid #ddd', color: step === 1 ? '#8B4513' : '#999' }}>1. Shipping</div>
        <div style={{ ...stepItem, borderBottom: step === 2 ? '3px solid #8B4513' : '3px solid #ddd', color: step === 2 ? '#8B4513' : '#999' }}>2. Payment & Review</div>
      </div>

      <div style={layoutWrapper}>
        <div style={summaryCard}>
          <h3 style={cardTitle}>Order Summary</h3>
          <div style={{ marginBottom: '20px' }}>
            {cartItems.map(item => (
              <div key={item.id} style={itemRow}>
                <span>{item.name} (x{item.quantity})</span>
                <span>₹{parsePrice(item.price) * item.quantity}</span>
              </div>
            ))}
          </div>
          <hr style={divider} />
          <div style={priceDetail}>
            <div style={priceRow}><span>Subtotal:</span><span>₹{subtotal}</span></div>
            <div style={priceRow}><span>GST (5%):</span><span>₹{tax}</span></div>
            <div style={priceRow}><span>Shipping:</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
            
            {/* 50% Discount Visuals */}
            {applied && (
              <div style={{ ...priceRow, color: '#27ae60', fontWeight: 'bold' }}>
                <span>Discount (Applied):</span>
                <span>-₹{discount}</span>
              </div>
            )}
            
            <div style={totalRow}>
              <span>Total:</span><span>₹{finalTotal}</span>
            </div>
          </div>
        </div>

        <div style={formCard}>
          {step === 1 ? (
            <div style={formSection}>
              <h3 style={cardTitle}>Shipping Information</h3>
              <input style={inputField} placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input style={inputField} placeholder="Phone Number" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <textarea style={{ ...inputField, height: '100px' }} placeholder="Detailed Address" onChange={(e) => setFormData({...formData, address: e.target.value})} />
              <input style={inputField} placeholder="City" onChange={(e) => setFormData({...formData, city: e.target.value})} />
              <button 
                style={primaryBtn} 
                onClick={() => formData.name && formData.address ? setStep(2) : alert("Please fill shipping details")}
              >
                Proceed to Payment
              </button>
            </div>
          ) : (
            <div style={formSection}>
              <h3 style={cardTitle}>Payment Method</h3>
              <div style={paymentGroup}>
                {['UPI (PhonePe/GPay)', 'Debit/Credit Card', 'Cash on Delivery'].map((mode) => (
                  <label key={mode} style={paymentOption}>
                    <input 
                      type="radio" 
                      name="payMode" 
                      value={mode} 
                      defaultChecked={mode === 'UPI (PhonePe/GPay)'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    />
                    <span style={{ marginLeft: '10px' }}>{mode}</span>
                  </label>
                ))}
              </div>

              {/* Coupon Box updated for DESI50 */}
              <div style={couponBox}>
                <input 
                  style={{ ...inputField, flex: 1, marginBottom: 0 }} 
                  placeholder="Enter Code (DESI50)" 
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)} 
                />
                <button onClick={handleApplyCoupon} style={applyBtn}>Apply</button>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button style={backBtn} onClick={() => setStep(1)}>Back</button>
                <button style={primaryBtn} onClick={handleSubmitOrder}>
                  Place Order ₹{finalTotal}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Styles remain the same to maintain your layout
const stepContainer = { display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' };
const stepItem = { padding: '10px 20px', fontWeight: 'bold', fontSize: '1.1rem' };
const layoutWrapper = { display: 'flex', gap: '30px', maxWidth: '1100px', margin: '0 auto', flexWrap: 'wrap' };
const summaryCard = { flex: 1, backgroundColor: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', height: 'fit-content' };
const formCard = { flex: 1.5, backgroundColor: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' };
const cardTitle = { color: '#8B4513', borderBottom: '2px solid #FFD700', paddingBottom: '10px', marginBottom: '20px' };
const itemRow = { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#555' };
const divider = { border: 'none', borderTop: '1px solid #eee', margin: '15px 0' };
const priceDetail = { fontSize: '0.95rem' };
const priceRow = { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' };
const totalRow = { display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: 'bold', color: '#8B4513', marginTop: '15px' };
const formSection = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputField = { padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' };
const primaryBtn = { flex: 1, backgroundColor: '#8B4513', color: 'white', padding: '15px', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' };
const backBtn = { backgroundColor: '#f0f0f0', color: '#333', padding: '15px 25px', border: 'none', borderRadius: '10px', cursor: 'pointer' };
const paymentGroup = { display: 'flex', flexDirection: 'column', gap: '10px' };
const paymentOption = { padding: '15px', border: '1px solid #eee', borderRadius: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' };
const couponBox = { display: 'flex', gap: '10px', marginTop: '10px', backgroundColor: '#fff9f0', padding: '15px', borderRadius: '10px' };
const applyBtn = { backgroundColor: '#e67e22', color: 'white', border: 'none', padding: '0 20px', borderRadius: '8px', cursor: 'pointer' };

export default Checkout;