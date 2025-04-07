import { SingleHouse } from "../models/SingleHouseSchema.js";

export const getHouseByNum =async(req,res,next)=>{
    const { houseNum } = req.params;
    const filter =  { houseNum: houseNum}; 
    console.log("getHouseByNum houseNum", houseNum);
    try {
        const singleHouse = await SingleHouse.findOne(filter);
        // console.log("getHouseByNum singleHouse",singleHouse)
        req.result = singleHouse;
        next(); 
    } catch (error) {
        console.log("Error in getHouseByNum middleware:", error);
        next(error);
    }
};

export const getHousesforCheckinOrReserve = async(req,res,next)=>{
    const {houseType} = req.params;
    const { bookingNum, startDate, endDate, guestName, houseNum, reserved} = req.body;
    console.log("GET request to getHousesforCheckinOrReserve, houseType", houseType); 
    //if this house is already reserved, direct go to next middleware
    if(reserved){
        next();
        return;
    }
    try {

        const requestedStartDate = new Date(startDate);
        const requestedEndDate = new Date(endDate);
        // console.log("getHousesforCheckinOrReserve, req.body", req.body);
        // console.log("getHousesforCheckinOrReserve, houseType", houseType);
        const houses = await SingleHouse.find({
            houseType: houseType,
            // choose houseType suitable and not Occupied houses
            bookingNum: { $eq: ""} // add for single house select for booking (not checkedin)
        });
        // console.log("getHousesforCheckinOrReserve, houses.length", houses.length);

        const availableHouses = houses.filter(house => {
            // houses can"t have overlap with inUsePeriods(admin reserve for other use) or with bookingReservePeriods(reserved for booking guest)
            const isInUseOverlapping = house.inUsePeriods.some(period => {
                const inUseStartDate = new Date(period.startDate);
                const inUseEndDate = new Date(period.endDate);
                return inUseStartDate <= requestedEndDate && requestedStartDate <= inUseEndDate;
            });

            const isBookingReserveOverlapping = house.bookingReservePeriods.some(period => {
                const reserveStartDate = new Date(period.startDate);
                const reserveEndDate = new Date(period.endDate);
                return requestedEndDate > reserveStartDate  && requestedStartDate < reserveEndDate;
            });

            return !isInUseOverlapping && !isBookingReserveOverlapping;
        });
        req.result = availableHouses;
        next();
    } catch (error) {
        console.log("Error in getHousesforCheckinOrReserve middleware:", error);
        next(error);
    }
}

// hange status to "ReservedInUse" means this house is reserved in some period.
// reason could be for guest to reserve the house or hotel Admin need to put this house not in use(for example. renovation), the date will be saved in inUsePeriods.
// later when new guest try to make a booking, this period will be compared with request date. if house is reserved in this period, verfügbar count will be minus 1.
export const houseReservedByAdmin =async(req,res,next)=>{
    const { houseNum } = req.params;
    const { inUsePeriods} = req.body;
    const filter =  { houseNum: houseNum}; 
    console.log("houseReservedByAdmin, houseNum", houseNum);

    try {
        if (!Array.isArray(inUsePeriods)) {
            throw new Error("inUsePeriods must be an array");
        }
        const updateData = {
            $set: { inUsePeriods: inUsePeriods }
        };
        const singleHouse = await SingleHouse.updateOne(filter, updateData);
        // console.log("houseReservedByAdmin singleHouse",singleHouse)
        req.result = singleHouse;
        next(); 
    } catch (error) {
        console.log("Error in houseReservedByAdmin middleware:", error);
        next(error);
    }
};

export const houseCheckIn = async(req,res,next)=>{
    const { houseType } = req.params;
    const { bookingNum, startDate, endDate, guestName, houseNum} = req.body;
    console.log("houseCheckIn,req.body", req.body);
    try {
        if(houseNum !== ""){
            const house = await SingleHouse.find({
                houseType: houseType,
                houseNum: houseNum,
                bookingReservePeriods: { $elemMatch: { bookingNum: bookingNum } }
            });
            // console.log("GET request to houseCheckIn, house", house); 
            // console.log("houseCheckIn,house.length", house.length);
            if (house.length===0) {
                //when this house is not reserved for the booking, send available houses back
                req.body.houseNum = "";
                next();
                return;
            } 
            req.result=house;
            req.body.reserved = true;
            // console.log("houseCheckIn, req.result", req.result);
        }
        next();
        // req.body.houseNum = house.houseNum;
        // // if this house is already reserved for this booking, set book infomation.
        // houseSetBookInfo(req, res, next);
    } catch (error) {
        console.log("Error in houseCheckIn middleware:", error);
        next(error);
    }
}

export const houseSetBookInfo = async(req,res,next)=>{
    // const { houseNum } = req.params;
    const { bookingNum, startDate, endDate, guestName, houseNum} = req.body;
    console.log("houseSetBookInfo,req.body", req.body);
    try {
        const filter =  { houseNum: houseNum}; 
        const updateData = {
            $set: {
                // status: "Occupied",
                bookingNum: bookingNum,
                startDate: startDate,
                endDate: endDate
            },
            $pull: {
                bookingReservePeriods: { bookingNum: bookingNum }
            }            
        };
        //check in process
        const singleHouse = await SingleHouse.updateOne(filter, updateData);
        // console.log("updateOne singleHouse",singleHouse)
        next(); 
    } catch (error) {
        console.log("Error in houseSetBookInfo middleware:", error);
        next(error);
    }
}

export const houseCheckoutOrCancel = async(req,res,next)=>{
    const { bookingNum } = req.params;
    const { houseNum,status} = req.body;
    console.log("houseCheckoutOrCancel,req.body", req.body);
    if(!houseNum){
        next(); 
        return;
    }
    try {
        const filter =  { houseNum: houseNum}; 
        const updateData = {
            $set: {
                bookingNum: "",
                startDate: "",
                endDate: ""
            },
            $pull: {
                bookingReservePeriods: { bookingNum: bookingNum }
            }            
        };

        const singleHouse = await SingleHouse.updateOne(filter, updateData);
        // console.log(" houseCheckoutOrCancel updateOne singleHouse",singleHouse)
        next(); 
    } catch (error) {
        console.log("Error in houseCheckoutOrCancel middleware:", error);
        next(error);
    }
}

export const houseReserve = async(req,res,next)=>{
    const booking = req.body;
    console.log("houseReserve,req.body", req.body);
    if(booking.houseNum===""){
        next();
        return;
    }
    try {
        const filter =  { houseNum: booking.houseNum}; 
        const updateData = {
            $push: {
                bookingReservePeriods: { 
                    bookingNum: booking.bookingNumber,
                    startDate: booking.startDate,
                    endDate: booking.endDate
                }
            }            
        };
        // console.log("houseReserve, updateData ",updateData)
        const singleHouse = await SingleHouse.updateOne(filter, updateData);
        // console.log(" houseReserve updateOne singleHouse",singleHouse)
        req.body.reserved = true;
        next(); 
    } catch (error) {
        console.log("Error in houseReserve middleware:", error);
        next(error);
    }
}

export const houseAdminInuseReserve = async(req,res,next)=>{
    const { houseNum } = req.params;
    const inUsePeriods = req.body;
    console.log("houseAdminInuseReserve,req.body", req.body);

    try {
        if(!inUsePeriods || inUsePeriods.length === 0){
            throw new Error("houseAdminInuseReserve, inUsePeriods is empty");
        }
        const filter =  { houseNum: houseNum}; 
        const updateData = {
            $set: {
                inUsePeriods: inUsePeriods  
            }
        };
        const singleHouse = await SingleHouse.updateOne(filter, updateData);
        // console.log(" houseAdminInuseReserve updateOne singleHouse",singleHouse)
        req.result = singleHouse;
        next(); 
    } catch (error) {
        console.log("Error in houseAdminInuseReserve middleware:", error);
        next(error);
    }
}

export const querySingleHouses = async(req,res,next)=>{
    const { houseType,adminReservedInuse,guestReserved,houseNum, page = 1 } = req.query;
    const limit = 15;
    const skip = (page - 1) * limit;

    let query = {};
    if (houseType) query.houseType = houseType;
    if (houseNum) query.houseNum = houseNum;
    if (adminReservedInuse === "false"){
        query.inUsePeriods = { "$size": 0 };
    }else if(adminReservedInuse === "true"){
        query.inUsePeriods = {  "$ne": []  };
    }
    if (guestReserved === "false"){
        query.bookingReservePeriods = { "$size": 0 };
    }else if(guestReserved === "true"){
        query.bookingReservePeriods = {  "$ne": []  };
    }
    console.log("querySingleHouses query", query);
    try {
        const singleHouses = await SingleHouse.find(query)
                                    .sort({ createdAt: -1 }) 
                                    .limit(limit + 1)
                                    .skip(skip);

        const hasMore = singleHouses.length > limit;
        if (hasMore) singleHouses.pop();
        // console.log("bookingTickets.length", singleHouses.length);
        // console.log("hasMore", hasMore);
        req.result = {
            singleHouses: singleHouses,
            hasMore: hasMore
        };
        next();
    } catch (error) {
        console.log("Error in querySingleHouses middleware:", error);
        next(error);
    }
}
