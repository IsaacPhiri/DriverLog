const express = require('express');
const router = express.Router();
const { getDrivers, getDriver, createDriver, updateDriver, deleteDriver, getDriverProfile } = require('../../controllers/driverController');
const protect = require('../../middleware/authMiddleware');

router.get('/', protect, getDrivers);
router.post('/signup-driver', createDriver);
router.route('/:id').get(protect, getDriver).put(protect, updateDriver).delete(protect, deleteDriver);
router.get('/me', protect, getDriverProfile);

module.exports = router;