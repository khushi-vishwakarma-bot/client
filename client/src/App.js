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
import PromoTicket from './components/PromoTicket';
import FloatingBadge from './components/FloatingBadge';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('desiCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('desiUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('desiCart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('desiUser', JSON.stringify(user));
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

  const loginUser = (userData) => setUser(userData);
  
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('desiUser');
  };

  return (
    <Router>
      <div className="App" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        fontFamily: "'Poppins', sans-serif" 
      }}>
        
        {/* FIXED HEADER SECTION: Locks both Banner and Navbar */}
        <header style={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 2000, 
          width: '100%',
          backgroundColor: '#fff' // Ensures content doesn't show through during scroll
        }}>
          {!user && <PromoTicket />}
          <Navbar 
            user={user} 
            onLogout={logoutUser} 
            cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
          />
        </header>
        
        {/* Floating Badge for logged-in users */}
        {user && <FloatingBadge />}

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} updateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
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