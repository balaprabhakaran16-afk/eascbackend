import express from "express"
import User from "../models/User.js"

const router = express.Router()

// Get all students
router.get("/students", async (req,res)=>{
try{

const students = await User.find({role:"student"})
res.json(students)

}catch(err){
res.status(500).json({message:err.message})
}
})


// Get all staff
router.get("/staff", async (req,res)=>{
try{

const staff = await User.find({role:"staff"})
res.json(staff)

}catch(err){
res.status(500).json({message:err.message})
}
})

export default router