const express = require('express');
const router = express.Router();
const { getLogEntries, getLogEntry, createLogEntry, updateLogEntry, deleteLogEntry } = require('../../controllers/logentriesController');

router.route('/').get(getLogEntries).post(createLogEntry);
router.route('/:id').get(getLogEntry).put(updateLogEntry).delete(deleteLogEntry);

module.exports = router;