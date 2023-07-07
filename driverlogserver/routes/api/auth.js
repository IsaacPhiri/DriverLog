// routes/auth.js
const express = require('express');
const router = express.Router();

// @route POST api/auth
const { signup, signin, registerAdmin, updateAdmin } = require('../../controllers/AuthController');
router.post('/signup', signup);
router.post('/signin', signin);

// Register a new admin user
router.post('/register-admin', registerAdmin);

// Update admin user
router.put('/register/:id', updateAdmin);

module.exports = router;