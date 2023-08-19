const express = require('express');
const router = express.Router();
const { getDrivers, getDriver, createDriver, updateDriver, deleteDriver, getDriverProfile } = require('../../controllers/driverController');
const protect = require('../../middleware/authMiddleware');
const requireAdmin = require('../../middleware/requireAdminMiddleware');

router.get('/', protect, getDrivers);
router.post('/signup-driver', createDriver);
router.get('/me', protect, getDriverProfile);
router.route('/:id').get(protect, getDriver).put(protect, updateDriver).delete(protect, requireAdmin, deleteDriver);

module.exports = router;