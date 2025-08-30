const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./userSchema'); // your schema file
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // parse JSON
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/getUserData', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
    const { name, age, city } = req.body;

    try {
        const newUser = new User({ name, age, city });
        await newUser.save();
        res.json({ message: "User data saved successfully!" });
    } catch (err) {
        console.error("❌ Error saving user data:", err);
        res.status(500).json({ message: "Error saving data" });
    }
});

// Get all users
app.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error("❌ Error fetching users:", err);
        res.status(500).json({ message: "Error fetching users" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
