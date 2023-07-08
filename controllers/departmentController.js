const dept = require('../models/deptModel');
const employee = require('../models/empModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.AddDepartment = catchAsync(async (req, res, next) => {
  const newDept = await dept.create(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      department: newDept
    }
  });
});
exports.setManager=catchAsync(async(req,res,next)=>{
  const emp=req.params.EmpID;
  const Dept=req.params.DeptID;
  const employe=await employee.findById(emp);
  const department=await dept.findById(Dept);
  if(!employe||!department){
    return new AppError("Employee or Department is not found",404)
  }
  if(department.manager!='none'){
    const exmanger = await employee.find({ 'empID': department.manager });
    if (exmanger.length > 0) {
      exmanger[0].role = 'employee';
      await exmanger[0].save();
    }
  }
  if (employe.yearsOfExperience<5){
    return new AppError('Employee is Not Eligible for promotion',401)
  }
  department.manager=employe.empID;
  employe.role='Manager';
  await employe.save();
  await department.save();
  res.status(200).json({
    status:'sucess',
    department
  })

})
exports.viewAllDepts = catchAsync(async (req, res, next) => {
  const departments = await dept.find();
  if(!departments){
    return new AppError('No department found',404)
  }
  res.status(200).json({
    status: 'Success',
    data:{
      departments
    }
  });
});
exports.viewDeptInfo = catchAsync(async (req, res, next) => {
  const DeptID = req.params.id;
  const department = await employee.findById(DeptID);
  if (!department) {
    return next(new AppError('Dept not found', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      department
    }
  });
});

exports.updateDept = catchAsync(async (req, res, next) => {
  const DeptID = req.params.id;
  const updateDept = await dept.findByIdAndUpdate(
    DeptID,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  if (!updateDept) {
    return next(new AppError('Department not found', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: {
      updateDept
    }
  });
});

exports.deleteDept = catchAsync(async (req, res, next) => {
  const DeptID = req.params.id;
  const deleteDept = await dept.findByIdAndDelete(DeptID);
  if (!deleteDept) {
    return next(new AppError('department not found', 404));
  }
  res.status(204).json({
    status: 'Success',
    data: null
  });
});