const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
 /* user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link to userModel
    required: true
  },*/
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider', // Link to providerModel
    required: true
  },
  service: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  address: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;