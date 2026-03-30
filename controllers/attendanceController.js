import Attendance from "../models/Attendance.js"
import Student from "../models/Student.js"
import mongoose from "mongoose"


/* ===========================
MARK ATTENDANCE (MANUAL)
=========================== */

export const markAttendance = async (req,res)=>{
try{

const {studentId,status} = req.body

// validation
if(!studentId || !["present","absent"].includes(status)){
return res.status(400).json({
message:"Invalid studentId or status"
})
}

if(!mongoose.Types.ObjectId.isValid(studentId)){
return res.status(400).json({
message:"Invalid studentId"
})
}

// check student exists
const student = await Student.findById(studentId)

if(!student){
return res.status(404).json({
message:"Student not found"
})
}

/* ✅ START & END OF TODAY */

const startOfDay = new Date()
startOfDay.setHours(0,0,0,0)

const endOfDay = new Date()
endOfDay.setHours(23,59,59,999)

/* ✅ CHECK DUPLICATE (SAME DAY ONLY) */

const existing = await Attendance.findOne({
student:studentId,
date:{
$gte:startOfDay,
$lte:endOfDay
}
})

if(existing){
return res.status(400).json({
message:"Attendance already marked today"
})
}

/* ✅ CREATE ATTENDANCE (IMPORTANT CHANGE) */

const attendance = await Attendance.create({
student: studentId,
status,
date: new Date()   // 🔥 MUST
})

res.status(201).json({
message:"Attendance marked successfully",
attendance
})

}catch(error){
console.log("ATTENDANCE ERROR:",error)
res.status(500).json({
message:error.message
})
}
}



/* ===========================
GET TODAY ATTENDANCE
=========================== */

export const getTodayAttendance = async (req,res)=>{
try{

const startOfDay = new Date()
startOfDay.setHours(0,0,0,0)

const endOfDay = new Date()
endOfDay.setHours(23,59,59,999)

const attendance = await Attendance.find({
date:{
$gte:startOfDay,
$lte:endOfDay
}
}).populate("student")

res.json(attendance)

}catch(error){
res.status(500).json({
message:error.message
})
}
}



/* ===========================
GET STUDENT ATTENDANCE
=========================== */

export const getStudentAttendance = async (req,res)=>{
try{

const {studentId} = req.params

if(!mongoose.Types.ObjectId.isValid(studentId)){
return res.status(400).json({
message:"Invalid studentId"
})
}

const attendance = await Attendance.find({
student:studentId
}).sort({date:-1})

res.json(attendance)

}catch(error){
res.status(500).json({
message:error.message
})
}
}