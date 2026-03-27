require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']); 

// Models
const User = require('./models/User'); 
const Order = require('./models/Order'); 

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully to DesiDelight"))
    .catch(err => console.log("❌ DB Connection Error:", err.message));

// --- AUTH ROUTES ---

// Login Route - Updated to send 'isFirstOrder' status
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // We now include isFirstOrder so React knows whether to show the yellow buttons
        res.status(200).json({
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                isFirstOrder: user.isFirstOrder // <--- Added this
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Login Error", error: error.message });
    }
});

// Registration Route
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // New users default to isFirstOrder: true via the Schema
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ success: true, message: "User registered successfully!" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Registration Error", error: error.message });
    }
});

// --- ORDER ROUTES ---

// Create New Order - Updated to block coupon abuse and update user status
app.post('/api/orders', async (req, res) => {
    try {
        const { userId, items, totalAmount, shippingAddress, couponCode } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // 1. Check if user is actually eligible for DESI50
        if (couponCode === "DESI50") {
            const user = await User.findById(userId);
            if (!user || !user.isFirstOrder) {
                return res.status(400).json({ 
                    message: "Sorry, this promo code is only for your very first order!" 
                });
            }
        }

        const newOrder = new Order({
            user: userId,
            items: items,
            totalAmount: totalAmount,
            shippingAddress: shippingAddress
        });

        await newOrder.save();

        // 2. IMPORTANT: After the first order is saved, update the user's status
        // This ensures the yellow buttons disappear on the next login/refresh
        await User.findByIdAndUpdate(userId, { isFirstOrder: false });

        res.status(201).json({ 
            success: true, 
            message: "Order placed successfully!", 
            order: newOrder,
            isFirstOrder: false // Send back the new status
        });
    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({ message: "Failed to place order", error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});