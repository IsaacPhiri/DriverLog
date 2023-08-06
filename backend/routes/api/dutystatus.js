const express = require('express');
const router = express.Router();
const DutyStatus = require('../../models/DutyStatus');
const { getDutyStatuses, getDutyStatus, createDutyStatus, updateDutyStatus, deleteDutyStatus } = require('../../controllers/dutystatusController');

router.route('/').get(getDutyStatuses).post(createDutyStatus);
router.route('/:id').get(getDutyStatus).put(updateDutyStatus).delete(deleteDutyStatus);

module.exports = router;