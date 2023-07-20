const Employee = require('../models/Employee');
const Timesheet = require('../models/Timesheet');
const {
    validateEmployeeData,
    validateEmployeeId,
    validateTimesheetId
} = require('../validations/employeeValidations');

exports.addEmployee = async (req, res, next) => {
    try {
        validateEmployeeData(req, res, async () => {
            const { name, email, team, role, dateOfJoining, dateOfBirth, phoneNumber, password } = req.body;
            const existingEmployee = await Employee.findOne({ email });
            if (existingEmployee) {
                return res.status(409).json({ error: 'Email already exists in the database.' });
            }
            const employee = new Employee({ name, email, team, role, dateOfJoining, dateOfBirth, phoneNumber, password });
            employee.save()
                .then(() => res.status(201).json(employee))
                .catch(next);
        });
    } catch (error) {
        next(error);
    }
};


exports.updateEmployee = async (req, res, next) => {
    try {
        const { name, team } = req.body;
        const { employeeId } = req.params;
        validateEmployeeId(req, res, () => {
            Employee.findByIdAndUpdate(
                employeeId,
                { name, team },
                { new: true }
            )
                .then(employee => {
                    if (!employee) {
                        return res.status(404).json({ message: 'Employee not found' });
                    }
                    res.json(employee);
                })
                .catch(next);
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteEmployee = async (req, res, next) => {
    try {
        const { employeeId } = req.params;
        validateEmployeeId(req, res, () => {
            Employee.findByIdAndDelete(employeeId)
                .then(employee => {
                    if (!employee) {
                        return res.status(404).json({ message: 'Employee not found' });
                    }
                    res.json(employee);
                })
                .catch(next);
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllEmployees = async (req, res, next) => {
    try {
        Employee.find()
            .then(employees => res.json(employees))
            .catch(next);
    } catch (error) {
        next(error);
    }
};

exports.approveTimesheet = async (req, res, next) => {
    try {
        const { timesheetId } = req.params;
        validateTimesheetId(req, res, () => {
            Timesheet.findByIdAndUpdate(
                timesheetId,
                { approved: true },
                { new: true }
            )
                .then(timesheet => {
                    if (!timesheet) {
                        return res.status(404).json({ message: 'Timesheet not found' });
                    }
                    res.json(timesheet);
                })
                .catch(next);
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllTimesheets = async (req, res, next) => {
    try {
        Timesheet.find()
            .then(timesheets => res.json(timesheets))
            .catch(next);
    } catch (error) {
        next(error);
    }
};