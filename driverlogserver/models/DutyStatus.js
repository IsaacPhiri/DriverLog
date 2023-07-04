const mongoose = require('mongoose');

const DutyStatusSchema = new mongoose.Schema({
    startDuty: {
        type: Date,
        default: Date.now
    },
    endDuty: {
        type: Date,
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

// Calculate the working hours when startDuty or endDuty is modified
DutyStatusSchema.pre('save', function(next) {
  if (this.isModified('startDuty') || this.isModified('endDuty')) {
    const start = this.startDuty.getTime();
    const end = this.endDuty ? this.endDuty.getTime() : Date.now();
    const workingHours = Math.abs(end - start) / 36e5; // Divide by 36e5 to convert milliseconds to hours
    this.totalWorkingHours = workingHours;
  }
  next();
});

// Calculate the working hours when endDuty is updated directly
DutyStatusSchema.pre('findOneAndUpdate', function(next) {
  if (this._update.endDuty) {
    const start = this._update.startDuty.getTime();
    const end = this._update.endDuty.getTime();
    const workingHours = Math.abs(end - start) / 36e5;
    this._update.totalWorkingHours = workingHours;
  }
  next();
});

const DutyStatus = mongoose.model('DutyStatus', DutyStatusSchema);
module.exports = DutyStatus;