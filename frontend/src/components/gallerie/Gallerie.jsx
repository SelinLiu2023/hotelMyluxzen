import React, { useState, useEffect } from "react";
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  Captions,
  Download,
  Fullscreen,
  Thumbnails,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "../../styles/extra.css";

const Gallerie = () => {
  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showCaption, setShowCaption] = useState(false); // toggle pour petit écran

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_SERVER_URL}/api/images`)
  
      .then((response) => {
        console.log("URL utilisée :", `${import.meta.env.VITE_SERVER_URL}/api/images`);
        console.log("Images reçues de l'API :", response.data);
        console.log("image 1:", response.data.images?.[0]); //

        
        setImages(Array.isArray(response.data) ? response.data : []);


      })
      .catch((error) => {
        console.error("Erreur lors du chargement des images :", error);
      });
  }, []);

  return (
    <>
      <div className="pt-20 max-w-[1200px] mx-auto px-4">
        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-4">
          {images.map((image, idx) => (
            <div
              key={image._id}
              className="relative mb-4 break-inside-avoid overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer group"
              onClick={() => setIndex(idx)}
            >
              <img
                src={image.url}
                alt={image.description}
                className="w-full h-auto object-cover rounded-none"
              />
              <div className="absolute inset-0 bg-ivory-75 bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold px-4 text-center">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
        index={index}
        open={index >= 0}
        close={() => {
          setIndex(-1);
          setShowCaption(false);
        }}
        slides={images.map((image) => ({
          src: image.url,
          width: 1200,
          height: 800,
          title: image.description,
        }))}
        thumbnails={{
          position: "bottom",
          width: 100,
          height: 70,
          border: 2,
          borderRadius: 0,
          gap: 5,
        }}
        styles={{
          container: { backgroundColor: "rgba(222, 222, 222, 1)" },
          slide: {
            paddingTop: isSmallScreen ? "0px" : "70px",
          },
          image: {
            objectFit: "contain",
            maxHeight: "90vh",
          },
          icon: {
            color: "white",
            transition: "transform 0.2s ease, filter 0.2s ease",
          },
          iconButton: {
            className: "lightbox-icon-button",
          },
        }}
        render={{
          caption: ({ slide }) =>
            isSmallScreen ? (
              <div className="absolute inset-0 z-50">
                {/* BOUTON INFO */}
                <button
                  onClick={() => setShowCaption((prev) => !prev)}
                  className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-2 py-1 rounded-full"
                >
                  ℹ️
                </button>

                {/* OVERLAY DESCRIPTION */}
                <div
                  className={`w-full h-full flex items-center justify-center transition-opacity duration-300 ${
                    showCaption ? "opacity-100" : "opacity-0"
                  } bg-ivory-75 bg-opacity-60`}
                >
                  <p className="text-white text-lg font-semibold px-4 text-center">
                    {slide.title}
                  </p>
                </div>
              </div>
            ) : (
              // Caption en haut sur grand écran
              <div className="absolute top-0 left-0 w-full text-center text-black text-xl font-semibold bg-white/80 py-3 z-50">
                {slide.title}
              </div>
            ),
        }}
      />
    </>
  );
};

export default Gallerie;
