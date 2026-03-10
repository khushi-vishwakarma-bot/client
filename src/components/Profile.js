import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ user, onLogout }) {
  const navigate = useNavigate();

  // If no user is logged in, redirect to login or show a message
  if (!user) {
    return (
      <div style={containerStyle}>
        <h2>Please login to view your profile.</h2>
        <button onClick={() => navigate('/login')} style={buttonStyle}>Go to Login</button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={profileCardStyle}>
        <div style={avatarLargeStyle}>
          {user.email.charAt(0).toUpperCase()}
        </div>
        <h2 style={{ color: '#8B4513', marginBottom: '10px' }}>Your Profile</h2>
        <hr style={{ width: '100%', border: '0.5px solid #eee', marginBottom: '20px' }} />
        
        <div style={infoRowStyle}>
          <strong>Email:</strong> <span>{user.email}</span>
        </div>
        <div style={infoRowStyle}>
          <strong>Account Status:</strong> <span style={{ color: 'green' }}>Active</span>
        </div>
        <div style={infoRowStyle}>
          <strong>Location:</strong> <span>India</span>
        </div>

        <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/')} style={secondaryButtonStyle}>Back to Home</button>
          <button onClick={() => { onLogout(); navigate('/'); }} style={logoutButtonStyle}>Logout</button>
        </div>
      </div>
    </div>
  );
}

// STYLES
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#fffaf0', padding: '20px' };
const profileCardStyle = { backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '450px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' };
const avatarLargeStyle = { width: '80px', height: '80px', backgroundColor: '#e67e22', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px', boxShadow: '0 4px 10px rgba(230, 126, 34, 0.3)' };
const infoRowStyle = { width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '1.1rem', borderBottom: '1px solid #fafafa' };
const buttonStyle = { backgroundColor: '#e67e22', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' };
const secondaryButtonStyle = { backgroundColor: '#eee', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' };
const logoutButtonStyle = { backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' };

export default Profile;