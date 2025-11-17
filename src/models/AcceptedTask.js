import { Schema, model } from "mongoose";

const acceptedTaskSchema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobCategory: {
      type: String,
      required: true,
    },
    jobCoverImage: {
      type: String,
      required: true,
    },
    jobPostedBy: {
      type: String,
      required: true,
    },
    acceptedBy: {
      type: String,
      required: [true, "Accepted by email is required"],
      trim: true,
      lowercase: true,
    },
    acceptedByName: {
      type: String,
      required: [true, "Accepted by name is required"],
    },
    acceptedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
acceptedTaskSchema.index({ acceptedBy: 1 });
acceptedTaskSchema.index({ jobId: 1 });

export default model("AcceptedTask", acceptedTaskSchema);
