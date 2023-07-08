const employee = require('../models/empModel');
const Dept = require('../models/deptModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.insertEmployee = catchAsync(async (req, res, next) => {
  const newEmployee = await employee.create(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      employee: newEmployee
    }
  });
});

exports.assignDepartment=catchAsync(async(req,res,next)=>{
  const emp=req.params.empId;
  const dept=req.params.deptId;
  const employe=await employee.findById(emp);
  const department=await Dept.findById(dept);
  if(!employe||!department){
    return new AppError("Employee or Department is not found",404)
  }
  employe.department=department.deptID;
  await employe.save();
  res.status(200).json({
    status:'Sucess',
    employe
  })
})
exports.viewAllEmployees = catchAsync(async (req, res, next) => {
  const employees = await employee.find();
  // if(!employees){
  //   return new AppError('No employee found',404)
  // }
  res.status(200).json({
    status: 'Success',
    data:{
      employees
    }
  });
});

exports.viewEmployeByDept = catchAsync(async (req, res, next) => {
  const employees = await employee.find({ department: req.params.id });
  res.status(200).json({
    status: 'Success',
    data: {
      employees: employees
    }
  });
});

exports.viewEmployee = catchAsync(async (req, res, next) => {
  const employeeId = req.params.id;
  const employe = await employee.findById(employeeId);
  if (!employe) {
    return next(new AppError('Employee not found', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      employee: employe
    }
  });
});

exports.updateEmployee = catchAsync(async (req, res, next) => {
  const employeeId = req.params.id;
  const updatedEmployee = await employee.findByIdAndUpdate(
    employeeId,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  if (!updatedEmployee) {
    return next(new AppError('Employee not found', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      employee: updatedEmployee
    }
  });
});

exports.deleteEmployee = catchAsync(async (req, res, next) => {
  const employeeId = req.params.id;
  const deletedEmployee = await employee.findByIdAndDelete(employeeId);
  if (!deletedEmployee) {
    return next(new AppError('Employee not found', 404));
  }
  res.status(204).json({
    status: 'Success',
    data: null
  });
});
