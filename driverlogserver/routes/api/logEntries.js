// routes/api/logEntries.js
const express = require('express');
const router = express.Router();

// Load LogEntry model
const LogEntry = require('../../models/LogEntry');

// @route GET api/log-entries
// @description Get all log entries
// @access Public
router.get('/', (req, res) => {
  LogEntry.find()
    .populate('tripId')
    .then(logEntries => {
      res.json(logEntries);
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to fetch log entries' });
    });
});

// @route POST api/log-entries
// @description Create a new log entry
// @access Public
router.post('/', (req, res) => {
  const newLogEntry = new LogEntry({
    tripId: req.body.tripId,
    remarks: req.body.remarks
  });

  newLogEntry.save()
    .then(logEntry => {
      res.json(logEntry);
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to create a new log entry' });
    });
});

// @route GET api/log-entries/:id
// @description Get a single log entry by ID
// @access Public
router.get('/:id', (req, res) => {
  LogEntry.findById(req.params.id)
    .populate('tripId')
    .then(logEntry => {
      if (!logEntry) {
        return res.status(404).json({ error: 'Log entry not found' });
      }
      res.json(logEntry);
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to fetch log entry' });
    });
});

// @route PUT api/log-entries/:id
// @description Update a log entry by ID
// @access Public
router.put('/:id', (req, res) => {
  LogEntry.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(logEntry => {
      if (!logEntry) {
        return res.status(404).json({ error: 'Log entry not found' });
      }
      res.json(logEntry);
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to update log entry' });
    });
});

// @route DELETE api/log-entries/:id
// @description Delete a log entry by ID
// @access Public
router.delete('/:id', (req, res) => {
  LogEntry.findByIdAndRemove(req.params.id)
    .then(logEntry => {
      if (!logEntry) {
        return res.status(404).json({ error: 'Log entry not found' });
      }
      res.json({ msg: 'Log entry deleted successfully' });
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to delete log entry' });
    });
});

module.exports = router;
