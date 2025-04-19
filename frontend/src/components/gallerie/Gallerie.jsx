//zahra
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
  const [showCaption, setShowCaption] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Écoute taille écran
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Chargement des images (pagination)
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/images?page=${page}&limit=12`
        );

        const newImages = Array.isArray(response.data.images)
          ? response.data.images
          : [];

          console.log(`Page ${page} - Images reçues :`, newImages);
        // Évite les doublons (_id déjà présents)
        setImages((prev) => {
          const existingIds = new Set(prev.map((img) => img._id));
          const filtered = newImages.filter((img) => !existingIds.has(img._id));

          // Si aucune nouvelle image → on arrête
          if (filtered.length === 0) setHasMore(false);

          return [...prev, ...filtered];
        });
      } catch (error) {
        console.error("Erreur lors du chargement des images :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [page]);

  // Scroll infini
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 100 &&
        hasMore &&
        !isLoading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

  return (
    <>
      <div className="pt-20 max-w-[1200px] mx-auto px-4">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-4">
          {images.map((image, idx) => (
            <div
              key={image._id || idx}
              className="relative mb-4 break-inside-avoid overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer group"
              onClick={() => setIndex(idx)}
            >
            <img
  src={image.url}
  alt={image.description}
  loading="lazy"
  className="w-full h-auto max-h-[500px] object-cover rounded-none"
/>

              <div className="absolute inset-0 bg-ivory-75 bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold px-4 text-center">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {isLoading && (
  <div className="flex justify-center py-8">
    <div className="w-10 h-10 border-4 border-peach border-t-transparent rounded-full animate-spin"></div>
  </div>
)}

        {!hasMore && (
          <div className="text-center py-8 text-gray-400 text-sm">
            
          </div>
        )}
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
                <button
                  onClick={() => setShowCaption((prev) => !prev)}
                  className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-2 py-1 rounded-full"
                >
                  ℹ️
                </button>
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
