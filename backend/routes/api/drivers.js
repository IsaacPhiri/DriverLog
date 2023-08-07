const express = require('express');
const router = express.Router();
const { getDrivers, getDriver, createDriver, updateDriver, deleteDriver } = require('../../controllers/driverController');
const protect = require('../../middleware/authMiddleware');

router.get('/', protect, getDrivers);
router.post('/signup-driver', createDriver);
router.route('/:id').put(updateDriver).delete(deleteDriver);
router.get('/me', protect, getDriver);

module.exports = router;