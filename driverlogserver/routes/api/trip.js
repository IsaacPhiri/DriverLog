// route for trip.js
const express = require('express');
const router = express.Router();

// Load Trip model
const Trip = require('../../models/Trip');

// @route GET api/trips
// @description Get all trips
// @access Public
router.get('/', (req, res) => {
  Trip.find()
    .populate('driverId')
    .populate('vehicleId')
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
  const newTrip = new Trip({
    driverId: req.body.driverId,
    vehicleId: req.body.vehicleId,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    purpose: req.body.purpose,
    origin: req.body.origin,
    destination: req.body.destination,
    startMileage: req.body.startMileage,
    endMileage: req.body.endMileage
  });

  newTrip.save()
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
    .populate('driverId')
    .populate('vehicleId')
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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
