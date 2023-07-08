const mongoose = require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const crypto=require('crypto')


const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Employee must a name.'],
    trim: true,
    minlength: [5, 'The name must be at least 5 characters long.'],
    maxlength: [50, 'The name cannot exceed 50 characters.']
  },
  empID: {
    type: String,
    required: [true, 'A Employee must have a ID.'],
    unique:[true,'Employee ID cant be duplicated']
  },
  mobile: {
    type: Number,
    required: [true, 'A Employee must provide thoer mobile number.'],
  },
  dateOfJoining:{
    type:Date,
    required: true
  },
  email: {
    type: String,
    required: [validator.isEmail, 'Please Provide a Email'],
    unique: [true, 'Email alerdy registerd'],
    trim: true,
    lowercase: true,
    validate:[validator.isEmail,'Provide A Valid Email']
  },
  yearsOfExperience:{
    type:Number,
  },
  role: {
    type: String, 
    default: 'employee'
  },
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department' 
  },
  passwordResetExpires:Date,
});

employeeSchema.pre(/^find/, function(next) {
  const currentYear = new Date().getFullYear();
  this.forEach(employee => {
    const joinYear = employee.dateOfJoining.getFullYear();
    employee.yearsOfExperience = currentYear - joinYear;
  });
  next();
});


const employee = mongoose.model('Employee', employeeSchema);

module.exports = employee;

