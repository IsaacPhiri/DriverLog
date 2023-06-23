// routes/api/drivers.js

const express = require('express');
const router = express.Router();

// Load Driver model
const Driver = require('../../models/Driver');
const LogEntries = require('../../models/LogEntries');

// @route GET api/drivers/test
// @description tests drivers route
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

// @route GET api/logentries/test
// @description tests log route
// @accesc Public

router.get('/testLog', (req, res) =>
        res.send('logentry route testing!')
);

// @route GET api/logEntries
// @description GET all logentries
// @access Public
router.get('/logs', (req, res) => {
        LogEntries.find()
        .then(logEntries => res.json(logEntries))
        .catch(err => res.status(404).json({ nologentriesfound: 'No LogEntries Found' }));
});

// @route GET api/logEntries/:id
// @desciption GET single logEntry by id
// @access Public
router.get('/logs:id', (req, res) => {
        LogEntries.findById(req.params.id)
        .then(logEntries => res.json(logEntries))
        .catch(err => res.status(404).json({ nologentriesfound: 'No Log Entries Found' }));
});

// @route GET api/logEntries
// @description add/save logEntry
// @access Public
router.post('/logs', (req, res) => {
  LogEntries.create(req.body)
    .then(logEntries => res.json({ msg: 'LogEntry added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this Log entry' }));
});

// @route GET api/logEntries/:id
// @desciption Update log
// @access Public
router.put('/logs:id', (req, res) => {
        LogEntries.findByIdAndUpdate(req.params.id, req.body)
        .then(logEntries => res.json({ msg: 'Updated successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
});

// @route GET api/logEntries/:id
// @description Delete log by id
// @access Public
router.delete('/logs:id', (req, res) => {
        LogEntries.findByIdAndRemove(req.params.id, req.body)
        .then(logEntries => res.json({ msg: 'LogEntry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such Log in Db' }));
});

module.exports = router;
