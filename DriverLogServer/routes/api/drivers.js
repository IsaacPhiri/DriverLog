// routes/api/drivers.js

const express = require('express');
const router = express.Router();

// Load Book model
const Driver = require('../../models/Driver');

// @route GET api/drivers/test
// @description tests books route
// @accesc Public

router.get('/test', (req, res) =>
	res.send('driver route testing!')
);

// @route GET api/drivers
// @description GET all drivers
// @access Public
router.get('/', (req, res) => {
	Driver.find()
	.then(drivers => res.json(drivers))
	.catch(err => res.status(404).json({ nodriversfound: 'No Drivers Found' }));
});

// @route GET api/driver/:id
// @desciption GET single driver by id
// @access Public
router.get('/:id', (req, res) => {
	Driver.findById(req.params.id)
	.then(driver => res.json(driver))
	.catch(err => res.status(404).json({ nodriverfound: 'No Driver Found' }));
});

// @route GET api/drivers
// @description add/save driver
// @access Public
router.post('/', (req, res) => {
  Driver.create(req.body)
    .then(driver => res.json({ msg: 'Driver added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this driver' }));
});

// @route GET api/driver/:id
// @desciption Update driver
// @access Public
router.put('/:id', (req, res) => {
	Driver.findByIdAndUpdate(req.params.id, req.body)
	.then(driver => res.json({ msg: 'Updated successfully' }))
	.catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
});

// @route GET api/driver/:id
// @description Delete driver by id
// @access Public
router.delete('/:id', (req, res) => {
	Driver.findByIdAndRemove(req.params.id, req.body)
	.then(driver => res.json({ msg: 'Driver entry deleted successfully' }))
	.catch(err => res.status(404).json({ error: 'No such Driver in Db' }));
});

module.exports = router;
