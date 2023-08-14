const joi = require('joi')

const Schema = joi.object({
    name : joi.string().min(3).max(30).required(),
    email : joi.string().email().required(),
    empid : joi.number().min(2).required(),
    dob : joi.date().required(),
    designation : joi.string().min(1).max(20)
})

module.exports = Schema