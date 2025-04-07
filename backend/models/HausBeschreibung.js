import { Schema, model } from "mongoose";

const hausBeschreibungSchema = new Schema(
  {
    houseType: {
      type: String,
      required: true,
      enum: [
        "HouseType1",
        "HouseType2",
        "HouseType3",
        "HouseType4",
        "HouseType5",
      ],
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    images: [String],
    description: {
      type: String,
      required: true,
    },
    guests: Number, // Maximal erlaubte Gäste
    bedrooms: Number,
    livingRoom: Number,
    terrace: Number,
    toilet: Number,
    bathroom: Number,
    roomAmenities: {
      bathroomInfo: String,
      internetInfo: String,
      heatingInfo: String,
      kitchenInfo: String,
      entertainment: String,
      homeSafety: String,
    },
    pricePerNight: {
      // Preis pro Nacht
      type: Number,
      required: true,
    },
    availableCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const HausBeschreibung = model(
  "HausBeschreibung",
  hausBeschreibungSchema
);
