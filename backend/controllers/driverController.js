const bcrypt = require('bcrypt');
const Driver = require('../models/Driver');
const asyncHandler = require('express-async-handler');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const getDriver = asyncHandler(async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }
        res.json(driver);
    } catch (error) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

const getDrivers = asyncHandler(async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
      } catch (error) {
        res.status(404);
        throw new Error('Drivers not found');
      }
    });

const getDriverProfile = asyncHandler(async (req, res) => {
    try {
        const driver = {
            _id,
            firstName,
            lastName,
            licenseNumber,
            nationalId,
            contactNumber,
            email,
            homeAddress,
            licenseExpiryDate
        } = await Driver.findById(req.user.id);

        if (!driver) {
          return res.status(404);
          throw new Error('Driver not found');
        }
        res.json(driver);
      } catch (error) {
        throw new Error('Internal server error');
      }
    });

const createDriver = asyncHandler(async (req, res) => {
    let {
        firstName,
        lastName,
        licenseNumber,
        nationalId,
        contactNumber,
        email,
        homeAddress,
        licenseExpiryDate,
        password,
        password_confirmation
    } = req.body;
    let errors = [];
    if (!firstName) {
        errors.push({ firstName: "required" });
    }
    if (!lastName) {
        errors.push({ lastName: "required" });
    }
    if (!licenseNumber) {
        errors.push({ licenseNumber: "required" });
    }
    if (!nationalId) {
        errors.push({ nationalId: "required" });
    }
    if (!contactNumber) {
        errors.push({ contactNumber: "required" });
    }
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid" });
    }
    if (!homeAddress) {
        errors.push({ homeAddress: "required" });
    }
    if (!licenseExpiryDate) {
        errors.push({ licenseExpiryDate: "required" });
    }
    if (!password) {
        errors.push({ password: "required" });
    }
    if (!password_confirmation) {
        errors.push({
            password_confirmation: "required",
        });
    }
    if (password != password_confirmation) {
        errors.push({ password: "passwords don't match" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    try {
        const existingDriver = await Driver.findOne({ email: email });
        if (existingDriver) {
            return res.status(422).json({ errors: [{ driver: "email already exists" }] });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const driver = new Driver({
                firstName,
                lastName,
                licenseNumber,
                nationalId,
                contactNumber,
                email,
                homeAddress,
                licenseExpiryDate,
                password: hash
            });
            const response = await driver.save();
            res.status(200).json({ success: true, result: response });
        }
    } catch (err) {
        res.status(500);
        throw new Error('Internal server error');
    }
});    

const updateDriver = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName,
        lastName,
        licenseNumber,
        nationalId,
        contactNumber,
        email,
        homeAddress,
        licenseExpiryDate,
        password,
        password_confirmation } = req.body;
  
      const driver = await Driver.findById(id);
  
      if (!driver) {
        return res.status(404).json({ error: 'No driver found' });
      }
  
      driver.firstName = firstName || driver.firstName;
      driver.lastName = lastName || driver.lastName;
      driver.licenseNumber = licenseNumber || driver.licenseNumber;
      driver.nationalId = nationalId || driver.nationalId;
      driver.contactNumber = contactNumber || driver.contactNumber;
      driver.email = email || driver.email;
      driver.homeAddress = homeAddress || driver.homeAddress;
      driver.licenseExpiryDate = licenseExpiryDate || driver.licenseExpiryDate;
      driver.password = password || driver.password;
      driver.password_confirmation = password_confirmation || driver.password_confirmation;
  
      const updatedDriver = await driver.save();
  
      res.json({
        _id: updatedDriver._id,
        firstName: updatedDriver.firstName,
        lastName: updatedDriver.lastName,
        licenseNumber: updatedDriver.licenseNumber,
        nationalId: updatedDriver.nationalId,
        contactNumber: updatedDriver.contactNumber,
        email: updatedDriver.email,
        homeAddress: updatedDriver.homeAddress,
        licenseExpiryDate: updatedDriver.licenseExpiryDate,
        password: updatedDriver.password,
        password_confirmation: updatedDriver.password_confirmation
      });
    } catch (error) {
      res.status(500);
      throw new Error('Internal server error');
    }
  });

const deleteDriver = asyncHandler(async (req, res) => {
    await Driver.findByIdAndRemove(req.params.id)
        .then(driver => {
            if (!driver) {
                return res.status(404).json({ error: 'Driver not found' });
            }
            res.json({ success: true, result: driver, message: "Driver deleted successfully" });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
});

module.exports = {
    getDriverProfile,
    getDriver,
    getDrivers,
    createDriver,
    updateDriver,
    deleteDriver
};