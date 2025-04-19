import { connect } from "../utils/connect.js";
import { HausBeschreibung } from "../models/HausBeschreibung.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
connect();

const houses = [
  {
    _id: new mongoose.Types.ObjectId("67c6b643d89f6f26b2a91b93"),
    houseType: "HouseType1",
    title: "Strandhaus mit direktem Meerzugang",
    images: [
      "https://myluxzen-backend.onrender.com/images/Apartment04.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment04-01.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment04-02.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment04-03.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment04-04.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment04-05.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment04-06.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment04-07.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment04-08.jpg",
    ],
    description:
      "Wunderschönes Strandhaus mit großer Sonnenterrasse, privatem Zugang zum Meer und traumhaftem Ausblick. Genießen Sie Ihren Morgenkaffee mit Blick auf den Ozean oder verbringen Sie entspannte Nachmittage in der Hängematte. Das Haus bietet großzügige Wohnbereiche, eine offene Küche und komfortable Schlafzimmer für die ganze Familie.",
    guests: 8,
    bedrooms: 4,
    livingRoom: 1,
    terrace: 2,
    toilet: 3,
    bathroom: 2,
    roomAmenities: {
      bathroomInfo: "Doppelwaschbecken, Regendusche",
      internetInfo: "WLAN, Bluetooth-Lautsprecher",
      heatingInfo: "Klimaanlage & Sonnenschutz",
      kitchenInfo: "Offene Küche mit Meerblick",
      entertainment: "Strandspiele, Kajaks, Smart-TV",
      homeSafety: "Erste-Hilfe-Set, Feuerlöscher",
    },
    pricePerNight: 1600,
    availableCount: 2,
  },
  {
    _id: new mongoose.Types.ObjectId("67c6b643d89f6f26b2a91b95"),
    title: "Gemütliche Berghütte mit Sauna",
    houseType: "HouseType2",
    images: [
      "https://myluxzen-backend.onrender.com/images/Apartment02.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment02-01.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment02-02.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment02-03.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment02-04.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment02-05.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment02-06.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment02-07.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment02-08.jpg",
    ],
    description:
      "Rustikale Berghütte mit Kamin, privater Sauna und einem spektakulären Blick auf die Berge. Die Hütte ist liebevoll mit Holzmöbeln eingerichtet und verfügt über eine große Terrasse zum Entspannen. Eine moderne Küche, kuschelige Schlafräume und eine Fußbodenheizung sorgen für maximalen Komfort.",
    guests: 6,
    bedrooms: 4,
    livingRoom: 1,
    terrace: 1,
    toilet: 2,
    bathroom: 2,
    roomAmenities: {
      bathroomInfo: "Wellness-Dusche, Bademäntel",
      internetInfo: "WLAN & Smart-Home-Steuerung",
      heatingInfo: "Holzofen & elektrische Heizung",
      kitchenInfo: "Rustikale Holzküche mit Espressomaschine",
      entertainment: "Brettspiele, Bücher, Beamer mit Leinwand",
      homeSafety: "Rauchmelder, Erste-Hilfe-Set",
    },
    pricePerNight: 1350,
    availableCount: 5,
  },
  {
    _id: new mongoose.Types.ObjectId("67c6b643d89f6f26b2a91b97"),
    houseType: "HouseType3",
    title: "Luxuriöses Penthouse mit Dachterrasse",
    images: [
      "https://myluxzen-backend.onrender.com/images/Apartment03.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment03-01.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment03-02.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment03-03.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment03-04.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment03-05.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment03-06.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment03-07.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment03-08.jpg",
    ],
    description:
      "Elegantes Penthouse mit Panoramablick, privatem Whirlpool auf der Terrasse und hochwertiger Ausstattung. Die bodentiefen Fenster sorgen für ein helles Ambiente und bieten eine atemberaubende Aussicht. Die moderne Küche mit Induktionskochfeld und das elegante Badezimmer mit Regendusche runden das luxuriöse Erlebnis ab.",
    guests: 4,
    bedrooms: 3,
    livingRoom: 2,
    terrace: 1,
    toilet: 2,
    bathroom: 2,
    roomAmenities: {
      bathroomInfo: "Freistehende Badewanne mit Skyline-Blick",
      internetInfo: "Glasfaser-Internet (1 Gbit/s)",
      heatingInfo: "Klimaanlage & elektrische Fußbodenheizung",
      kitchenInfo: "Designerküche mit Induktionskochfeld",
      entertainment: "Dolby Atmos Soundsystem, Apple TV",
      homeSafety: "Smart Lock, 24/7 Concierge",
    },
    pricePerNight: 950,
    availableCount: 5,
  },
  {
    _id: new mongoose.Types.ObjectId("67c6b643d89f6f26b2a91b99"),
    houseType: "HouseType4",
    title: "Moderne Strandvilla mit Pool",
    images: [
      "https://myluxzen-backend.onrender.com/images/Apartment01.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment01-01.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment01-02.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment01-03.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment01-04.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment01-05.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment01-06.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment01-07.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment01-08.jpg",
    ],
    description:
      "Diese moderne Villa bietet direkten Zugang zum Strand, einen Infinity-Pool und stilvolle Innenräume für einen entspannten Aufenthalt. Großzügige Fenster lassen viel Tageslicht hinein und bieten einen wunderschönen Blick aufs Meer. Die Ausstattung umfasst eine Designer-Küche, Smart-Home-Technologie und luxuriöse Badezimmer mit Whirlpool.",
    guests: 4,
    bedrooms: 3,
    livingRoom: 1,
    terrace: 1,
    toilet: 2,
    bathroom: 2,
    roomAmenities: {
      bathroomInfo: "Whirlpool, Regendusche, Luxus-Pflegeprodukte",
      internetInfo: "High-Speed WLAN (500 Mbit/s)",
      heatingInfo: "Fußbodenheizung & Klimaanlage",
      kitchenInfo: "Moderne Einbauküche mit Weinkühler",
      entertainment: "65'' Smart-TV, Netflix, Soundsystem",
      homeSafety: "Alarmanlage, Safe, Videoüberwachung",
    },
    pricePerNight: 745,
    availableCount: 5,
  },
  {
    _id: new mongoose.Types.ObjectId("67c6b643d89f6f26b2a91b9b"),
    houseType: "HouseType5",
    title: "Modernes Loft ",
    images: [
      "https://myluxzen-backend.onrender.com/images/Apartment05.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment05-01.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment05-02.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment05-03.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment05-04.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment05-05.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment05-06.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment05-07.jpg",
      "https://myluxzen-backend.onrender.com/images/Apartment05-08.jpg",
    ],
    description:
      "Elegantes Loft mit offener Raumgestaltung, moderner Einrichtung und Balkon mit Blick auf die Stadt. Hohe Decken, große Fenster und stilvolle Möbel verleihen dem Apartment ein einzigartiges Flair. Die voll ausgestattete Küche, das gemütliche Schlafzimmer und die zentrale Lage machen es perfekt für Städtereisende und Geschäftsleute.",
    guests: 2,
    bedrooms: 2,
    livingRoom: 1,
    terrace: 1,
    toilet: 1,
    bathroom: 2,
    roomAmenities: {
      bathroomInfo: "Marmorbad mit Goldarmaturen",
      internetInfo: "WLAN in allen Räumen",
      heatingInfo: "Kamin & Zentralheizung",
      kitchenInfo: "Landhausküche mit Steinofen",
      entertainment: "Weinverkostungen, Klavier",
      homeSafety: "Wachdienst, Sicherheitstor",
    },
    pricePerNight: 565,
    availableCount: 10,
  },
];

const seedDB = async () => {
  try {
    for (let house of houses) {
      // Prüfe, ob ein anderes Dokument mit demselben Titel existiert
      const existingHouse = await HausBeschreibung.findOne({
        title: house.title,
      });

      if (
        existingHouse &&
        existingHouse._id.toString() !== house._id.toString()
      ) {
        console.warn(`⚠️ Lösche doppelten Eintrag: ${house.title}`);
        await HausBeschreibung.deleteOne({ _id: existingHouse._id });
      }

      // Füge das Haus mit der festen OID ein oder aktualisiere es
      await HausBeschreibung.findOneAndUpdate({ _id: house._id }, house, {
        upsert: true,
        new: true,
      });
    }

    console.log("✅ Seed-Daten erfolgreich aktualisiert!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Fehler beim Seeding:", error);
    mongoose.connection.close();
  }
};

seedDB();
