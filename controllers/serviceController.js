const Service = require('../models/serviceModel');

//  Add new service
const createService = async (req, res) => {
  const { name, category, price } = req.body;

  const service = new Service({
    name,
    category,
    price,
  });

  const saved = await service.save();

  res.json({ message: 'Service added successfully', service: saved });
};

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update service
 const updateService = async (req, res) => {
  const { name, category, price } = req.body;

  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }

  service.name = name;
  service.category = category;
  service.price = price;

  await service.save();

  res.json({ message: 'Service updated successfully', service });
};

// Delete service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};