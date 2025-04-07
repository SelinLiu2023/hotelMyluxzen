import { ObjectId } from "mongodb";
import mongoose from "mongoose";
// import { connect } from "./connect.js";
import { SingleHouse } from "../models/SingleHouseSchema.js";
import dotenv from "dotenv";
// dotenv.config();
dotenv.config();

export async function connect() {
  const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://zahra:myluxzen2025@myluxzen.t3kl8.mongodb.net/myluxzen?retryWrites=true&w=majority&appName=MyLuXZeN"; 
  console.log(" connect  MONGODB_URL", MONGODB_URL)
  const DB_NAME = process.env.DB_NAME || "myluxzen"; 
  if (MONGODB_URL) {
    await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`);
    console.log(`✅ Connected to MongoDB: ${MONGODB_URL}/${DB_NAME}`);
  } else {
    throw new Error("Error: MONGODB_URL not found");
  }
}
connect();
async function seedDatabase() {
    try {

        await SingleHouse.deleteMany({});

        const hausBeschreibungIds = {
            "HouseType1": "67d926131c85579c922f5b6b",
            "HouseType2": "67c6b643d89f6f26b2a91b95",
            "HouseType3": "67c6b643d89f6f26b2a91b97",
            "HouseType4": "67c6b643d89f6f26b2a91b99",
            "HouseType5": "67c6b643d89f6f26b2a91b9b"
        };

        const houseTypeCountArr = {
            "HouseType1": 2, 
            "HouseType2": 5, 
            "HouseType3": 5, 
            "HouseType4": 5, 
            "HouseType5": 10
        };

        const housesToInsert = [];
        Object.entries(houseTypeCountArr).forEach(([houseType, count]) => {
            for (let i = 1; i <= count; i++) {
                const typeNumber = parseInt(houseType.replace(/\D/g, ""), 10);
                const houseNum = `${typeNumber * 1000 + i}`; // Generates 1010, 1020 for HouseType1, etc.
                housesToInsert.push({
                    houseNum,
                    houseType,
                    hausBeschreibung: new ObjectId(hausBeschreibungIds[houseType]),
                    status: "Available",
                    booking:[],
                    inUsePeriods:[],
                    bookingNum: ""
                });
            }
        });

        await SingleHouse.insertMany(housesToInsert);
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Failed to seed database:", error);
    } finally {
        mongoose.disconnect();
    }
}
seedDatabase();
