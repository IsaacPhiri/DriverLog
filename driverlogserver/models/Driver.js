const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
	  driverName: {
		      type: String,
		      required: true
		    },
	  driverLicenseNumber: {
		      type: Number,
		      required: true
		    },
	  national_ID: {
		      type: Number,
		      required: true
		    },
});

module.exports = Driver = mongoose.model('Driver', DriverSchema);
