const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://skillnet_user:skillnet123@cluster0.dzqsbu2.mongodb.net/skillnetDB?retryWrites=true&w=majority&appName=Cluster0')

 
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB Connection Failed ❌", err));
// Routes
app.get('/', (req, res) => {
    res.send('Hello from SkillNet Backend!');
});
app.post('/signup', async (req, res) => {
  try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); 
      
      const newUser = new User({
        username,
        email,
        password: hashedPassword
      });

      const savedUser = await newUser.save(); // Save user and get the saved object // Save user and get the saved object

      // Send back the saved user information
      res.status(201).json({
        message: `Signup successful for ${savedUser.username}`,
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email
        } // Include the saved user in the response
      });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: 'Error registering user', error: error.message });    
  }
});



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
