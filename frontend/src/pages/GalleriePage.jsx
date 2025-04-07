import React from "react";
import Gallerie from "../components/gallerie/Gallerie"; // 🔥 Assure-toi du bon chemin du fichier Hero.jsx
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "../styles/extra.css";

const GalleriePage = () => {
  return (
    
    <div className="flex flex-col min-h-screen">
      {/* Navbar toujours en haut */}
      <Navbar />

      {/* Main avec un padding-top équivalent à la hauteur de la Navbar */}
      <main className="flex-1 pt-[150px] md:pt-[200px] lg:pt-[200px] mb-10">

      <Gallerie />  {/* ✅ Affiche la section Hero */}
      </main>

      {/* Footer avec un espace au-dessus */}
      <Footer className="mt-100" />
    </div>

  );
};

export default GalleriePage;