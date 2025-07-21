const express = require('express');
const router = express.Router();

const { createService, getAllServices } = require('../controllers/serviceController');

router.post('/', createService);
router.get('/', getAllServices);

module.exports = router;