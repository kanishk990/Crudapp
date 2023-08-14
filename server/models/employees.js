const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }, 
    email : {
        type : String,
        required : true
    },
    empid : {
        type : Number,
        required : true
    },
    dob : {
        type : Date,
        required : true
    },
    designation : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Employee', employeeSchema)