import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; 
import OrderSuccess from './components/OrderSuccess'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Log in'; 
import Profile from './components/Profile';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    // Standardizing key name to 'desiCart'
    const savedCart = localStorage.getItem('desiCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    // CRITICAL FIX: Ensure this key matches exactly what Login.js uses.
    // We will use 'user' as the standard key.
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('desiCart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // CRITICAL FIX: Save to 'user' key
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, amount) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('desiCart');
  };

  const loginUser = (userData) => {
    setUser(userData);
    // State update triggers the useEffect above to save to localStorage
  };
  
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Logic to show Promo elements
  // Show if NO user is logged in OR if user is logged in and isFirstOrder is true
  const showNewUserOffer = !user || user.isFirstOrder === true;

  return (
    <Router>
      <div className="App" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        fontFamily: "'Poppins', sans-serif" 
      }}>
        
        <header style={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 2000, 
          width: '100%',
          backgroundColor: '#fff' 
        }}>
          {/* Now correctly reacts to the 'user' state */}
          {showNewUserOffer && (
            <div style={{ backgroundColor: '#FFD700', color: '#8B4513', textAlign: 'center', padding: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>
              🎁 50% OFF your first order! Use Code: DESI50
            </div>
          )}
          
          <Navbar 
            user={user} 
            onLogout={logoutUser} 
            cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
          />
        </header>

        <div style={{ flex: 1 }}>
          <Routes>
            {/* Pass 'user' to Home so it can react to login status */}
            <Route path="/" element={<Home user={user} />} />
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} updateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} user={user} setUser={setUser} />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={loginUser} />} />
            <Route path="/profile" element={<Profile user={user} onLogout={logoutUser} />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;