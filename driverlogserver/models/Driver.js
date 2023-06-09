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
			vehicle: {
				make: {
					type: String,
					required: false
				},
				model: {
					type: String,
					required: false
				},
				licensePlate: {
					type: String,
					required: false
				},
				odometer: {
					type: String,
					required: false
				}
			},
			remarks: {
				type: String,
				required: false
			},
			signature: {
				type: String,
				required: false
			}
		},
// Additional log entries...
		   ]
});

module.exports = Driver = mongoose.model('driver', DriverSchema);
