import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MiniNavbar from "../components/navbarMini/NavbarMini";
import Footer from "../components/footer/Footer";
const ApartmentCard = ({ apartment, onClick }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer mb-6 flex items-center w-full max-w-6xl mx-auto p-4 sm:flex-col md:flex-row"
      onClick={() => onClick(apartment)}
    >
      <img
        src={apartment.images[0]}
        alt={apartment.title}
        className="w-32 h-32 sm:w-48 sm:h-48 md:w-65 md:h-65 object-cover rounded-lg mr-4 mb-4 md:mb-0"
      />
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-gray-600">
          {apartment.title}
        </h2>

        {/* Beschreibung nur auf größeren Geräten anzeigen */}
        <p className="text-gray-600 mt-2 hidden sm:block">
          {apartment.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600 text-sm sm:text-base flex-1">
            <span className="font-semibold">{apartment.guests}</span> Gäste{" "}
            <span className="font-semibold">{apartment.bedrooms}</span>{" "}
            Schlafzimmer{" "}
            <span className="font-semibold">{apartment.bathroom}</span> Bäder
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#116769]">
            €{apartment.pricePerNight}/Nacht
          </p>
        </div>
      </div>
    </div>
  );
};

const ApartmentModal = ({ apartment, onClose }) => {
  if (!apartment) return null;
  const roomAmenities = apartment.roomAmenities
    ? Object.values(apartment.roomAmenities)
    : [];

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleCloseOnBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center p-4 z-50 "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={handleCloseOnBackgroundClick}
    >
      <div
        className="bg-white bg-opacity-90 rounded-xl shadow-2xl w-220 h-200 relative p-6 z-50"
        onClick={handleModalClick}
      >
        <div className="bg-gray-100 p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold text-gray-600">
            {apartment.title}
          </h2>
          <button
            className="text-[#064236] hover:text-black text-2xl"
            onClick={onClose}
          >
            x
          </button>
        </div>

        {/* Scrollbarer Bereich */}
        <div className="max-h-[70vh] overflow-y-auto p-4">
          {/* Carousel für Apartmentbilder */}
          <Carousel
            showArrows={true}
            infiniteLoop
            autoPlay
            dynamicHeight={false} // Verhindert, dass die Höhe jedes Bildes dynamisch angepasst wird
            swipeable={true} // Ermöglicht das Wischen auf Touch-Geräten
            emulateTouch={true} // Erlaubt Touch-Gesten auf mobilen Geräten
            showThumbs={false} // Blendet die Miniaturen unter den Bildern aus
            className="carousel-container"
          >
            {apartment.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Apartment image ${index + 1}`}
                  className="w-full h-130 object-cover rounded-lg"
                />
              </div>
            ))}
          </Carousel>

          {/* Apartmentdetails */}
          <div className="p-4 text-gray-600">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              {apartment.title}
            </h2>
            <p className="text-gray-600 text-center">{apartment.description}</p>
            <p className="text-gray-600 mt-2 text-center">
              <strong>{apartment.guests}</strong> Gäste{" "}
              <strong>{apartment.bedrooms}</strong> Schlafzimmer{" "}
              <strong>{apartment.bathroom}</strong> Badezimmer
            </p>
            <p className="font-bold text-lg mt-3 text-[#116769] text-center">
              Ab €{apartment.pricePerNight} pro Nacht
            </p>

            {/* Wenn roomAmenities vorhanden sind, wird die Liste angezeigt */}
            {roomAmenities.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Ausstattung:</h3>
                <ul className="list-none flex flex-wrap gap-2 text-gray-600 mt-2">
                  {roomAmenities.map((amenity, index) => (
                    <li
                      key={index}
                      className="bg-gray-200 px-3 py-1 rounded-lg text-sm"
                    >
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-600 mt-4 text-center">
                Keine Ausstattung verfügbar
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export function ApartmentsList() {
  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);

  useEffect(() => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/houses`;

    fetch(url, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApartments(data);
      })
      .catch((error) => console.error("Fehler beim Laden der Daten:", error));
  }, []);

  return (
    <div>
      {/* MiniNavbar nur anzeigen, wenn kein Apartment ausgewählt ist */}
      {!selectedApartment && <MiniNavbar />}

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col gap-6 items-center mt-7">
          {apartments.map((apartment, index) => (
            <ApartmentCard
              key={index}
              apartment={apartment}
              onClick={setSelectedApartment}
            />
          ))}
        </div>
        {selectedApartment && (
          <ApartmentModal
            apartment={selectedApartment}
            onClose={() => setSelectedApartment(null)}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}
