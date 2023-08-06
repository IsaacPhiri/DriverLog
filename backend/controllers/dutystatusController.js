const DutyStatus = require('../models/DutyStatus');
const Driver = require('../models/Driver');
const asyncHandler = require('express-async-handler');

const getDutyStatuses = asyncHandler(async(req, res) => {
    await DutyStatus.find()
      .populate('driver')
      .then(DutyStatus => {
        res.json(DutyStatus);
      })
    .catch (err => {
      res.status(404).json({ error: 'No duty statuses found' });
    });
  });

const getDutyStatus = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const dutyStatus = await DutyStatus.findById(id).populate('driver');
        if (!dutyStatus) {
            res.status(404).json({ error: 'No duty status found' });
        } else {
            res.json(dutyStatus);
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const createDutyStatus = asyncHandler(async (req, res) => {
    try {
        const { startDuty, endDuty, totalWorkingHours, driver } = req.body;
        const existingDriver = await Driver.findById(driver);
        if (!existingDriver) {
            return res.status(400).json({ error: 'Driver not found' });
        }
        const dutyStatus = new DutyStatus({
            startDuty,
            endDuty,
            totalWorkingHours,
            driver
        });
        const createdDutyStatus = await dutyStatus.save();
        res.status(201).json(createdDutyStatus);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const updateDutyStatus = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { startDuty, endDuty, totalWorkingHours, driver } = req.body;
        const existingDriver = await Driver.findById(driver);
        if (!existingDriver) {
            return res.status(400).json({ error: 'Driver not found' });
        }
        const dutyStatus = await DutyStatus.findById(id);
        if (!dutyStatus) {
            return res.status(404).json({ error: 'No duty status found' });
        }
        dutyStatus.startDuty = startDuty || dutyStatus.startDuty;
        dutyStatus.endDuty = endDuty || dutyStatus.endDuty;
        dutyStatus.totalWorkingHours = totalWorkingHours || dutyStatus.totalWorkingHours;
        dutyStatus.driver = driver || dutyStatus.driver;
        const updatedDutyStatus = await dutyStatus.save();
        res.json(updatedDutyStatus);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const deleteDutyStatus = asyncHandler(async (req, res) => {
    await DutyStatus.findByIdAndRemove(req.params.id)
        .then(dutyStatus => {
            return res.json({ message: 'Duty status deleted successfully' });
        })
        .catch(err => {
            res.status(400).json({ error: 'Unable to delete duty status' });
        });
});

module.exports = {
    getDutyStatuses,
    getDutyStatus,
    createDutyStatus,
    updateDutyStatus,
    deleteDutyStatus
};