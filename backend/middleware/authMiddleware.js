const jwt = require('jsonwebtoken');
const Driver = require('../models/Driver');
const Admin = require('../models/Admin');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

// Protect routes from unauthorized access
const protect = asyncHandler(async (req, res, next) => {
  try {
    // Get the access token from the request headers
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access token missing or invalid format' });
    }

    // Extract the token from the 'Authorization' header
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Access token missing' });
    }

    // Verify the access token and extract the payload
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    // Check if the user is a driver or an admin
    let user = null;
    if (payload.role === 'driver') {
      user = await Driver.findById(payload.userId).select('-password');
    } else if (payload.role === 'admin') {
      user = await Admin.findById(payload.userId).select('-password');
    }

    if (!user) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Pass the user information to the request object
    req.user = user;

    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Not Authorized: Invalid access token' });
  }
});

module.exports = protect;