const Employee = require('../models/Employee');
const Timesheet = require('../models/Timesheet');

exports.getEmployeeProfile = async (req, res, next) => {
    try {
        const {employeeId} = req.params;
        const employee = await Employee.findById(employeeId);
        if (! employee) {
            return res.status(404).json({message: 'Employee not found'});
        }
        res.json(employee);
    } catch (error) {
        next(error);
    }
};
exports.submitTimesheet = async (req, res, next) => {
    try {
        const {employeeId, weekStartDate, hoursWorked, documents} = req.body;
        const employee = await Employee.findById(employeeId);
        if (! employee) {
            return res.status(404).json({message: 'Employee not found'});
        }
        const timesheet = new Timesheet({employeeId, weekStartDate, hoursWorked, documents});
        await timesheet.save();
        res.status(201).json(timesheet);
    } catch (error) {
        next(error);
    }
};
exports.getEmployeeTimesheets = async (req, res, next) => {
    try {
        const {employeeId} = req.params;
        const employee = await Employee.findById(employeeId);
        if (! employee) {
            return res.status(404).json({message: 'Employee not found'});
        }
        const timesheets = await Timesheet.find({employeeId});
        res.json(timesheets);
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