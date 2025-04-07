import mongoose  from "mongoose";

const bookingSchema = new mongoose.Schema({
    bookingNumber: { type: String },
    guestFirstName: { type: String, required: true },
    guestFamilyName: { type: String, required: true },
    email: {
        type: String,
    },
    guestCount : { type: Number, required: true, max: 8  },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    houseType: { type: String, 
        enum: ["HouseType1", "HouseType2", "HouseType3", "HouseType4", "HouseType5"],  
        required: true  
    },
    status:  { type: String, 
        enum: ["Active", "Canceled", "CheckedIn", "CheckedOut"], 
        required: true  
    },
    price: { type: Number, required: true },
    houseTitle: { type: String },
    mobileNumber: { type: String },
    comments:{ type: String },
    houseNum :{ type: String },
    totalPrice: { type: Number},
    totalDays: { type: Number},
},
{ timestamps: true });


export const Booking = mongoose.model("booking", bookingSchema, "booking");

