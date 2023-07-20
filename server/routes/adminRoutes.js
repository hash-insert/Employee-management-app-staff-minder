const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.post('/', adminController.addEmployee);
router.put('/:employeeId', adminController.updateEmployee);
router.delete('/:employeeId', adminController.deleteEmployee);
router.get('/', adminController.getAllEmployees);
router.put('/timesheets/:timesheetId/approve', adminController.approveTimesheet);
router.get('/timesheets', adminController.getAllTimesheets);

module.exports = router;