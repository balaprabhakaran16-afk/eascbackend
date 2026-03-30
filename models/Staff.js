import { Schema, model } from "mongoose";

const staffSchema = new Schema({
  name: String,
  email: String,
  department: String,
  assignedClass: String
});

export default model("Staff", staffSchema);