const mongoose = require('mongoose');

const DutyStatusSchema = new mongoose.Schema({
    startDuty: {
        type: Date,
        default: Date.now
    },
    endDuty: {
        type: Date
    },
});

// Set the endDuty field when a value is provided
DutyStatusSchema.pre('save', function (next) {
    if (this.isModified('endDuty') && !this.endDuty) {
        this.endDuty = new Date();
    }
    next();
});

// Calculate the duration between startDuty and endDuty
// and append it to the driver's totalWorkHours
DutyStatusSchema.pre('save', async function (next) {
    if (this.isModified('endDuty')) {
        const driver = await mongoose.model('Driver').findById(this.driver);
        const duration = this.endDuty - this.startDuty;
        driver.totalWorkHours += duration;
        await driver.save();
    }
    next();
});

const DutyStatus = mongoose.model('DutyStatus', DutyStatusSchema);
module.exports = DutyStatus;