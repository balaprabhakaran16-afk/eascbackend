import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({

student:{
type:mongoose.Schema.Types.ObjectId,
ref:"Student",
required:true
},

company:{
type:mongoose.Schema.Types.ObjectId,
ref:"Company",
required:true
},

fullName:String,
email:String,
phone:String,
department:String,
cgpa:String,
skills:String,
resume:String,

role:String,
package:String,
interviewDate:String,

status:{
type:String,
enum:["applied","selected","rejected"],
default:"applied"
}

},{timestamps:true})

const Application = mongoose.model("Application",applicationSchema)

export default Application