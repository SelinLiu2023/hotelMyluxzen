import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String, default: "" },
}, {
  timestamps: true // Ça ajoute createdAt et updatedAt
});

const Image = mongoose.model("Image", imageSchema);
export default Image;
