//zahra 
/*
import express from "express";
import Image from "../models/image.js";
import upload from "../middlewares/uploadMiddleware.js";
import fs from "fs";

const router = express.Router();

// 📌 Récupérer toutes les images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 📌 Upload d'une image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      url: `/uploads/${req.file.filename}`,
      description: req.body.description || "",
    });

    await newImage.save();
    res.json(newImage);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'upload" });
  }
});

// 📌 Suppression d'une image
router.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image non trouvée" });

    fs.unlinkSync(`.${image.url}`); // Supprime le fichier image
    await image.deleteOne();
    res.json({ message: "Image supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});

export default router;*/
// src/routes/imageRoutes.js
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import upload from "../middlewares/uploadMiddleware.js";
import Image from "../models/image.js";
import dotenv from "dotenv";

// Charger les variables d'environnement (.env)
dotenv.config();

// Configurer Cloudinary avec les variables d'environnement
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

// GET - Récupérer les images avec pagination
// GET - Récupérer les images avec pagination et URL optimisée Cloudinary
router.get("/", async (req, res) => {
  try {
    // 1. Lire les paramètres de pagination dans l'URL
    const page = parseInt(req.query.page) || 1;     // ex: /api/images?page=2
    const limit = parseInt(req.query.limit) || 12;  // ex: /api/images?limit=12
    const skip = (page - 1) * limit;                // combien d'éléments à sauter

    // 2. Récupérer les images depuis MongoDB, triées par date de création (plus récentes d’abord)
    const images = await Image.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // 3. Pour chaque image, on ajoute les paramètres f_auto,q_auto à l'URL Cloudinary
    const optimizedImages = images.map((img) => ({
      _id: img._id,
      url: img.url.replace("/upload/", "/upload/f_auto,q_auto/"), // optimisation
      description: img.description,
    }));

    // 4. Indique au frontend s’il reste des images à charger (pour scroll infini)
    const hasMore = images.length === limit;

    // 5. Réponse envoyée au frontend
    res.json({
      images: optimizedImages,  // tableau des images
      hasMore: hasMore,         // booléen pour continuer ou non
    });
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST - Upload image (directement sur Cloudinary)
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier fourni" });
    }

    // Vérifie la taille max (Cloudinary gratuit = 10 Mo)
    const maxSize = 10 * 1024 * 1024; // 10 Mo
    if (req.file.size > maxSize) {
      return res
        .status(400)
        .json({ message: "Image trop lourde (max 10 Mo autorisé)" });
    }

    const fileBuffer = req.file.buffer;

    // ⬆️ Stream du fichier mémoire vers Cloudinary avec resize automatique
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "my_project_assets",
            transformation: [{ width: 1500, height: 1500, crop: "limit" }], // ✅ Redimensionne pour rester léger
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(fileBuffer);

    // Enregistre l'image dans MongoDB
    const newImage = new Image({
      url: result.secure_url,
      description: description || "",
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error("Erreur Cloudinary:", error);
    res.status(500).json({ message: "Erreur lors de l'upload" });
  }
});

//  DELETE - Supprimer image (MongoDB + Cloudinary)
router.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image non trouvée" });
    }

    // Extraire le public_id de Cloudinary
    const parts = image.url.split("/");
    const filename = parts[parts.length - 1].split(".")[0];
    const publicId = `my_project_assets/${filename}`;

    // Supprimer de Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Supprimer de MongoDB
    await image.deleteOne();

    res.json({ message: "Image supprimée avec succès" });
  } catch (error) {
    console.error("Erreur suppression :", error);
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});

export default router;



