const jwt = require('jsonwebtoken');

const requireAdmin = (req, res, next) => {
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

  try {
    // Verify the access token and extract the payload
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    // Check if the user has the admin role
    if (payload.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Pass the user information to the next middleware
    req.user = payload;

    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Invalid access token' });
  }
};

module.exports = requireAdmin;