const mongoose = require('mongoose');
const validator=require('validator');


const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Department must a name.'],
        trim: true,
        minlength: [5, 'The name must be at least 5 characters long.'],
        maxlength: [50, 'The name cannot exceed 50 characters.']
    },
    deptID: {
        type: String,
        required: [true, 'A Department must have a ID.'],
        unique:[true,'Department ID cant be duplicated']
    },
    manager: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee' 
    },
    location:{
        type:String,
        required: true
    },
});

const department = mongoose.model('Department', departmentSchema);

module.exports = department;


