const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
	  make: {
		  type: String,
		  required: true
	  },
	  model: {
		  type: String,
		  required: true
	  },
	  licensePlate: {
		  type: Number,
		  required: true
	  },
});

module.exports = Vehicle = mongoose.model('Vehicle', VehicleSchema);
