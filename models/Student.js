// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   rollNo: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   department: { type: String, required: true },
//   attendance: {
//     totalClasses: { type: Number, default: 0 },
//     attendedClasses: { type: Number, default: 0 },
//   },
// });

// export default mongoose.model("Student", studentSchema);


// ------------------------------------------------------------------------------------------

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  email:{
    type:String,
    required:true,
    unique:true
  },

  rollNo:{
    type:String,
    required:true,
    unique:true
  },

  department:{
    type:String
  }

},{timestamps:true})

export default mongoose.model("Student",studentSchema)