// routes/api/logEntries.js

const express = require('express');
const router = express.Router();

// Load Log model
const LogEntries = require('../../models/LogEntries');

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
        .then(logentries => res.json(logentries))
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
