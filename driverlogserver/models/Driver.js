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
	licenseNumber: {
		type: Number,
		required: true
	},
	nationalId: {
		type: String,
		required: true,
		match: [
			/^\d{6}\/\d{2}\/\d{1}$/,
			'National ID should be of the format 123456/12/1',
		],
	},
	contactNumber: {
		type: Number,
		required: true,
		validate: {
			validator: function (value) {
			  	return /^\d{10}$/.test(value);
			},
			message: 'Contact number must be 10 digits.',
		},
	},
	email: {
		type: String,
		required: false,
		match: [
			/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
			'Email should be of the format johndoe@gmail.com',
		  ],
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