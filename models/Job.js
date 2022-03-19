import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please Provide Company name"],
      maxlength: 50,
    },

    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "decline"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
); 

export default mongoose.model("Job", jobSchema);
