const express = require("express");
const employeeController=require('../controllers/employeeController');
const departmentController=require('../controllers/departmentController');
const viewController=require('../controllers/viewController');
const router = express.Router();

router.get('/',viewController.home);
router.get('/employee',viewController.viewEmployees);
router.get('/employee/:id',viewController.viewEmployee);
module.exports = router;

