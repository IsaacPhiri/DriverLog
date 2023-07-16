const express = require('express');
const router = express.Router();
const requireAdmin = require('../../middleware/authMiddleware');

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
router.get('/', requireAdmin, (req, res) => {
  DutyStatus.find()
    .populate('driver')
    .then(DutyStatus => {
      res.json(DutyStatus);
    })
  .catch (err => {
    res.status(404).json({ error: 'No duty statuses found' });
  });
});

// @route GET api/dutystatus/:id
// @description Get single duty status by ID
// @access Public
router.get('/:id', requireAdmin, async (req, res) => {
  try {
    const dutyStatus = await DutyStatus.findById(req.params.id);
    if (!dutyStatus) {
      return res.status(404).json({ error: 'No duty status with that id was found' });
    }
    res.json(dutyStatus);
  } catch (error) {
    res.status(404).json({ error: 'No duty status with that id was found' });
  }
});

// @route POST api/dutystatus
// @description add/save duty status
// @access Public
router.post('/', (req, res) => {
    const dutyStatus = new DutyStatus({
      startDuty: req.body.startDuty,
      endDuty: req.body.endDuty,
      totalWorkingHours: req.body.totalWorkingHours,
      driver: req.body.driver
    });

    dutyStatus.save()
      .then(DutyStatus => {
        res.json(DutyStatus);
      })
        .catch (err => {
          res.status(400).json({ error: 'Unable to add this duty status' });
        });
      });

// @route PUT api/dutystatus/:id
// @description Update duty status
// @access Public
router.put('/:id', requireAdmin, async (req, res) => {
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
router.delete('/:id', requireAdmin, async (req, res) => {
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