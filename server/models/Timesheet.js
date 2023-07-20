const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    weekStartDate: {
        type: Date,
        required: true
    },
    daysWorked: {
        type: Object,
        required: true
    },
    hoursWorked: {
        type: Object,
        required: true
    },
    documents: {
        type: [String]
    },
    approved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Timesheet', timesheetSchema);