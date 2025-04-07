import fs from "fs";
import { ObjectId } from "mongodb";
import { connect } from "../utils/connect.js";
import { Booking } from "../models/bookingSchema.js";
import mongoose from "mongoose";
connect();

const deleteBooking = async () => {
    try {
      await Booking.deleteMany();
      console.log("✅ Bookings löschen erfolgreich !");
    } catch (error) {
      console.error("❌ Fehler beim löschen Bookings:", error);

    }finally {
            mongoose.disconnect();
    }
  };
  
  deleteBooking();
