import { Schema, model } from "mongoose";

const complaintSchema = new Schema({

student:{
type:Schema.Types.ObjectId,
ref:"Student",
required:true
},

title:{
type:String,
required:true
},

message:{
type:String,
required:true
},

reply:{
type:String,
default:""
},

status:{
type:String,
enum:["pending","resolved"],
default:"pending"
}

},{timestamps:true})

export default model("Complaint", complaintSchema)