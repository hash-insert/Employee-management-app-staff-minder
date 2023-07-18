const Employee = require('../models/Employee');
const Timesheet = require('../models/Timesheet');

// Get Employee Profile
exports.getEmployeeProfile = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
};

// Submit Timesheet
exports.submitTimesheet = async (req, res, next) => {
  try {
    const { employeeId, weekStartDate, hoursWorked, documents } = req.body;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const timesheet = new Timesheet({
      employeeId,
      weekStartDate,
      hoursWorked,
      documents,
    });

    await timesheet.save();

    res.status(201).json(timesheet);
  } catch (error) {
    next(error);
  }
};

// Get Employee Timesheets (Calendar View)
exports.getEmployeeTimesheets = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const timesheets = await Timesheet.find({ employeeId });
    res.json(timesheets);
  } catch (error) {
    next(error);
  }
};
