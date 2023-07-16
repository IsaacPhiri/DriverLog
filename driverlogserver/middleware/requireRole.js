const requireRole = (role) => {
    return (req, res, next) => {
      if (req.user && req.user.role === role) {
        next();
      } else {
        res.status(403).json({ error: 'Forbidden' });
      }
    };
};

module.exports = requireRole;