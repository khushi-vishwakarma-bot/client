import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Receive 'user' and 'setUser' as props from App.js
function Checkout({ cartItems, clearCart, user, setUser }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'UPI (PhonePe/GPay)'
  });

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [applied, setApplied] = useState(false);

  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseInt(price.replace(/[^\d]/g, '')) || 0;
    }
    return price || 0;
  };

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (parsePrice(item.price) * item.quantity);
  }, 0);

  const tax = Math.round(subtotal * 0.05); 
  const shipping = subtotal > 500 ? 0 : 50;

  // --- UPDATED COUPON LOGIC ---
  const handleApplyCoupon = () => {
    const code = coupon.toUpperCase().trim();

    // 1. Prevent guest users from using coupons
    if (!user) {
      alert("Please login first to apply coupon codes.");
      navigate('/login');
      return;
    }

    if (code === "DESI50") {
      // 2. Validate if user is actually eligible for DESI50
      if (user.isFirstOrder === true) {
        setDiscount(Math.round(subtotal * 0.50));
        setApplied(true);
        alert("🎉 First Order Discount Applied! 50% OFF.");
      } else {
        alert("Sorry, DESI50 is only for your very first order.");
      }
    } else if (code === "DESI10") {
      setDiscount(Math.round(subtotal * 0.10));
      setApplied(true);
      alert("Coupon DESI10 applied!");
    } else {
      alert("Invalid Coupon Code.");
    }
  };

  const finalTotal = subtotal + tax + shipping - discount;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    // Double check authentication before placing order
    if (!user || !user.id) {
        alert("Session expired. Please login again.");
        navigate('/login');
        return;
    }

    const orderData = {
        userId: user.id,
        items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: parsePrice(item.price)
        })),
        totalAmount: finalTotal,
        shippingAddress: `${formData.address}, ${formData.city}. Phone: ${formData.phone}`,
        paymentMethod: formData.paymentMethod
    };

    try {
        const res = await axios.post('http://localhost:5000/api/orders', orderData);
        
        if (res.data.success) {
            // --- CRITICAL: Update global user state ---
            // This flips isFirstOrder to false in the UI instantly
            const updatedUser = { ...user, isFirstOrder: false };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            if (setUser) setUser(updatedUser); 

            alert("Order Placed Successfully!");
            clearCart(); 
            navigate('/order-success'); 
        }
    } catch (error) {
        console.error("Order Error:", error);
        alert(error.response?.data?.message || "Failed to place order. Try again.");
    }
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
            
            {applied && (
              <div style={{ ...priceRow, color: '#27ae60', fontWeight: 'bold' }}>
                <span>Discount:</span>
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
              <input style={inputField} placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input style={inputField} placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <textarea style={{ ...inputField, height: '100px' }} placeholder="Detailed Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              <input style={inputField} placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
              <button 
                style={primaryBtn} 
                onClick={() => (formData.name && formData.address && formData.phone) ? setStep(2) : alert("Please fill shipping details")}
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
                      checked={formData.paymentMethod === mode}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    />
                    <span style={{ marginLeft: '10px' }}>{mode}</span>
                  </label>
                ))}
              </div>

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

// Styles
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