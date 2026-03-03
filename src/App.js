import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; // 1. Added Checkout Import
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  // Initialize state by checking LocalStorage first
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('desiCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Automatically save to LocalStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('desiCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Updated Add to Cart: Handles quantity logic
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

  // Updates quantity (+ or -) and removes item if qty is 0
  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 2. New Function: To clear the cart after a successful order
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <div className="App">
        {/* Total count now sums up all quantities */}
        <Navbar cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          
          <Route 
            path="/cart" 
            element={<Cart cartItems={cartItems} updateQuantity={updateQuantity} />} 
          />

          {/* 3. Added the Checkout Route */}
          <Route 
            path="/checkout" 
            element={<Checkout cartItems={cartItems} clearCart={clearCart} />} 
          />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;