const jwt = require('jsonwebtoken');
const Provider = require('../models/providerModel');

// ✅ Protect Provider Route
const protectProvider = async (req, res, next) => {
  let token;

  // Check if token present in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.provider = await Provider.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protectProvider };