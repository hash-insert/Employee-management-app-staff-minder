const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.post('/', adminController.addEmployee);
router.put('/:employeeId', adminController.updateEmployee);
router.delete('/:employeeId', adminController.deleteEmployee);
router.get('/', adminController.getAllEmployees);
router.put('/timesheets/:timesheetId/approve', adminController.approveTimesheet);
router.get('/timesheets', adminController.getAllTimesheets);
router.get('/leaverequest', adminController.getAllLeaverequest);
router.put('/leaverequest/:leaverequestId', adminController.approveLeaverequest);
router.get('/shortleaverequest',adminController.getAllshortLeaverequest);
router.put('/shortleaverequest/:shortleaverequestId',adminController.approveshortLeaverequest);

module.exports = router;