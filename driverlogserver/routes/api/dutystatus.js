const express = require('express');
const router = express.Router();

// Load DutyStatus model
const DutyStatus = require('../../models/DutyStatus');


// @route GET api/dutystatus/test
// @description tests dutystatus route
// @access Public
router.get('/test', (req, res) => {
  res.send('dutystatus route testing!');
});

// @route GET api/dutystatus
// @description Get all duty statuses
// @access Public
router.get('/', async (req, res) => {
  try {
    const dutyStatuses = await DutyStatus.find();
    res.json(dutyStatuses);
  } catch (error) {
    res.status(404).json({ error: 'No duty statuses found' });
  }
});

// @route GET api/dutystatus/:id
// @description Get single duty status by ID
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const dutyStatus = await DutyStatus.findById(req.params.id);
    if (!dutyStatus) {
      return res.status(404).json({ error: 'No duty status found' });
    }
    res.json(dutyStatus);
  } catch (error) {
    res.status(404).json({ error: 'No duty status found' });
  }
});

// @route POST api/dutystatus
// @description add/save duty status
// @access Public
router.post('/', async (req, res) => {
  try {
    const dutyStatus = new DutyStatus({
      startDuty: req.body.startDuty,
      endDuty: req.body.endDuty,
      driver: req.body.driverId
    });

    const savedDutyStatus = await dutyStatus.save();
    res.json({ msg: 'Duty status added successfully', dutyStatus: savedDutyStatus });
  } catch (error) {
    res.status(400).json({ error: 'Unable to add this duty status' });
  }
});

// @route PUT api/dutystatus/:id
// @description Update duty status
// @access Public
router.put('/:id', async (req, res) => {
  try {
    const { startDuty, endDuty } = req.body;

    const dutyStatus = await DutyStatus.findById(req.params.id);
    if (!dutyStatus) {
      return res.status(404).json({ error: 'No duty status found' });
    }

    dutyStatus.startDuty = startDuty;
    dutyStatus.endDuty = endDuty;

    const updatedDutyStatus = await dutyStatus.save();
    res.json({ msg: 'Updated duty status successfully', dutyStatus: updatedDutyStatus });
  } catch (error) {
    res.status(400).json({ error: 'Unable to update the duty status' });
  }
});

// @route DELETE api/dutystatus/:id
// @description Delete duty status by id
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    const dutyStatus = await DutyStatus.findById(req.params.id);
    if (!dutyStatus) {
      return res.status(404).json({ error: 'No duty status found' });
    }

    await DutyStatus.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Duty status deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: 'No such duty status in the database' });
  }
});

module.exports = router;