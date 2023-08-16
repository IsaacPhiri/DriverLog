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
				return /^0\d{9}$/.test(value);
            },
            message: 'Contact number must be in the format 0977123456.',
		},
	},
	email: {
		type: String,
		required: false,
		match: [
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
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
	role: {
		type: String,
		required: true,
		enum: ['driver', 'admin'],
		default: 'driver',
	},
	password: {
		type: String,
		required: true,
	},
}, { timestamps: true
});

const Driver = mongoose.model('Driver', DriverSchema);
module.exports = Driver;