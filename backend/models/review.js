import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    guestType: { type: String, required: true },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: false }, // Admin muss akzeptieren
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
