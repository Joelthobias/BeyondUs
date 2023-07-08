const mongoose = require('mongoose');
const validator=require('validator');


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
    required: [true, 'Please Provide a Email'],
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
  }
});

employeeSchema.post(['find', 'findOne', 'findById'], function (result, next) {
  if (Array.isArray(result)) {
    result.forEach((employee) => {
      const currentYear = new Date().getFullYear();
      const joinYear = employee.dateOfJoining.getFullYear();
      employee.yearsOfExperience = currentYear - joinYear;
    });
  } else {
    const currentYear = new Date().getFullYear();
    const joinYear = result.dateOfJoining.getFullYear();
    result.yearsOfExperience = currentYear - joinYear;
  }
  next();
});

const employee = mongoose.model('Employee', employeeSchema);

module.exports = employee;

