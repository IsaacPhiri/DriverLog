const jwt = require("jsonwebtoken");

const createJWT = (email, userId, duration, role) => {
   const payload = { email, userId, duration, role };
   return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
   });
};

module.exports = createJWT;