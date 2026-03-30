import Complaint from "../models/Complaint.js";


// SUBMIT COMPLAINT
export const submitComplaint = async(req,res)=>{

try{

const complaint = await Complaint.create(req.body)

res.status(201).json(complaint)

}catch(err){

res.status(500).json({
message:err.message
})

}

}


// GET ALL COMPLAINTS (ADMIN)
export const getAllComplaints = async(req,res)=>{

try{

const complaints = await Complaint
.find()
.populate("student","name email department")

.sort({createdAt:-1})

res.json(complaints)

}catch(err){

res.status(500).json({
message:err.message
})

}

}


// ADMIN REPLY
export const replyComplaint = async(req,res)=>{

try{

const complaint = await Complaint.findByIdAndUpdate(

req.params.id,

{ reply:req.body.reply },

{ new:true }

)

res.json(complaint)

}catch(err){

res.status(500).json({
message:err.message
})

}

}


// UPDATE STATUS
export const updateStatus = async(req,res)=>{

try{

const complaint = await Complaint.findByIdAndUpdate(

req.params.id,

{ status:req.body.status },

{ new:true }

)

res.json(complaint)

}catch(err){

res.status(500).json({
message:err.message
})

}

}