const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

// Description: Controller for admin user
const getAdmin = asyncHandler(async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).throw(new Error('Admin user not found'));
        }
        res.json(admin);
    } catch (error) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

const getAdminProfile = asyncHandler(async (req, res) => {
    try {
        const admin = { _id, email } = await Admin.findById(req.user.id);
        if (!admin) {
            return res.status(404).throw(new Error('Admin user not found'));
        }
        res.json(admin);
    } catch (error) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

const getAdmins = asyncHandler(async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

const createAdmin = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  try{
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin user already exists' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const admin = new Admin({
        email,
        password: hash
    });
    const createdAdmin = await admin.save();
    res.status(201).json(createdAdmin);
  }
} catch (error) {
  res.status(500);
  throw new Error('Internal server error');
}
});

const updateAdmin = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
  
      // Find the admin user by ID
      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).throw(new Error('Admin user not found'));
      }
  
      // Update the admin user properties
      admin.email = email;
      admin.password = await bcrypt.hash(password, 10);
  
      // Save the updated admin user to the database
      await admin.save();
  
      res.json({ message: 'Admin user updated successfully' });
    } catch (error) {
      res.status(500);
      throw new Error('Internal server error');
    }
  });

const deleteAdmin = asyncHandler(async (req, res) => {
    await Admin.findByIdAndRemove(req.params.id)
        .then(admin => {
            if (!admin) {
              return res.status(404).throw(new Error('Admin user not found'));
            }
            res.json({ message: 'Admin user deleted successfully' });
        })
        .catch(err => {
            res.status(400);
            throw new Error('Internal server error');
        });
});

module.exports = {
    getAdminProfile,
    getAdmin,
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin
};