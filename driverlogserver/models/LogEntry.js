const mongoose = require('mongoose');

const LogEntrySchema = new mongoose.Schema({
	tripId: {
		type: mongoose.Schema.Types.ObjectId,
                ref: 'Trip',
	},
	remarks: {
	        type: String,
	        required: false
	},
});

module.exports = LogEntry = mongoose.model('LogEntry', LogEntrySchema);
