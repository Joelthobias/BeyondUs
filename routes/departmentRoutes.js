const express = require("express");
const departmentController=require('../controllers/departmentController');
const router = express.Router();

router.route('/')
.post(departmentController.AddDepartment)
.get(departmentController.viewAllDepts);
// router.get('/:id',departmentController.viewEmployeByDept);
router.route('/:id')
    .get(departmentController.viewDeptInfo)
    .delete(departmentController.deleteDept)
    .patch(departmentController.updateDept)

module.exports = router;
