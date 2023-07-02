const mongoose = require('mongoose');

const LogEntrySchema = new mongoose.Schema({
	driver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Driver',
		required: true
	},
	logDate: {
		type: Date,
		default: Date.now
	},
	vehicle: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Vehicle',
		required: true
	},
	trip: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Trip'
	},
	comments: {
		type: String,
		required: true
	},
});

const LogEntry = mongoose.model('LogEntry', LogEntrySchema);
module.exports = LogEntry;