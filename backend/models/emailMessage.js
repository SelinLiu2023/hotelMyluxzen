//Zahra models/EmailMessage.js
import mongoose from "mongoose";

const emailMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  reply: { type: String, default: null }
});

export default mongoose.model("EmailMessage", emailMessageSchema);
