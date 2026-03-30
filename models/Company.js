import { Schema, model } from "mongoose";

const companySchema = new Schema(
  {
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    package: { type: String }, // optional salary/package info
    location: { type: String }, // optional
    eligibleDepartment: { type: String, required: true },
    minCGPA: { type: Number, default: 0 },
    selectedStudents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

export default model("Company", companySchema);