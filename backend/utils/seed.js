//Zahra, seed.js
/*import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { connect } from "./connect.js";  // Remonter dans backend
import Image from "../models/image.js";  // Vérifier si models est bien dans backend
import { fileURLToPath } from "url";
import assets from "../assets/images/asset.js";  // Vérifier si le chemin est correct

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📌 Correction : Aller chercher "uploads/" dans backend/
const uploadsDir = path.join(__dirname, "../uploads");  
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const imagesList = Object.values(assets).flat().map((img) => {
  const imageName = `${Date.now()}-${img.file}`;
  const sourcePath = path.join(__dirname, "../assets/images", img.file);  // Correction ici
  const destinationPath = path.join(uploadsDir, imageName);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destinationPath);
  } else {
    console.warn(`❌ Image non trouvée: ${sourcePath}`);
  }

  return {
    url: `/uploads/${imageName}`,
    description: img.description,
  };
});

const seedDatabase = async () => {
  try {
    await connect();
    await Image.deleteMany({});
    console.log("✅ Collection Images vidée");

    await Image.insertMany(imagesList);
    console.log("✅ Images insérées avec succès");
  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connexion MongoDB fermée");
  }
};

seedDatabase();*/
/*import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary"; // ✅ Importer Cloudinary
import { connect } from "./connect.js";
import Image from "../models/image.js"; 
import { fileURLToPath } from "url";
import assets from "../assets/images/asset.js"; 

dotenv.config();

console.log("✅ Variables d'environnement chargées ?", process.env.CLOUDINARY_CLOUD_NAME);

console.log("🔹 Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("🔹 API Key:", process.env.CLOUDINARY_API_KEY ? "✅ Chargée" : "❌ Non chargée");
console.log("🔹 API Secret:", process.env.CLOUDINARY_API_SECRET ? "✅ Chargée" : "❌ Non chargée");


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Charger les variables d'environnement depuis le bon chemin
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("✅ Variables d'environnement chargées ?", process.env.CLOUDINARY_CLOUD_NAME);
console.log("🔹 Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("🔹 API Key:", process.env.CLOUDINARY_API_KEY ? "✅ Chargée" : "❌ Non chargée");
console.log("🔹 API Secret:", process.env.CLOUDINARY_API_SECRET ? "✅ Chargée" : "❌ Non chargée");

// 📌 Configurer Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📌 Fonction pour uploader une image sur Cloudinary
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "my_project_assets", // 📌 Dossier Cloudinary (modifiable)
    });
    return result.secure_url; // ✅ URL sécurisée de l'image
  } catch (error) {
    console.error("❌ Erreur d'upload Cloudinary:", error);
    return null;
  }
};

const seedDatabase = async () => {
  try {
    await connect();
    await Image.deleteMany({});
    console.log("✅ Collection Images vidée");

    const imagesList = [];
    
    for (const img of Object.values(assets).flat()) {
      const sourcePath = path.join(__dirname, "../assets/images", img.file);

      if (fs.existsSync(sourcePath)) {
        const imageUrl = await uploadToCloudinary(sourcePath);
        if (imageUrl) {
          imagesList.push({
            url: imageUrl,
            description: img.description,
          });
        }
      } else {
        console.warn(`❌ Image non trouvée: ${sourcePath}`);
      }
    }

    await Image.insertMany(imagesList);
    console.log("✅ Images insérées avec succès");

  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connexion MongoDB fermée");
  }
};

seedDatabase();*/

import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary"; 
import { connect } from "./connect.js";
import Image from "../models/image.js"; 
import { fileURLToPath } from "url";
import assets from "../assets/images/asset.js"; 

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("✅ Variables d'environnement chargées ?", process.env.CLOUDINARY_CLOUD_NAME);

// Configurer Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Vérifier si une image existe déjà sur Cloudinary
const checkCloudinaryImage = async (fileName) => {
  try {
    const result = await cloudinary.search
      .expression(`folder:my_project_assets AND filename:${fileName}`)
      .execute();

    if (result.resources.length > 0) {
      return result.resources[0].secure_url; // ✅ Retourne l'URL si l'image existe déjà
    }
    return null; // ❌ L'image n'existe pas
  } catch (error) {
    console.error("❌ Erreur de recherche Cloudinary:", error);
    return null;
  }
};

// 📌 Fonction pour uploader une image sur Cloudinary (uniquement si elle n'existe pas)
const uploadToCloudinary = async (filePath, fileName) => {
  try {
    // Vérifier si l'image existe déjà
    const existingImageUrl = await checkCloudinaryImage(fileName);

    if (existingImageUrl) {
      console.log(`✅ Image déjà existante : ${fileName}`);
      return existingImageUrl; // Retourne l'URL existante
    }

    // Si l'image n'existe pas, l'uploader
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "my_project_assets",
      public_id: fileName, // 📌 Définir un ID unique basé sur le nom du fichier
    });

    return result.secure_url; // ✅ Retourner l'URL de l'image
  } catch (error) {
    console.error("❌ Erreur d'upload Cloudinary:", error);
    return null;
  }
};

// 📌 Seed la base de données
const seedDatabase = async () => {
  try {
    await connect();
    await Image.deleteMany({});
    console.log("✅ Collection Images vidée");

    const imagesList = [];
    
    for (const img of Object.values(assets).flat()) {
      const sourcePath = path.join(__dirname, "../assets/images", img.file);

      if (fs.existsSync(sourcePath)) {
        // Utiliser le nom de fichier pour éviter les doublons
        const imageUrl = await uploadToCloudinary(sourcePath, img.file);

        if (imageUrl) {
          imagesList.push({
            url: imageUrl,
            description: img.description,
          });
        }
      } else {
        console.warn(`❌ Image non trouvée: ${sourcePath}`);
      }
    }

    await Image.insertMany(imagesList);
    console.log("✅ Images insérées avec succès");

  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connexion MongoDB fermée");
  }
};

seedDatabase();
