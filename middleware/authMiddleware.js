const jwt = require('jsonwebtoken');
const Provider = require('../models/providerModel');
const Admin= require('../models/adminModel');


//for protectedProvider
const protectProvider = async (req, res, next) => {
  try {
    
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: 'Token missing, unauthorized access' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.provider = await Provider.findById(decoded.providerId).select("-password");

    next(); // going fo next middleware or controller
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


// for protectedAdmin




module.exports = protectProvider;