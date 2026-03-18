const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./User'); // Imports your schema

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Crucial to prevent the "Server error" shown in your screenshot

// 1. REGISTRATION ROUTE
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ fullName, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving user", error: err.message });
  }
});

// 2. LOGIN ROUTE
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (user) {
      res.status(200).json({ 
        message: "Login Successful", 
        user: { 
          fullName: user.fullName, 
          email: user.email,
          location: user.location || "India" // Matches your Profile View
        } 
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Connect to MongoDB
// Replace with your actual connection string from MongoDB Atlas or local Compass
mongoose.connect('mongodb://localhost:27017/desidelight')
  .then(() => console.log("Desi Delight MongoDB Connected"))
  .catch(err => console.log("Connection Error: ", err));

app.listen(5000, () => console.log("Backend running on port 5000"));