import React, { useState } from 'react'; // 1. Added useState

function Contact() {
  // 2. Created State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // 3. Handled input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Function to send data to your Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success: " + data.message);
        // Clear the form after success
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not connect to the server. Is your backend running?");
    }
  };

  return (
    <div style={{ padding: '80px 20px', backgroundColor: '#fdf5e6', minHeight: '70vh' }}>
      <h2 style={{ textAlign: 'center', color: '#8B4513', fontSize: '2.5rem', marginBottom: '40px', fontWeight: 'bold' }}>Get In Touch</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Contact Details */}
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#8B4513', marginBottom: '20px', fontSize: '1.5rem' }}>Contact Information</h3>
          <p style={contactTextStyle}><strong>📍 Address:</strong> 123 Heritage Lane, Spice Market, Vadodara, Gujarat</p>
          <p style={contactTextStyle}><strong>📞 Phone:</strong> +91 98765 43210</p>
          <p style={contactTextStyle}><strong>✉️ Email:</strong> support@desidelight.in</p>
          <p style={contactTextStyle}><strong>🕒 Hours:</strong> Mon-Sat, 9:00 AM - 7:00 PM</p>
        </div>

        {/* Contact Form */}
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
          <form onSubmit={handleSubmit}> {/* 5. Linked the new submit function */}
            <input 
              type="text" 
              name="name" // Added name attribute
              placeholder="Your Name" 
              style={inputStyle} 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="email" 
              name="email" // Added name attribute
              placeholder="Your Email" 
              style={inputStyle} 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
            <textarea 
              name="message" // Added name attribute
              placeholder="Your Message" 
              rows="4" 
              style={{...inputStyle, resize: 'none'}} 
              value={formData.message} 
              onChange={handleChange} 
              required 
            ></textarea>
            <button type="submit" style={submitBtnStyle}>SEND MESSAGE</button>
          </form>
        </div>

      </div>
    </div>
  );
}

// Styles (kept the same as yours)
const contactTextStyle = { fontSize: '1.1rem', color: '#555', marginBottom: '15px' };
const inputStyle = { width: '100%', padding: '12px 15px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', boxSizing: 'border-box', fontFamily: 'inherit' };
const submitBtnStyle = { width: '100%', padding: '15px', backgroundColor: '#8B4513', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s' };

export default Contact;