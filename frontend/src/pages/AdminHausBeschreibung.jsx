import React, { useState, useEffect, useRef } from "react";

export function AdminHausBeschreibung() {
  const [houses, setHouses] = useState([]);
  const [updatedHouseData, setUpdatedHouseData] = useState({
    title: "",
    description: "",
    bedrooms: "",
    livingRoom: "",
    terrace: "",
    toilet: "",
    bathroom: "",
    pricePerNight: "",
  });
  const formRef = useRef(null);

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/houses`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Fehler beim Laden der Häuser");
      const data = await response.json();
      setHouses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateHouse = async (e) => {
    e.preventDefault(); // Stoppt das automatische Neuladen des Formulars
    const url = `${import.meta.env.VITE_SERVER_URL}/api/houses/${
      updatedHouseData._id
    }`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedHouseData),
      });
      if (!response.ok) throw new Error("Fehler beim Aktualisieren");

      await fetchHouses(); // Lädt die neuen Daten nach dem Update
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Fehler beim Aktualisieren:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedHouseData((prev) => {
      if (name.startsWith("roomAmenities.")) {
        const amenityKey = name.split(".")[1];

        return {
          ...prev,
          roomAmenities: {
            ...prev.roomAmenities, // Sicherstellen, dass roomAmenities existiert
            [amenityKey]: value,
          },
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const handleEditClick = (house) => {
    setUpdatedHouseData({
      _id: house._id,
      title: house.title,
      description: house.description,
      bedrooms: house.bedrooms || "",
      livingRoom: house.livingRoom || "",
      terrace: house.terrace || "",
      toilet: house.toilet || "",
      bathroom: house.bathroom || "",
      pricePerNight: house.pricePerNight || "",
      roomAmenities: {
        bathroomInfo: house.roomAmenities?.bathroomInfo || "",
        internetInfo: house.roomAmenities?.internetInfo || "",
        heatingInfo: house.roomAmenities?.heatingInfo || "",
        kitchenInfo: house.roomAmenities?.kitchenInfo || "",
        entertainment: house.roomAmenities?.entertainment || "",
        homeSafety: house.roomAmenities?.homeSafety || "",
      },
    });
    setTimeout(() => {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">
        Admin HausBeschreibung
      </h2>
      {/* Häuserliste */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses.length > 0 ? (
          houses.map((house) => (
            <div
              key={house._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-5">{house.title}</h3>
              <p className="text-gray-600 mb-5">{house.description}</p>
              <div className="flex-grow">
                <p className="text-gray-600">Schlafzimmer: {house.bedrooms}</p>
                <p className="text-gray-600">Wohnzimmer: {house.livingRoom}</p>
                <p className="text-gray-600">Terrasse: {house.terrace}</p>
                <p className="text-gray-600">Toiletten: {house.toilet}</p>
                <p className="text-gray-600">Badezimmer: {house.bathroom}</p>

                {/* Room Amenities */}
                <p className="text-gray-600">
                  {house.roomAmenities.bathroomInfo}
                </p>
                <p className="text-gray-600">
                  {house.roomAmenities.internetInfo}
                </p>
                <p className="text-gray-600">
                  {house.roomAmenities.heatingInfo}
                </p>
                <p className="text-gray-600">
                  {house.roomAmenities.kitchenInfo}
                </p>
                <p className="text-gray-600">
                  {house.roomAmenities.entertainment}
                </p>
                <p className="text-gray-600">
                  {house.roomAmenities.homeSafety}
                </p>

                {/* Preis pro Nacht */}
                <p className="text-gray-700">
                  <strong>{house.pricePerNight} €</strong> pro Nacht
                </p>
              </div>

              {/* Bearbeiten Button */}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => handleEditClick(house)}
                  className=" flex items-center justify-center gap-2 px-4 py-2 bg-teal-dark border border-forest-green text-white font-medium rounded-full cursor-pointer shadow-sm hover:bg-forest-green transition text-sm  text-center animate-bounce-on-hover"

                  // className="bg-gray-800 text-white px-6 py-3 rounded-md cursor-pointer hover:text-[#fae1a8]"
                >
                  Bearbeiten
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Keine Häuser gefunden.</p>
        )}
      </div>

      {/* Haus aktualisieren */}
      {updatedHouseData._id && (
        <div
          ref={formRef}
          className="mt-8 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-lg font-semibold text-center mb-6">
            Haus bearbeiten
          </h3>

          <form className="space-y-4">
            {/* Allgemeine Informationen */}
            {[
              { label: "Titel", name: "title", type: "text" },
              { label: "Schlafzimmer", name: "bedrooms", type: "number" },
              { label: "Wohnzimmer", name: "livingRoom", type: "number" },
              { label: "Terrasse", name: "terrace", type: "number" },
              { label: "Toiletten", name: "toilet", type: "number" },
              { label: "Badezimmer", name: "bathroom", type: "number" },
              {
                label: "Preis pro Nacht",
                name: "pricePerNight",
                type: "number",
              },
            ].map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-3 items-center gap-4"
              >
                <label className="font-medium">{field.label}:</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={updatedHouseData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.label}
                  className="col-span-2 p-2 border rounded-md w-full"
                />
              </div>
            ))}

            {/* Beschreibung */}
            <div className="grid grid-cols-3 items-start gap-4">
              <label className="font-medium mt-2">Beschreibung:</label>
              <textarea
                name="description"
                value={updatedHouseData.description}
                onChange={handleChange}
                placeholder="Beschreibung"
                className="col-span-2 p-2 border rounded-md w-full h-24"
              />
            </div>

            {/* Zimmer-Ausstattung */}
            {[
              { label: "Badezimmer-Info", name: "roomAmenities.bathroomInfo" },
              { label: "Internet-Info", name: "roomAmenities.internetInfo" },
              { label: "Heizung-Info", name: "roomAmenities.heatingInfo" },
              { label: "Küchen-Info", name: "roomAmenities.kitchenInfo" },
              { label: "Entertainment", name: "roomAmenities.entertainment" },
              {
                label: "Sicherheitaustattung",
                name: "roomAmenities.homeSafety",
              },
            ].map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-3 items-center gap-4"
              >
                <label className="font-medium">{field.label}:</label>
                <input
                  type="text"
                  name={field.name}
                  value={
                    updatedHouseData?.roomAmenities?.[
                      field.name.split(".")[1]
                    ] || ""
                  }
                  onChange={handleChange}
                  placeholder={field.label}
                  className="col-span-2 p-2 border rounded-md w-full"
                />
              </div>
            ))}

            {/* Speichern Button */}
            <button
              type="button"
              onClick={(e) => updateHouse(e)}
              className=" flex items-center justify-center gap-2 px-4 py-2 bg-teal-dark border border-forest-green text-white font-medium rounded-full cursor-pointer shadow-sm hover:bg-forest-green transition text-sm  text-center animate-bounce-on-hover"

              // className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer hover:text-[#fae1a8]"
            >
              Speichern
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
