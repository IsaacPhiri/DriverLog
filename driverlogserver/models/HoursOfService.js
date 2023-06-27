const mongoose = require('mongoose');

const HoursOfServiceSchema = new mongoose.Schema({
	driverId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Driver',
	},

	hours: {
		type: Number,
		required: true
	},
});

module.exports = HoursOfService = mongoose.model('HoursOfService', HoursOfServiceSchema);
