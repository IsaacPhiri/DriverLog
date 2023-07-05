// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../../models/Admin');

// Register a new admin user
router.post('/register', async (req, res) => {
    // Check if any admin user already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin user already exists' });
    }
    try {
    const { username, password } = req.body;

    // Check if the admin user already exists
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Admin user already exists' });
    }

    // Create a new admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({
      username,
      password: hashedPassword,
    });

    // Save the admin user to the database
    await admin.save();

    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update admin user
router.put('/register/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { username, password } = req.body;
  
      // Find the admin user by ID
      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin user not found' });
      }
  
      // Update the admin user properties
      admin.username = username;
      admin.password = await bcrypt.hash(password, 10);
  
      // Save the updated admin user to the database
      await admin.save();
  
      res.json({ message: 'Admin user updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;