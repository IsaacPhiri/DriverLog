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
	logEntries: [
		{
			date: {
				type: String,
				default: Date.nom
			},
			startTime: {
				type: String,
				default: Date.nom
			},
			endTime: {
				type: String,
				default: Date.nom
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
			},
			hoursOfService: {
				type: String,
				required: true
			},
			vehicle: {
				make: {
					type: String,
					required: true
				},
				model: {
					type: String,
					required: true
				},
				licensePlate: {
					type: String,
					required: true
				},
				odometer: {
					type: String,
					required: true
				}
			},
			remarks: {
				type: String,
				required: true
			},
			signature: {
				type: String,
				required: true
			}
		},
// Additional log entries...
		   ]
});

module.exports = Driver = mongoose.model('driver', DriverSchema);
