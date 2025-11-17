import { Schema, model } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    postedBy: {
      type: String,
      required: [true, "Posted by name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["Web Development", "Digital Marketing", "Graphics Designing"],
        message: "{VALUE} is not a valid category",
      },
    },
    summary: {
      type: String,
      required: [true, "Job summary is required"],
      trim: true,
    },
    coverImage: {
      type: String,
      required: [true, "Cover image URL is required"],
    },
    userEmail: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      lowercase: true,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
jobSchema.index({ userEmail: 1 });
jobSchema.index({ postedDate: -1 });

export default model("Job", jobSchema);
