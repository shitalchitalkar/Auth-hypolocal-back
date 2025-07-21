const Provider = require('../models/providerModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//booking filr ref

const Booking = require("../models/bookingModel");

// Register
exports.registerProvider = async (req, res) => {
  try {
    const { name, serviceType, phone, email, password, experience } = req.body;

    const existing = await Provider.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Provider already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newProvider = new Provider({
      name,
      serviceType,
      phone,
      email,
      password: hashedPassword,
      experience
    });

    await newProvider.save();
    res.status(201).json({ message: 'Provider registered successfully', provider: newProvider });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.loginProvider = async (req, res) => {
  try {
    const { email, password } = req.body;

    const provider = await Provider.findOne({ email });
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { providerId: provider._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      provider
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



//google Qauth function .......//



//*************************************** */
// Get all providers
exports.getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find();
    res.status(200).json(providers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get profile info

exports.getProviderProfile = async (req, res) => {
  try {
    const provider = await Provider.findById(req.provider._id).select("-password");
    res.status(200).json(provider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//update profile(use put)

exports.updateProviderProfile = async (req, res) => {
  try {
    const provider = await Provider.findById(req.provider._id);
    const { name, phone, experience } = req.body;

    if (name) provider.name = name;
    if (phone) provider.phone = phone;
    if (experience !== undefined) provider.experience = experience;

    await provider.save();

    res.status(200).json({
      message: "Profile updated successfully",
      provider,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//user booking view only for provider

exports.getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ provider: req.provider._id })
      .populate("user", "name email phone")  
      .sort({ createdAt: -1 });              

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//import both function google, login
//module.exports = { googleLoginProvider ,loginProvider,registerProvider};