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

  // UPDATED: Logic to remove item when quantity drops below 1
  const updateQuantity = (productId, amount) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0); // This automatically removes the product
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
<<<<<<< HEAD
    <Router>
      <div className="App" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Navbar 
          user={user} 
          onLogout={logoutUser} 
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        />
=======
  <Router>
    <div className="App">
      <PromoTicket /> {/* <--- ADD THIS LINE HERE */}
    
        {/* Total count now sums up all quantities */}
        <Navbar cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
        
>>>>>>> d6c1a92 (Tabish new work promopt for discount added)
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route 
            path="/cart" 
            element={<Cart cartItems={cartItems} updateQuantity={updateQuantity} />} 
          />
<<<<<<< HEAD
          <Route 
            path="/checkout" 
            element={<Checkout cartItems={cartItems} clearCart={clearCart} />} 
          />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={loginUser} />} />
          <Route path="/profile" element={<Profile user={user} onLogout={logoutUser} />} />
=======

          {/* 3. Added the Checkout Route */}
           <Route 
            path="/checkout" 
            element={<Checkout cartItems={cartItems} clearCart={clearCart}/>} /> 
            <Route 
            path="/register" element={<Register />} /> 
            <Route path="/login" element={<Login />} />
>>>>>>> d6c1a92 (Tabish new work promopt for discount added)
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;