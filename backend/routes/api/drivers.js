const express = require('express');
const router = express.Router();
const { getDrivers, getDriver, createDriver, updateDriver, deleteDriver } = require('../../controllers/driverController');

router.get('/', getDrivers);
router.post('/signup-driver', createDriver);
router.route('/:id').get(getDriver).put(updateDriver).delete(deleteDriver);
  
module.exports = router;