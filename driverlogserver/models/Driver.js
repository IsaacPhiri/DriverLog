const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
	driverName: {
		type: String,
		required: true
	},
	driverLicenseNumber: {
		type: String,
		required: true
	},
	purpose: {
		type: String,
		required: true
	},
	origin: {
		type: String,
		required: true
	},
	destination: {
		type: String,
		required: true
	},
	mileage: {
		type: String,
		required: true
	}
// Additional log entries...
});

module.exports = Driver = mongoose.model('driver', DriverSchema)