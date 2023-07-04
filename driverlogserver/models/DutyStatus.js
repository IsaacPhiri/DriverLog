const mongoose = require('mongoose');

const DutyStatusSchema = new mongoose.Schema({
    startDuty: {
        type: Number,
        //default: Date.now
    },
    endDuty: {
        type: Number,
    },
    totalWorkingHours: {
		type: Number,
		default: 0,
	},
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
});

// Pre-save middleware to calculate total working hours
DutyStatusSchema.pre('save', function (next) {
    if (this.startDuty && this.endDuty) {
      const milliseconds = this.endDuty - this.startDuty;
      //const hours = milliseconds / 1000 / 60 / 60;
      this.totalWorkingHours += milliseconds;
    }
    next();
  });

const DutyStatus = mongoose.model('DutyStatus', DutyStatusSchema);
module.exports = DutyStatus;