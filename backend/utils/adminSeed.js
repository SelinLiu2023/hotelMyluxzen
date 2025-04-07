import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "../models/userSchema.js";
import { connect } from "./connect.js"; // Nutzt deine bestehende Verbindung

dotenv.config(); // Nutzt .env für die DB-Verbindung

const seedAdmin = async () => {
    try {
        // Vermeidet doppelte Verbindungen zu MongoDB
        await connect();

        //  Admin-Daten 
        const adminEmail = "tom.schneider@gmail.com";
        const adminPassword = "Tom2024!"; 

        // 🔎 Prüfen, ob der Admin bereits existiert
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("⚠️ Admin-Benutzer existiert bereits.");
        } else {
            //  Admin-User erstellen
            const adminUser = new User({
                vorname: "Tom",
                nachname: "Schneider",
                email: adminEmail,
                password:  adminPassword,   
                isAdmin: true, // ✅ Setzt den Benutzer als Admin
            });

            await adminUser.save();
            console.log("✅ Admin-Benutzer erfolgreich erstellt!");
        }
    } catch (error) {
        console.error(" Fehler beim Seeding des Admins:", error);
    } finally {
        //  Verbindung sicher schließen
        mongoose.connection.close();
    }
};

// Seed-Funktion aufrufen
seedAdmin();
