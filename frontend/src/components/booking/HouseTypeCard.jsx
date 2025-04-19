import { Carousel } from "react-responsive-carousel";
import { RxCross2 } from "react-icons/rx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../styles/booking.css";

export const HouseTypeCard = ({ house, onClick, selected=false}) => {
  console.log("selected",selected )
  return (
    <div onClick={() => onClick(house)}
      className={`bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer mb-6 flex items-center w-full max-w-6xl mx-auto p-4 flex-col md:flex-row ${selected ? "custom-bg-seletedHouseCard-color border border-[#064236]":"bg-white"}`}
    >
      <img
        src={house.images[0]}
        alt={house.title}
        className="w-32 h-32 sm:w-48 sm:h-48 md:w-65 md:h-65 object-cover rounded-lg mr-4 mb-4 md:mb-0"
      />
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-gray-600 w-[260px] md:w-auto">
          {house.title}
        </h2>
        {/* Beschreibung nur auf größeren Geräten anzeigen */}
        <p className="text-gray-600 mt-2 hidden sm:block">
          {house.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-600 text-sm sm:text-base md:flex-1">
            <p className="text-sm">max.<span className="font-semibold"> {house.guests}</span> Gäste</p>
            <p className="text-sm"> <span className="font-semibold">{house.bedrooms}</span> Schlafzimmer</p>
              <p className="text-sm"><span className="font-semibold">{house.bathroom}</span> Bäder</p>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-base font-bold text-[#116769]">
            €{house.pricePerNight}/Nacht
          </p>
        </div>
      </div>
    </div>
  );
};

export const HouseTypeModal = ({ house, onClose }) => {
  console.log("HouseTypeModal",house);
  if (!house) return null;
  const roomAmenities = house.roomAmenities
    ? Object.values(house.roomAmenities)
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
      onClick={handleCloseOnBackgroundClick}
      className="fixed inset-0 flex justify-center items-center p-6 pt-16 z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      {/* add pt-16 to make modal not an top */}
      <div
        className="bg-white bg-opacity-90 rounded-xl shadow-2xl w-full md:w-3/5 relative p-1 "
        onClick={handleModalClick}
      >
        <div className="bg-gray-100 p-4 flex justify-between items-center border-b border-[#064236]">
          <h2 className="text-xl font-semibold text-gray-600">
            {house.title}
          </h2>
          <button
            className="text-[#064236] hover:text-black text-2xl cursor-pointer hover:bg-gray-300 p-1 rounded-md"
            onClick={onClose}
          >
            <RxCross2 />
          </button>
        </div>

        {/* Scrollbarer Bereich */}
        <div className="max-h-[90vh] overflow-y-auto p-4">
          {/* Carousel für house */}
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
            {house.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`house image ${index + 1}`}
                  className="w-full h-120 object-cover rounded-lg"
                />
              </div>
            ))}
          </Carousel>

          {/* house */}
          <div className="p-4 text-gray-600">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              {house.title}
            </h2>
            <p className="text-gray-600 text-center">{house.description}</p>
            <p className="text-gray-600 mt-2 text-center">
              max.<strong>{house.guests}</strong> Gäste{" "}
              <strong>{house.bedrooms}</strong> Schlafzimmer{" "}
              <strong>{house.bathroom}</strong> Badezimmer
            </p>
            <p className="font-bold text-lg mt-3 text-[#116769] text-center">
              Ab €{house.pricePerNight} pro Nacht
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
                {/* Keine Ausstattung verfügbar */}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
