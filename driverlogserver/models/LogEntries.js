const mongoose = require('mongoose');

const LogEntrySchema = new mongoose.Schema({
	driverId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Driver',
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
	        type: Number,
	        required: false
	},
	hoursOfService: {
	        type: Number,
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

module.exports = LogEntries = mongoose.model('logEntries', LogEntrySchema);
