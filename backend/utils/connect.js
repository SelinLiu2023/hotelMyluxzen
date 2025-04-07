import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connect() {
  const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017"; 
  const DB_NAME = process.env.DB_NAME || "myluxzen"; 
  if (MONGODB_URL) {
    await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`);
    console.log(`✅ Connected to MongoDB: ${MONGODB_URL}/${DB_NAME}`);
  } else {
    throw new Error("Error: MONGODB_URL not found");
  }
}
