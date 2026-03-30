import mongoose from "mongoose";

const classAllocationSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ClassAllocation", classAllocationSchema);