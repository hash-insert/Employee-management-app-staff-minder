const mongoose = require('mongoose');

const shortleaveRequestSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [
            'pending', 'approved', 'rejected'
        ],
        required: true
    },
    leaveType: {
        type: String,
        enum: [
            'short', 'full'
        ], // You can specify different leave types here, 'short' and 'full' in this case
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    fromTime: {
        type: String,
        required: function () {
            return this.leaveType === 'short'; // 'fromTime' is required only for short leaves
        }
    },
    toTime: {
        type: String,
        required: function () {
            return this.leaveType === 'short'; // 'toTime' is required only for short leaves
        }
    }
});
const shortLeaveRequest = mongoose.model('shortLeaveRequest', shortleaveRequestSchema);
module.exports = shortLeaveRequest;