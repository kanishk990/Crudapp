const express = require('express')
const router = express.Router()
const validationSchema = require("../validation")
const Employee = require("../models/employees")

router.get("/create", (req,res)=> {
    console.log("recievied request")
    res.send("hello from server")
})

router.post("/create", async (req,res) => {
    const {error, value} = validationSchema.validate(req.body);
    console.log(req.body)
    if(error)
    {
        console.log(error)
        return res.render("/employee/create")
    }
    const emp = new Employee(req.body)
    await emp.save()
    req.flash('success', 'Employee created Successfully');
    res.redirect("/employee/list");
})

router.get("/list", async (req,res)=> {
    
    const list = await Employee.find()
    res.render('list' , {list})
})
router.get("/delete", (req,res) => {
    res.render('delete')
})

router.delete("/delete/:id", async (req,res)=> {
    const {id} = req.params
    const delresult = await Employee.findByIdAndDelete(id)
    res.redirect("/employee/list")
})
router.get("/edit/:id", async (req,res) => {
    const {id} = req.params
    const employee = await Employee.findById(id)
    res.render('edit', {employee})
})
router.put("/edit/:id", async (req,res) => {
    const {id} = req.params 
    const {name, email,empid,dob,designation} = req.body
    const updatedEmployee = {
        name : name,
        email : email,
        empid : empid,
        dob : dob,
        designation : designation
    }
    const result = await Employee.findByIdAndUpdate(id, { $set : updatedEmployee}, {new : true})
    res.redirect("/employee/list")
})
module.exports = router