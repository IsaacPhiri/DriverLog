const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
	driverId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Driver',
	},
	vehicleId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Vehicle',
	},
	startTime: {
		type: Date,
		default: Date.now,
		required: true
	},
	endTime: {
	        type: String,
		default: Date.now,
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
	startMileage: {
	        type: Number,
	        required: false
	},
	endMileage: {
		type: Number,
		required: false
	},
});

module.exports = Trip = mongoose.model('Trip', TripSchema);
