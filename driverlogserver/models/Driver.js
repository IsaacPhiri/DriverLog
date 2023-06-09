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
		required: false
	},
	origin: {
		type: String,
		required: false
	},
	destination: {
		type: String,
		required: false
	},
	mileage: {
		type: String,
		required: false
	}
// Additional log entries...
});

module.exports = Driver = mongoose.model('driver', DriverSchema)