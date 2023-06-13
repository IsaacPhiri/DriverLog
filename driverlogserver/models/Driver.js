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
	  national_ID: {
		      type: String,
		      required: true
		    },
	date: {
		type: Date,
		default: Date.now,
		required: true
	},
	startTime: {
		type: String,
		required: false
	},
	endTime: {
	        type: String,
	        required: false
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
	},
	hoursOfService: {
	        type: String,
	        required: false
	},
	remarks: {
	        type: String,
	        required: false
	},
	signature: {
	        type: String,
		required: false
	}
});

module.exports = Driver = mongoose.model('driver', DriverSchema);
