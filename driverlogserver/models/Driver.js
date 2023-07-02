const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true,
	},
	LicenseNumber: {
		type: Number,
		required: true
	},
	nationalId: {
		type: String,
		required: true
	},
	contactNumber: {
		type: Number,
		required: true
	},
	email: {
		type: String,
		required: false
	},
	homeAddress: {
		type: String,
		required: true
	},
	licenseExpiryDate: {
		type: Date,
		required: true
	},
	totalWorkingHours: {
		type: Number,
		default: 0,
	},
	logEntries: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'LogEntry',
	}],
});

const Driver = mongoose.model('Driver', DriverSchema);
module.exports = Driver;