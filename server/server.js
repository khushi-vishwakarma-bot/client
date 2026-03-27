require('dotenv').config(); // This loads your PORT, MONGO_URI, and JWT_SECRET[span_2](start_span)[span_2](end_span)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dns = require('node:dns');

// Fix for Windows/Node connection issues[span_3](start_span)[span_3](end_span)
dns.setServers(['8.8.8.8', '8.8.4.4']); 

const User = require('./models/User'); 

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Database Connection using your .env[span_4](start_span)[span_4](end_span)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully to DesiDelight"))
    .catch(err => console.log("❌ DB Connection Error:", err.message));

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Sign token using the secret from your .env[span_5](start_span)[span_5](end_span)
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token,
            user: { name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Login Error", error: error.message });
    }
});

// Registration Route
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Registration Error", error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});