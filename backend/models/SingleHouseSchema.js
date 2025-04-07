import mongoose  from "mongoose";
const { Schema, model } = mongoose;
const singleHouseSchema = new mongoose.Schema({
    houseNum: { type: String, required: true },
    houseType: { type: String, 
        enum: ["HouseType1", "HouseType2", "HouseType3", "HouseType4", "HouseType5"],  
        required: true  
    },    
    bookingNum: { type: String},
    startDate: { type: Date},
    endDate: { type: Date},
    guestName: [{ type: String}],
    isAvailable: { type: Boolean},
    // Occupied, means guest checked in mit bookingNum, startDate, endDate
    // Available（Available means maybe reserved for guest(bookingReservePeriods) or maybe free maybe reserved for other use(inUsePeriods).
    status:  { type: String},
    bookingReservePeriods: [{
        bookingNum: { type: String},
        startDate: { type: Date},
        endDate: { type: Date},
    }],
    inUsePeriods: [{ 
        startDate: { type: Date},
        endDate: { type: Date},
        reason: { type: String},
    }],
    hausBeschreibung: {
        type: Schema.Types.ObjectId,
        ref: "HausBeschreibung"
    },

});

export const SingleHouse = mongoose.model("singleHouse", singleHouseSchema, "singleHouse");
