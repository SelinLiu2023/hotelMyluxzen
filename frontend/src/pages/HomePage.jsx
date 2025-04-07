import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Permet de lire les paramètres dans l’URL
import Hero from "../components/hero/Hero"; // Assure-toi du bon chemin du fichier Hero.jsx
import Navbar from "../components/navbar/Navbar";
//import NavbarMini from "../components/navbarMini/NavbarMini";
import Footer from "../components/footer/Footer";
import ContactFormModal from "../components/footer/ContactFormModal"; // Pour afficher le formulaire en modal
import "../styles/extra.css";

const HomePage = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false); // Contrôle d'affichage du formulaire
  const location = useLocation(); // Donne accès à l’URL actuelle

  useEffect(() => {
    // Récupère dynamiquement la hauteur de la navbar
    const navbar = document.querySelector("header");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }

    // Met à jour la hauteur si la fenêtre est redimensionnée
    const handleResize = () => {
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Si l’URL contient ?contact=open → on ouvre le formulaire automatiquement
    const params = new URLSearchParams(location.search);
    if (params.get("contact") === "open") {
      setShowContactModal(true);
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar fixée en haut */}
      <Navbar />
      {/*<NavbarMini /> */}

      {/* Section Hero avec un padding-top égal à la hauteur de la Navbar */}
      <main className="flex-grow" style={{ paddingTop: navbarHeight }}>
        <Hero />
      </main>

      {/* Footer toujours collé en bas */}
      <Footer />

      {/* Formulaire modal ouvert si ?contact=open */}
      {showContactModal && (
        <ContactFormModal onClose={() => setShowContactModal(false)} />
      )}
    </div>
  );
};

export default HomePage;
