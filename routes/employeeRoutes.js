const express = require("express");
const employeeController=require('../controllers/employeeController');
const router = express.Router();

router.route('/')
.post(employeeController.insertEmployee)
.get(employeeController.viewAllEmployees);
router.get('/dept/:id',employeeController.viewEmployeByDept);
router.route('/:id')
    .get(employeeController.viewEmployee)
    .delete(employeeController.deleteEmployee)
    .patch(employeeController.updateEmployee)

module.exports = router;
