//HoursOfService.js
const express = require('express');
const router = express.Router();

// Load HoursOfService model
const HoursOfService = require('../../models/HoursOfService');

// @route GET api/hours-of-service
// @description Get all hours of service entries
// @access Public
router.get('/', (req, res) => {
  HoursOfService.find()
    .populate('driverId')
    .then(hoursOfService => {
      res.json(hoursOfService);
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to fetch hours of service entries' });
    });
});

// @route POST api/hours-of-service
// @description Create a new hours of service entry
// @access Public
router.post('/', (req, res) => {
  const newHoursOfService = new HoursOfService({
    driverId: req.body.driverId,
    hours: req.body.hours
  });

  newHoursOfService.save()
    .then(hoursOfService => {
      res.json(hoursOfService);
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to create a new hours of service entry' });
    });
});

// @route GET api/hours-of-service/:id
// @description Get a single hours of service entry by ID
// @access Public
router.get('/:id', (req, res) => {
  HoursOfService.findById(req.params.id)
    .populate('driverId')
    .then(hoursOfService => {
      if (!hoursOfService) {
        return res.status(404).json({ error: 'Hours of service entry not found' });
      }
      res.json(hoursOfService);
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to fetch hours of service entry' });
    });
});

// @route PUT api/hours-of-service/:id
// @description Update a hours of service entry by ID
// @access Public
router.put('/:id', (req, res) => {
  HoursOfService.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(hoursOfService => {
      if (!hoursOfService) {
        return res.status(404).json({ error: 'Hours of service entry not found' });
      }
      res.json(hoursOfService);
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to update hours of service entry' });
    });
});

// @route DELETE api/hours-of-service/:id
// @description Delete a hours of service entry by ID
// @access Public
router.delete('/:id', (req, res) => {
  HoursOfService.findByIdAndRemove(req.params.id)
    .then(hoursOfService => {
      if (!hoursOfService) {
        return res.status(404).json({ error: 'Hours of service entry not found' });
      }
      res.json({ msg: 'Hours of service entry deleted successfully' });
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to delete hours of service entry' });
    });
});

module.exports = router;
