const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Middleware
app.use(cors());
app.use(express.json()); 

// 2. MongoDB Connection Logic
const uri = process.env.MONGO_URI; // This pulls from your .env file

mongoose.connect(uri)
    .then(() => {
        console.log("✅ MongoDB database connection established successfully");
    })
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error.message);
    });

// 3. Sample Route
app.get('/', (req, res) => {
    res.send('Server is running and connected to MongoDB!');
});

// 4. Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
});