import express from "express";
import { Review } from "../models/review.js";

const router = express.Router();

// ✅ Review hinzufügen (wird erst von Admin geprüft)
router.post("/add", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ message: "Review wurde zur Prüfung gesendet!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Akzeptierte Reviews abrufen
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Admin: Alle Reviews abrufen
router.get("/admin", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Admin: Review akzeptieren/ablehnen
router.put("/admin/update/:id", async (req, res) => {
  try {
    const { isApproved } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    );
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Review ablehnen (löschen)
router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review wurde gelöscht!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
