const Provider = require('../models/providerModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const registerProvider = async (req, res) => {
  try {
    const { name, email, phone, password, category } = req.body;

    //if provider already exists
    const existing = await Provider.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create provider
    const provider = await Provider.create({
      name,
      email,
      phone,
      password: hashedPassword,
      category,
    });

    res.status(201).json({
      message: 'Registered successfully',
      _id: provider._id,
      name: provider.name,
      email: provider.email,
      token: generateToken(provider._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
const loginProvider = async (req, res) => {
  try {
    const { email, password } = req.body;

    const provider = await Provider.findOne({ email });
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({
      message: 'Login successful',
      _id: provider._id,
      name: provider.name,
      email: provider.email,
      token: generateToken(provider._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Providers
const getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find().select('-password');
    res.status(200).json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Token generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
  registerProvider,
  loginProvider,
  getAllProviders,
};