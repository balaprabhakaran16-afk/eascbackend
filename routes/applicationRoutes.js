import express from "express"
import Application from "../models/Application.js"

const router = express.Router()

// GET ALL APPLICATIONS
router.get("/all", async(req,res)=>{

const applications = await Application.find()
.populate("company")

res.json(applications)

})


// SELECT STUDENT
router.put("/select/:id", async(req,res)=>{

try{

const {role,package:pkg,interviewDate} = req.body

const application = await Application.findByIdAndUpdate(

req.params.id,

{
status:"selected",
role,
package:pkg,
interviewDate
},

{new:true}

)

res.json(application)

}catch(err){

res.status(500).json({message:"Selection Failed"})

}

})


// REJECT STUDENT
router.put("/reject/:id", async(req,res)=>{

const application = await Application.findByIdAndUpdate(

req.params.id,

{status:"rejected"},

{new:true}

)

res.json(application)

})


// STUDENT PLACEMENTS
router.get("/student/:studentId", async(req,res)=>{

const applications = await Application.find({

student:req.params.studentId

}).populate("company")

res.json(applications)

})

export default router