const Trip = require('../models/Trip');
const Driver = require('../models/Driver');
const asyncHandler = require('express-async-handler');

const getTrips = asyncHandler(async(req, res) => {
    await Trip.find()
    .populate('driver')
      .then(trips => {
        res.json(trips);
      })
    .catch (err => {
      res.status(404).json({ error: 'No trips found' });
    });
  });

const getTrip = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Trip.findById(id)
    .populate('driver')
    .then(trip => {
        res.json(trip);
        })
    .catch (err => {
        res.status(404).json({ error: 'No trip found' });
        });
    });

const createTrip = asyncHandler(async (req, res) => {
    try {
        const { origin, destination, startMileage, endMileage, purpose, distance, totalMileage, driver } = req.body;
        const existingDriver = await Driver.findById(driver);
        if (!existingDriver) {
            return res.status(400).json({ error: 'Driver not found' });
        }
        const trip = new Trip({
            origin,
            destination,
            startMileage,
            endMileage,
            purpose,
            distance,
            totalMileage,
            driver
        });
        const createdTrip = await trip.save();
        res.status(201).json(createdTrip);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const updateTrip = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { startLocation, endLocation, distance, driver } = req.body;
        const existingDriver = await Driver.findById(driver);
        if (!existingDriver) {
            return res.status(400).json({ error: 'Driver not found' });
        }
        const trip = await Trip.findById(id);
        if (!trip) {
            return res.status(404).json({ error: 'No trip found' });
        }
        trip.startLocation = startLocation || trip.startLocation;
        trip.endLocation = endLocation || trip.endLocation;
        trip.distance = distance || trip.distance;
        trip.driver = driver || trip.driver;
        const updatedTrip = await trip.save();
        res.json({
            _id: updatedTrip._id,
            startLocation: updatedTrip.startLocation,
            endLocation: updatedTrip.endLocation,
            distance: updatedTrip.distance,
            driver: updatedTrip.driver
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const deleteTrip = asyncHandler(async (req, res) => {
    await Trip.findByIdAndRemove(req.params.id)
        .then(trip => {
            if (!trip) {
                return res.status(404).json({ error: 'Trip not found' });
            }
            res.json({ message: 'Trip deleted successfully' });
        })
        .catch(err => {
            res.status(400).json({ error: 'Unable to delete trip' });
        });
});

module.exports = {
    getTrips,
    getTrip,
    createTrip,
    updateTrip,
    deleteTrip
};