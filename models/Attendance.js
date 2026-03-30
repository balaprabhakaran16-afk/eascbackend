import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({

student:{
type:mongoose.Schema.Types.ObjectId,
ref:"Student",
required:true
},

status:{
type:String,
enum:["present","absent"],
required:true
},

date:{
type:Date,
required:true,
default:Date.now // ✅ important
}

},{timestamps:true})

/* ✅ UNIQUE INDEX (WORKS NOW) */
attendanceSchema.index({student:1,date:1},{unique:true})

const Attendance = mongoose.model("Attendance",attendanceSchema)

export default Attendance