const Employee = require("../models/Employee");
const Timesheet = require("../models/Timesheet");
const Leaverequest = require("../models/leaveRequest");
const shortLeaveRequest = require('../models/shortLeaveRequest');
const { validateEmployeeId} = require("../validations/timesheetValidations");

exports.getEmployeeProfile = async (req, res, next) => {
    try {
        const { employeeId } = req.params;
        const employeeIdError = validateEmployeeId(employeeId);
        if (employeeIdError) {
            return res.status(400).json({ error: employeeIdError });
        }
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
    } catch (error) {
        next(error);
    }
};

exports.submitTimesheet = async (req, res, next) => {
    try {
        const { employeeId,employeeName, year, month, week, date,status, fromTime, toTime, documents, notes } = req.body;
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        const timesheet = new Timesheet({
            employeeId,employeeName, year, month, week, date,status, fromTime, toTime, documents, notes
        });
        await timesheet.save();
        res.status(201).json(timesheet);
    } catch (error) {
        next(error);
    }
};

exports.getEmployeeTimesheets = async (req, res, next) => {
    try {
        const { employeeId } = req.params;
        const employeeIdError = validateEmployeeId(employeeId);
        if (employeeIdError) {
            return res.status(400).json({ error: employeeIdError });
        }
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const timesheets = await Timesheet.find({ employeeId });
        res.json(timesheets);
    } catch (error) {
        next(error);
    }
};

exports.submitLeaveRequest = async (req, res, next) => {
    try {
        const {
            employeeId,
            employeeName,
            status,
            fromDate,
            toDate,
            leaveType
        } = req.body;

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const LeaveRequest = new Leaverequest({
            employeeId,
            employeeName,
            status,
            fromDate,
            toDate,
            leaveType
        });

        await LeaveRequest.save();

        res.status(201).json(LeaveRequest);
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;
        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }
        employee.password = newPassword;
        await employee.save();

        res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        next(error);
    }
};

exports.submitshortLeaveRequest = async (req, res, next) => {
    try {
        const {
            employeeId,
            employeeName,
            status,
            Date,
            fromTime,
            toTime,
            leaveType
        } = req.body;
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        const shortLeaverequest = new shortLeaveRequest({
            employeeId,
            employeeName,
            status,
            Date,
            fromTime,
            toTime,
            leaveType
        });
        await shortLeaverequest.save();
        res.status(201).json(shortLeaverequest);
    } catch (error) {
        next(error);
    }
};

exports.getEmployeeTimesheetsByYear = async (req, res, next) => {
    try {
        const { employeeId, year } = req.params;
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const timesheets = await Timesheet.find({ employeeId, year: parseInt(year, 10) });

        res.json(timesheets);
    } catch (error) {
        next(error);
    }
};

exports.getEmployeeTimesheetsByMonth = async (req, res, next) => {
    try {
        const { employeeId, year, month } = req.params;
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const timesheets = await Timesheet.find({ employeeId, year: parseInt(year, 10), month: parseInt(month, 10) });

        res.json(timesheets);
    } catch (error) {
        next(error);
    }
};

exports.getEmployeeTimesheetsByWeek = async (req, res, next) => {
    try {
        const { employeeId, year, month, week } = req.params;
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const timesheets = await Timesheet.find({ employeeId, year: parseInt(year, 10), month: parseInt(month, 10), week });

        res.json(timesheets);
    } catch (error) {
        next(error);
    }
};

exports.getEmployeeTimesheetsByDate = async (req, res, next) => {
    try {
        const { employeeId, year, month, week, date } = req.params;
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const timesheets = await Timesheet.find({ employeeId, year, month, week, date });
        res.json(timesheets);
    } catch (error) {
        next(error);
    }
};