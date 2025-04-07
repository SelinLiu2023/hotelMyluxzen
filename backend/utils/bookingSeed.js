import fs from "fs";
import { ObjectId } from "mongodb";
// import { connect } from "../utils/connect.js";
import { Booking } from "../models/bookingSchema.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
// dotenv.config();
dotenv.config();

export async function connect() {
  const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://zahra:myluxzen2025@myluxzen.t3kl8.mongodb.net/myluxzen?retryWrites=true&w=majority&appName=MyLuXZeN"; 
  // const MONGODB_URL = "mongodb://localhost:27017";
  console.log(" connect  MONGODB_URL", MONGODB_URL)
  const DB_NAME = process.env.DB_NAME || "myluxzen"; 
  if (MONGODB_URL) {
    await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`);
    console.log(`✅ Connected to MongoDB: ${MONGODB_URL}/${DB_NAME}`);
  } else {
    throw new Error("Error: MONGODB_URL not found");
  }
}
connect();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const guestInfo = [
  { vorname: "Max", nachname: "Müller", email: "max.mueller@gmail.com" },
  { vorname: "Anna", nachname: "Schmidt", email: "anna.schmidt@yahoo.com" },
  { vorname: "Lukas", nachname: "Weber", email: "lukas.weber@outlook.com" },
  { vorname: "Sophia", nachname: "Koch", email: "sophia.koch@gmail.com" },
  { vorname: "Felix", nachname: "Bauer", email: "felix.bauer@hotmail.com" },
  { vorname: "Emma", nachname: "Wagner", email: "emma.wagner@yahoo.de" },
  { vorname: "Jonas", nachname: "Becker", email: "jonas.becker@gmail.com" },
  { vorname: "Laura", nachname: "Hoffmann", email: "laura.hoffmann@outlook.de" },
  { vorname: "Paul", nachname: "Schwarz", email: "paul.schwarz@web.de" },
  { vorname: "Mia", nachname: "Neumann", email: "mia.neumann@t-online.de" },
  { vorname: "Tom", nachname: "Schneider", email: "tom.schneider@gmail.com" }
];

const houseDetails = {
  "HouseType1": { guests: 8, pricePerNight: 1600, houseNums: [1001, 1002], houseTitle : "Strandhaus mit direktem Meerzugang" },
  "HouseType2": { guests: 6, pricePerNight: 1350, houseNums: [2001, 2002, 2003, 2004, 2005], houseTitle : "Gemütliche Berghütte mit Sauna"  },
  "HouseType3": { guests: 4, pricePerNight: 950, houseNums: [3001, 3002, 3003, 3004, 3005], houseTitle : "Luxuriöses Penthouse mit Dachterrasse"  },
  "HouseType4": { guests: 4, pricePerNight: 745, houseNums: [4001, 4002, 4003, 4004, 4005], houseTitle : "Moderne Strandvilla mit Pool"  },
  "HouseType5": { guests: 2, pricePerNight: 565, houseNums: [5001, 5002, 5003, 5004, 5005, 5006, 5007, 5008, 5009, 5010], houseTitle : "Modernes Loft"  }
};

const bookings = [];
const today = new Date();

for (let i = 0; i < 80; i++) {
  const startOffset = getRandomInt(-200, 200); 
  const duration = getRandomInt(1, 28); // Duration between 1 to 14 days
  const startDate = new Date(today.getTime() + startOffset * 24 * 60 * 60 * 1000);
  startDate.setHours(14, 0, 0, 0); // 设置 startDate 为下午 2 点
  const endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
  endDate.setHours(11, 0, 0, 0); // 设置 endDate 为上午 11 点
  const totalDays = duration;

  const houseType = Object.keys(houseDetails)[getRandomInt(0, Object.keys(houseDetails).length - 1)];
  const details = houseDetails[houseType];
  const guestCount = getRandomInt(1, details.guests);
  const price = details.pricePerNight;
  const houseNums = details.houseNums;
  const houseTitle = details.houseTitle;

  let status = "CheckedOut";
  if (endDate < today) {
    status = getRandomInt(0, 9) < 1 ? "Canceled" : "CheckedOut"; // Mostly "CheckedOut", rarely "Canceled"
  } else if (startDate > today) {
    status = getRandomInt(0, 9) < 1 ? "Canceled" : "Active"; // Mostly "Active", rarely "Canceled"
  } else if (startDate <= today && endDate >= today) {
    status = "CheckedIn";
  }
  const creationDate = new Date(Math.min(startDate.getTime() - getRandomInt(1, 10) * 24 * 60 * 60 * 1000, today.getTime()));
  const updateDate = new Date(Math.min(creationDate.getTime() + getRandomInt(1, 5) * 24 * 60 * 60 * 1000, today.getTime()));

  const booking = {
    _id: new ObjectId(),
    // bookingNumber: `BOOK${getRandomInt(1000, 9999)}`,
    bookingNumber: `B${uuidv4()}`,

    guestFirstName: guestInfo[i % guestInfo.length].vorname,
    guestFamilyName: guestInfo[i % guestInfo.length].nachname,
    email: guestInfo[i % guestInfo.length].email,
    guestCount,
    startDate,
    endDate,
    houseType,
    status,
    price,
    houseTitle,
    mobileNumber: "",
    comments: "",
    houseNum: houseNums[getRandomInt(0, houseNums.length - 1)],
    totalPrice: price * totalDays,
    totalDays,
    createdAt: creationDate,
    updatedAt: updateDate,
    extraInfo: "",
    __v: 0
  };

  bookings.push(booking);
}

// fs.writeFileSync("bookings.json", JSON.stringify(bookings, null, 2));
const seedDB = async () => {
    try {
      await Booking.deleteMany();
      await Booking.insertMany(bookings);
      console.log("✅ Seed-Daten erfolgreich eingefügt!");
    } catch (error) {
      console.error("❌ Fehler beim Seeding:", error);

    }finally {
            mongoose.disconnect();
    }
  };
  
  seedDB();
