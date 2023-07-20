const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

router.get('/:employeeId', employeeController.getEmployeeProfile);
router.post('/timesheets', employeeController.submitTimesheet);
router.get('/:employeeId/timesheets', employeeController.getEmployeeTimesheets);

module.exports = router;