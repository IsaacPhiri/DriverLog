const express = require('express');
const router = express.Router();
const requireAdmin = require('../../middleware/authMiddleware');

const Trip = require('../../models/Trip');

// @route GET api/trips
// @description Get all trips
// @access Public
router.get('/', (req, res) => {
  Trip.find()
    .then(trips => {
      res.json(trips);
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to fetch trips' });
    });
});

// @route POST api/trips
// @description Create a new trip
// @access Public
router.post('/', (req, res) => {
  const { origin, destination, startMileage, endMileage, purpose } = req.body;

  const newTrip = new Trip({
    origin,
    destination,
    startMileage,
    endMileage,
    purpose,
  });

  newTrip
    .save()
    .then(trip => {
      res.json(trip);
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to create a new trip' });
    });
});

// @route GET api/trips/:id
// @description Get a single trip by ID
// @access Public
router.get('/:id', (req, res) => {
  Trip.findById(req.params.id)
    .then(trip => {
      if (!trip) {
        return res.status(404).json({ error: 'Trip not found' });
      }
      res.json(trip);
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to fetch trip' });
    });
});

// @route PUT api/trips/:id
// @description Update a trip by ID
// @access Public
router.put('/:id', requireAdmin, (req, res) => {
  Trip.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(trip => {
      if (!trip) {
        return res.status(404).json({ error: 'Trip not found' });
      }
      res.json(trip);
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to update trip' });
    });
});

// @route DELETE api/trips/:id
// @description Delete a trip by ID
// @access Public
router.delete('/:id', requireAdmin, (req, res) => {
  Trip.findByIdAndRemove(req.params.id)
    .then(trip => {
      if (!trip) {
        return res.status(404).json({ error: 'Trip not found' });
      }
      res.json({ msg: 'Trip deleted successfully' });
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to delete trip' });
    });
});

module.exports = router;