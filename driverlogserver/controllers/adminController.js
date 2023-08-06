const Admin = require('../models/Admin');
const asyncHandler = require('express-async-handler');

// Description: Controller for admin user
const getAdmin = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin user not found' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const getAdmins = asyncHandler(async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const createAdmin = asyncHandler(async (req, res) => {
    // Check if any admin user already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin user already exists' });
    }
    try {
    const { email, password } = req.body;

    // Check if the admin user already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Admin user already exists' });
    }

    // Create a new admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({
      email,
      password: hashedPassword,
    });

    // Save the admin user to the database
    await admin.save();

    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const updateAdmin = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
  
      // Find the admin user by ID
      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin user not found' });
      }
  
      // Update the admin user properties
      admin.email = email;
      admin.password = await bcrypt.hash(password, 10);
  
      // Save the updated admin user to the database
      await admin.save();
  
      res.json({ message: 'Admin user updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

const deleteAdmin = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin user not found' });
        }
        await admin.remove();
        res.json({ message: 'Admin user deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {
    getAdmin,
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin
};