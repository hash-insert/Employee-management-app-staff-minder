const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

router.get('/:employeeId', employeeController.getEmployeeProfile);
router.post('/timesheets', employeeController.submitTimesheet);
router.get('/:employeeId/timesheets', employeeController.getEmployeeTimesheets);
router.post('/leaverequest',employeeController.submitLeaveRequest);
router.put('/resetpassword',employeeController.resetPassword);
router.post('/shortleaverequest',employeeController.submitshortLeaveRequest);

module.exports = router;