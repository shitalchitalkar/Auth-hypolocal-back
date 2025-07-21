const express = require('express');
const router = express.Router();

const { googleLogin} = require('../controllers/providerGoogleController');

const {
  registerProvider,
  loginProvider,
  getAllProviders,
  getProviderProfile,
  updateProviderProfile,
  getProviderBookings,
  
  
} = require('../controllers/providerController');

const protectProvider = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', registerProvider);
router.post('/login', loginProvider);

//profile info
router.get('/me',protectProvider,getProviderProfile);
//update rpfile

router.put('/update',protectProvider,updateProviderProfile);

//view bookings 

router.get("/bookings",protectProvider,getProviderBookings);

// Protected Route
router.get('/', getAllProviders);

//googleqauth
router.post('/auth/google', googleLogin);

module.exports = router;