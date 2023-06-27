// routes/api/drivers.js
const express = require('express');
const router = express.Router();

// Load Driver model
const Driver = require('../../models/Driver');

// @route GET api/drivers/test
// @description tests drivers route
// @accesc Public

router.get('/test', (req, res) =>
	res.send('driver route testing!')
);

// @route GET api/drivers
// @description Get all drivers
// @access Public
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(404).json({ error: 'No drivers found' });
  }
});

// @route GET api/driver/:id
// @description Get single driver by ID
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'No driver found' });
    }
    res.json(driver);
  } catch (error) {
    res.status(404).json({ error: 'No driver found' });
  }
});

// @route POST api/drivers
// @description add/save driver
// @access Public
router.post('/', (req, res) => {
  const newDriver = new Driver({
    driverName: req.body.driverName,
    driverLicenseNumber: req.body.driverLicenseNumber,
    national_ID: req.body.national_ID
  });

  newDriver.save()
    .then(driver => {
      res.json({ msg: 'Driver added successfully', driver });
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to add this driver' });
    });
});

// @route PUT api/driver/:id
// @description Update driver
// @access Public
router.put('/:id', (req, res) => {
  Driver.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ msg: 'Updated successfully' });
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to update the database' });
    });
});

// @route DELETE api/driver/:id
// @description Delete driver by id
// @access Public
router.delete('/:id', (req, res) => {
  Driver.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ msg: 'Driver entry deleted successfully' });
    })
    .catch(err => {
      res.status(404).json({ error: 'No such driver in the database' });
    });
});

module.exports = router;
