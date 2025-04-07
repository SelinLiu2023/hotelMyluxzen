// Zahra - routes/contact.routes.js
import express from "express";
import EmailMessage from "../models/emailMessage.js";
import { sendEmailToClient } from "../utils/emailService.js";
import { User } from "../models/userSchema.js";
import { Booking } from "../models/bookingSchema.js";

const router = express.Router();

// 1. POST-Route: Kunde sendet eine Nachricht
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const neueNachricht = new EmailMessage({ name, email, message });
    await neueNachricht.save();

    res.status(201).json({ message: "Nachricht erfolgreich gespeichert." });
  } catch (error) {
    console.error("Fehler bei POST /api/contact:", error);
    res.status(500).json({ error: "Serverfehler beim Speichern der Nachricht." });
  }
});

// 2. GET-Route: Admin ruft alle Nachrichten ab
router.get("/all", async (req, res) => {
  try {
    const nachrichten = await EmailMessage.find().sort({ createdAt: -1 });
    res.status(200).json(nachrichten);
  } catch (error) {
    console.error("Fehler bei GET /api/contact/all:", error);
    res.status(500).json({ error: "Serverfehler beim Abrufen der Nachrichten." });
  }
});
// 4. DELETE-Route: Nachricht löschen
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await EmailMessage.findByIdAndDelete(id);
    res.status(200).json({ message: "Nachricht erfolgreich gelöscht." });
  } catch (error) {
    console.error("Fehler beim Löschen:", error);
    res.status(500).json({ error: "Serverfehler beim Löschen der Nachricht." });
  }
});
// 3. POST-Route: Admin antwortet auf eine Nachricht
router.post("/reply", async (req, res) => {
  const { id, email, responseText } = req.body;

  try {
    // Prüfen, ob Benutzer ein registriertes Konto hat
    const userExists = await User.findOne({ email });
    const hasAccount = !!userExists;

    // Prüfen, ob eine Buchung existiert
    const booking = await Booking.findOne({ email });
    const bookingLink = booking
      ? `http://localhost:5173/booking/${booking.bookingNumber}`
      : null;

    // E-Mail senden mit Konto- und Buchungslink (falls vorhanden)
    await sendEmailToClient({
      to: email,
      subject: "Antwort von MyLuxZen",
      text: responseText,
      hasAccount,
      bookingLink,
    });

    // Nachricht als beantwortet markieren
    await EmailMessage.findByIdAndUpdate(id, {
      status: "replied",
      reply: responseText,
      repliedAt: new Date(),
    });

    res.status(200).json({ message: "Antwort erfolgreich gesendet und Nachricht aktualisiert." });
  } catch (error) {
    console.error("Fehler bei POST /api/contact/reply:", error);
    res.status(500).json({ error: "Fehler beim Senden der Antwort." });
  }
});

export default router;

