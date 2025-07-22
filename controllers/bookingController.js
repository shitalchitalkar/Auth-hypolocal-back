const Booking = require('../models/bookingModel');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*//  Get all bookings for a user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('provider');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/
//Get all bookings for a provider
const getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ provider: req.params.providerId }).populate('user');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  //getUserBookings,
  getProviderBookings,
  updateBookingStatus,
};