import express from "express";
import { HausBeschreibung } from "../models/HausBeschreibung.js";

const router = express.Router();

//  Alle Häuser abrufen
router.get("/", async (req, res) => {
  try {
    const haeuser = await HausBeschreibung.find();
    res.json(haeuser);
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
    res.status(500).json({ message: "Server-Fehler" });
  }
});

//  Einzelnes Haus per ID abrufen
router.get("/:id", async (req, res) => {
  try {
    const haus = await HausBeschreibung.findById(req.params.id);
    if (!haus) {
      return res.status(404).json({ message: "Haus nicht gefunden" });
    }
    res.json(haus);
  } catch (error) {
    console.error("Fehler beim Abrufen des Hauses:", error);
    res.status(500).json({ message: "Server-Fehler" });
  }
});

//  Neues Haus hinzufügen
router.post("/", async (req, res) => {
  try {
    const neuesHaus = new HausBeschreibung(req.body);
    await neuesHaus.save();
    res.status(201).json(neuesHaus);
  } catch (error) {
    console.error("Fehler beim Erstellen eines Hauses:", error);
    res.status(500).json({ message: "Server-Fehler" });
  }
});

//  Haus aktualisieren
router.put("/:id", async (req, res) => {
  try {
    const aktualisiertesHaus = await HausBeschreibung.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!aktualisiertesHaus) {
      return res.status(404).json({ message: "Haus nicht gefunden" });
    }
    res.json(aktualisiertesHaus);
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Hauses:", error);
    res.status(500).json({ message: "Server-Fehler" });
  }
});

//  Haus löschen
router.delete("/:id", async (req, res) => {
  try {
    const geloeschtesHaus = await HausBeschreibung.findByIdAndDelete(
      req.params.id
    );
    if (!geloeschtesHaus) {
      return res.status(404).json({ message: "Haus nicht gefunden" });
    }
    res.json({ message: "Haus erfolgreich gelöscht" });
  } catch (error) {
    console.error("Fehler beim Löschen des Hauses:", error);
    res.status(500).json({ message: "Server-Fehler" });
  }
});

export default router;
