const jwt = require('jsonwebtoken');

const createJWT = (res, email, userId, duration, role) => {
   const payload = { email, userId, duration, role };
   const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
   });

   res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      samesite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      });
};

module.exports = createJWT;