const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getProviderBookings,
  updateBookingStatus
} = require('../controllers/bookingController');

// Create booking
router.post('/', createBooking);

// Get bookings for a user
//router.get('/user/:userId', getUserBookings);

// Get bookings for a provider
router.get('/provider/:providerId', getProviderBookings);

// Update booking status
router.put('/:id/status', updateBookingStatus);

module.exports = router;