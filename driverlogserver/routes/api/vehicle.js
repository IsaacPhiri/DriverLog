// vehicle.js
const express = require('express');
const router = express.Router();

// Load Vehicle model
const Vehicle = require('../../models/Vehicle');

// @route GET api/vehicles
// @description Get all vehicles
// @access Public
router.get('/', (req, res) => {
  Vehicle.find()
    .then(vehicles => {
      res.json(vehicles);
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to fetch vehicles' });
    });
});

// @route POST api/vehicles
// @description Create a new vehicle
// @access Public
router.post('/', (req, res) => {
  const newVehicle = new Vehicle({
    make: req.body.make,
    model: req.body.model,
    licensePlate: req.body.licensePlate
  });

  newVehicle.save()
    .then(vehicle => {
      res.json(vehicle);
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to create a new vehicle' });
    });
});

// @route GET api/vehicles/:id
// @description Get a single vehicle by ID
// @access Public
router.get('/:id', (req, res) => {
  Vehicle.findById(req.params.id)
    .then(vehicle => {
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.json(vehicle);
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to fetch vehicle' });
    });
});

// @route PUT api/vehicles/:id
// @description Update a vehicle by ID
// @access Public
router.put('/:id', (req, res) => {
  Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(vehicle => {
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.json(vehicle);
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to update vehicle' });
    });
});

// @route DELETE api/vehicles/:id
// @description Delete a vehicle by ID
// @access Public
router.delete('/:id', (req, res) => {
  Vehicle.findByIdAndRemove(req.params.id)
    .then(vehicle => {
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.json({ msg: 'Vehicle deleted successfully' });
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to delete vehicle' });
    });
});

module.exports = router;
