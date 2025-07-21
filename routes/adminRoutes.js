const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAllUsers } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/adminMiddleware');

// Public routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/users',protectAdmin,getAllUsers);
router.get('/providers',protectAdmin,getAllUsers);

// Example protected route
router.get('/dashboard', protectAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome to Admin Dashboard' });
});

module.exports = router;