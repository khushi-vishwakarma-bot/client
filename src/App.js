import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Log in'; 
import Profile from './components/Profile';

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

  const loginUser = (userData) => setUser(userData);
  const logoutUser = () => setUser(null);

  return (
    <Router>
      <div className="App">
        {/* Navbar is now safely inside Router */}
        <Navbar 
          user={user} 
          onLogout={logoutUser} 
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={loginUser} />} />
          <Route path="/profile" element={<Profile user={user} onLogout={logoutUser} />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;