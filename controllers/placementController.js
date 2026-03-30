import Placement from "../models/Placement.js"


// ADD RESULT
export const addPlacement = async(req,res)=>{

try{

const placement = await Placement.create(req.body)

res.json(placement)

}catch(err){

res.status(500).json({message:err.message})

}

}


// GET ALL RESULTS (ADMIN)

export const getPlacements = async(req,res)=>{

try{

const placements = await Placement.find()
.populate("student","name email")
.populate("company","name")

res.json(placements)

}catch(err){

res.status(500).json({message:err.message})

}

}


// GET STUDENT RESULT

export const getStudentPlacement = async(req,res)=>{

try{

const placement = await Placement.find({
student:req.params.id
}).populate("company","name")

res.json(placement)

}catch(err){

res.status(500).json({message:err.message})

}

}