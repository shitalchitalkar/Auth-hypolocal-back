const express = require('express');
const {
  createService,
  getAllServices,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

const router = express.Router();

//  Add new service
router.post('/', createService);

// Get all services
router.get('/', getAllServices);

// Update service by ID
router.put('/:id', updateService);

// Delete service by ID
router.delete('/:id', deleteService);

module.exports = router;