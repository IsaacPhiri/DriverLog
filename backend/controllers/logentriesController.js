const LogEntry = require('../models/LogEntry');
const Driver = require('../models/Driver');
const Vehicle = require('../models/Vehicle');
const Trip = require('../models/Trip');
const asyncHandler = require('express-async-handler');

const getLogEntries = asyncHandler(async(req, res) => {
    await LogEntry.find()
      .populate('driver')
      .populate('vehicle')
      .populate('trip')
      .then(logEntries => {
        res.json(logEntries);
      })
    .catch (err => {
      res.status(404).json({ error: 'No log entries found' });
    });
  });

const getLogEntry = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const logEntry = await LogEntry.findById(id)
        .populate('driver')
        .populate('vehicle')
        .populate('trip');
        if (!logEntry) {
            res.status(404).json({ error: 'No log entry found' });
        } else {
            res.json(logEntry);
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const createLogEntry = asyncHandler(async (req, res) => {
    try {
        const { driver, logDate, vehicle, trip, comments } = req.body;
        const existingDriver = await Driver.findById(driver);
        const existingVehicle = await Vehicle.findById(vehicle);
        const existingTrip = await Trip.findById(trip);
        if (!existingDriver) {
            return res.status(400).json({ error: 'Driver not found' });
        }
        if (!existingVehicle) {
            return res.status(400).json({ error: 'Vehicle not found' });
        }
        if (!existingTrip) {
            return res.status(400).json({ error: 'Trip not found' });
        }
        const logEntry = new LogEntry({
            driver,
            logDate,
            vehicle,
            trip,
            comments
        });
        const createdLogEntry = await logEntry.save();
        res.status(201).json(createdLogEntry);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const updateLogEntry = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { driver, logDate, vehicle, trip, comments } = req.body;
        const existingDriver = await Driver.findById(driver);
        const existingVehicle = await Vehicle.findById(vehicle);
        const existingTrip = await Trip.findById(trip);
        if (!existingDriver) {
            return res.status(400).json({ error: 'Driver not found' });
        }
        if (!existingVehicle) {
            return res.status(400).json({ error: 'Vehicle not found' });
        }
        if (!existingTrip) {
            return res.status(400).json({ error: 'Trip not found' });
        }
        const logEntry = await LogEntry.findById(id);
        if (!logEntry) {
            return res.status(404).json({ error: 'No log entry found' });
        }
        logEntry.driver = driver || logEntry.driver;
        logEntry.logDate = logDate || logEntry.logDate;
        logEntry.vehicle = vehicle || logEntry.vehicle;
        logEntry.trip = trip || logEntry.trip;
        logEntry.comments = comments || logEntry.comments;
        const updatedLogEntry = await logEntry.save();
        res.json({
            _id: updatedLogEntry._id,
            driver: updatedLogEntry.driver,
            logDate: updatedLogEntry.logDate,
            vehicle: updatedLogEntry.vehicle,
            trip: updatedLogEntry.trip,
            comments: updatedLogEntry.comments
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const deleteLogEntry = asyncHandler(async (req, res) => {
    await LogEntry.findByIdAndRemove(req.params.id)
        .then(logEntry => {
            if (!logEntry) {
                return res.status(404).json({ error: 'Log entry not found' });
            }
            res.json({ message: 'Log entry deleted successfully' });
        })
        .catch(err => {
            res.status(400).json({ error: 'Unable to delete log entry' });
        });
});

module.exports = {
    getLogEntries,
    getLogEntry,
    createLogEntry,
    updateLogEntry,
    deleteLogEntry
};