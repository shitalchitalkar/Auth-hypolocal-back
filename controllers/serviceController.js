const Service = require('../models/serviceModel');

// Create service
const createService = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const service = new Service({ name, category, price });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error:error.message });
  }
};

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createService,
  getAllServices
};