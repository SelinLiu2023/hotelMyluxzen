//zaha-booking-daschbord-router
import express from "express";
import { Booking } from "../models/bookingSchema.js";

const router = express.Router();

// ➕ Route pour toutes les réservations
router.get("/bookings/all", async (req, res) => {
  try {
    const allBookings = await Booking.find();
    res.status(200).json(allBookings);
  } catch (err) {
    console.error("❌ Fehler beim Laden der Buchungen:", err);
    res.status(500).json({ message: "Serverfehler" });
  }
});

export { router as dashboardRouter };
