const dept = require('../models/deptModel');
const employee = require('../models/empModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.home=catchAsync(async(req,res,next)=>{
    const empCount=await employee.countDocuments();
    const deptCount=await dept.countDocuments();
    res.set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    ).render('index',{title:'Home',empCount,deptCount})
})
exports.viewEmployees=catchAsync(async(req,res,next)=>{
    const employees = await employee.find();
    
    res.set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    ).render('emp/employees',{title:'All Employees',employees})
})
exports.viewEmployee=catchAsync(async(req,res,next)=>{
    const employeeId = req.params.id;
    const employe = await employee.findById(employeeId);
    if (!employe) {
        return next(new AppError('Employee not found', 404));
    }
    let title={
        title:employe.name
    }
    res.set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    ).render('emp/viewEmployee',{title,employe})
})