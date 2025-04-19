import { Booking} from "../models/bookingSchema.js";
import { HausBeschreibung } from "../models/HausBeschreibung.js";
import { SingleHouse } from "../models/SingleHouseSchema.js";

export const getBookingTicket = async(req,res,next)=>{
    const {bookingNumber} = req.params;
    if(!bookingNumber) return;
    console.log("bookingNumber", bookingNumber);
    try {
        const bookingTicket = await Booking.findOne({bookingNumber});
        if(!bookingTicket){
            return res.status(404).json({ message: "No available bookingticket found" });
        }
        req.result = bookingTicket;
        next();
    } catch (error) {
        console.log("Error in getBookingTicket middleware:",error);
        next(error);
    }
}

/**for admin to query bookingtickets with a lots of conditions */
export const queryBookingTickets = async(req,res,next)=>{
    const { bookingNum, email, guestFirstName,guestFamilyName,queryStartDate, queryEndDate, houseType, status, setLimit, page = 1 } = req.query;
    const limit = parseInt(setLimit, 10) || 15;
    const skip = (page - 1) * limit;
    console.log("queryBookingTickets req.query ",req.query)
    let query = {};
    if (bookingNum) query.bookingNumber = bookingNum;
    if (email) query.email = email;
    if (guestFirstName) 
            query.guestFirstName = { $regex: guestFirstName.replace(/\s+/g, ""), $options: "i" };
    if (guestFamilyName) 
            query.guestFamilyName = { $regex: guestFamilyName.replace(/\s+/g, ""), $options: "i" };
    if (houseType) query.houseType = houseType;
    if (status === "ActiveOrCheckedIn"){
        query.status = {$in: ["Active", "CheckedIn"]};
    }else if(status){
        query.status = status;
    }
        // console.log("queryStartDate",new Date(queryStartDate));
    /**if input  queryStartDate and queryEndDate*/
    if (queryStartDate && queryEndDate) {
        query.$or = [
            { startDate: { $gte: new Date(queryStartDate), $lte: new Date(queryEndDate) } }, // booking starts within this searchperiod
            { endDate: { $gte: new Date(queryStartDate), $lte: new Date(queryEndDate) } }, // booking ends within this searchperiod
            { startDate: { $lte: new Date(queryStartDate) }, endDate: { $gte: new Date(queryEndDate) } }// booking includs complete searchperiod
        ];
    } else {
        if (queryStartDate) { 
            query.startDate = { $gte: new Date(queryStartDate) };
        }
        if (queryEndDate) {
            /**if input only queryEndDate, get all bookingtickets start before queryEndDate  */             
            query.startDate = { $lte: new Date(queryEndDate) };
        }
    }
    // console.log("queryBookingTickets, query", query)
    try {
        const bookingTickets = await Booking.find(query)
                                    .sort({ createdAt: -1 }) //show newest first by default
                                    .limit(limit + 1)
                                    .skip(skip);
        if(bookingTickets.length === 0){
            return res.status(404).json({ message: "No available bookingtickets found" });
        }
        const hasMore = bookingTickets.length > limit;
        if (hasMore) bookingTickets.pop();
        // console.log("bookingTickets.length", bookingTickets.length);
        // console.log("hasMore", hasMore);
        req.result = {
            bookingTickets: bookingTickets,
            hasMore: hasMore
        };
        next();
    } catch (error) {
        console.log("Error in queryBookingTickets middleware:",error);
        next(error);
    }
}

export const createBookingMiddleware = async (req, res, next) => {
    // status is from frontend, for new created bookingticket is always "Active"
    console.log("GET request to createBookingMiddleware"); 
    const { guestCount, startDate, endDate, houseType, status } = req.body;
    try {
        if (!guestCount || !startDate || !endDate || !houseType || !status) {
            throw new Error("Missing required fields");
        }
        const newBooking = new Booking({
            ...req.body
        });
        await newBooking.save();
        req.result = newBooking;
        next(); 
    } catch (error) {
        console.log("Error in createBookingMiddleware middleware:", error);
        next(error);
    }
};

export const deleteBooking = async(req,res,next)=>{
    const { bookingNumber } = req.params;
    try {
        console.log("GET request to deleteBooking, bookingNumber", bookingNumber); 
        const booking = await Booking.findOne({ bookingNumber });
        if(booking.status === "CheckedIn"){
            throw new Error("this bookingticket status is CheckedIn, not allowed to delete");
        }
        const deletedBooking = await Booking.findOneAndDelete({ bookingNumber });
        if (!deletedBooking) {
            throw new Error("Booking not found");
        }
        req.result = bookingNumber;
        next(); 
    } catch (error) {
        console.log("Error in deleteBooking middleware:", error);
        next(error);
    }
}

/** checkin start from singleHouse middleware, this is the second middleware for checkin */
export const bookingCheckin = async(req,res,next)=>{
    // const { houseNum } = req.params;
    const { bookingNum, startDate, endDate, guestName, houseNum} = req.body;
    if (!bookingNum) {
        return;
    }
    console.log("bookingCheckin, req.body",req.body); 
    try {

        // console.log("PUT request to bookingCheckin"); 
        const filter =  { bookingNumber:bookingNum }; 
        // console.log("bookingCheckin,bookingNum", bookingNum)
        let  updateData = {
            $set: {
                houseNum: houseNum,
                status: "CheckedIn"
            }
        };
        const booking = await Booking.updateOne(filter, updateData);
        // console.log("bookingCheckin,booking", booking)
        if (!req.result) {
            req.result = {};  
        }
        req.result.returnHouses = false;// return to frontend, show no needs to find a house. this booking hat already a house reserved and direct checkin.
        next(); 
    } catch (error) {
        console.log("Error in bookingCheckin middleware:", error);
        next(error);
    }
};

/** checkout start from singleHouse middleware, this is the second middleware for checkout*/
export const bookingCheckoutOrCancel = async(req,res,next)=>{
    const { bookingNum } = req.params;
    const { houseNum, status, email} = req.body;// add email for cancel email 
    console.log("bookingCheckoutOrCancel, bookingNum",bookingNum); 
    try {
        if(!bookingNum) throw new Error("in bookingCheckoutOrCancel no bookingNum");
        const filter =  { bookingNumber:bookingNum }; 
        let  updateData = {
            $set: {
                status: status
            }
        };
        const booking = await Booking.updateOne(filter, updateData);
        req.result = booking;
        next(); 
    } catch (error) {
        console.log("Error in bookingCheckoutOrCancel middleware:", error);
        next(error);
    }
};

/* import function for booking. search available housetype and return. */
export const getAvailableHouses = async (req, res, next) => {
    try {
        const { startDate, endDate, guestCount } = req.body;
        const requestedStartDate = new Date(startDate);
        const requestedEndDate = new Date(endDate);
        console.log("getAvailableHouses, req.body", req.body);

        const availableHouseTypes = await HausBeschreibung.find({ guests: { $gte: guestCount } });        // get all housetypes, which supports guest count
        // console.log("getAvailableHouses,availableHouseTypes.length",availableHouseTypes.length)

        // from SingleHouse get every house with available housetypes
        const allSingleHouses = await SingleHouse.find({ 
            houseType: { $in: availableHouseTypes.map(house => house.houseType) }
        });
        // console.log("getAvailableHouses,allSingleHouses.length",allSingleHouses.length)

        const availableHouses = allSingleHouses.filter(house => {
            const isInUsePeriodOverlapping = house.inUsePeriods.some(period => {
                const inUseStartDate = new Date(period.startDate);
                const inUseEndDate = new Date(period.endDate);
                const overlapsInUse = inUseStartDate < requestedEndDate && requestedStartDate < inUseEndDate; // modified for select logic. 04.09
                return overlapsInUse;
            });
        
            const isHousePeriodOverlapping = false;
            return !isInUsePeriodOverlapping && !isHousePeriodOverlapping;
        });
        
        // console.log("getAvailableHouses,availableHouses.length",availableHouses.length)
        /** Booking"s status "Active", "Canceled", "CheckedIn", "CheckedOut". Only with Active and CheckedIn this bookingticket will be considered to check the overlap.*/
        const activeBookings = await Booking.find({
            status: { $in: ["Active", "CheckedIn"] },
            $or: [
                { 
                    startDate: { $lte: requestedEndDate },  
                    endDate: { $gte: requestedStartDate }   
                }
            ]
        });
        // console.log("getAvailableHouses",allSingleHouses);

        /**compare every need-to-be considered bookingticket"s booking period with request period, if there is overlap, then availbel house count minus 1 */
        const updatedRooms = availableHouseTypes.map(house => {
            const singleHouses = availableHouses.filter(room => room.houseType === house.houseType);
            let availableCount = singleHouses.length;
            // console.log(house.houseType, singleHouses.length)
            activeBookings.forEach(booking => {
                const bookingStartDate = new Date(booking.startDate);
                const bookingEndDate = new Date(booking.endDate);
                const overlap = (bookingStartDate < requestedEndDate) && (bookingEndDate > requestedStartDate);
                if (overlap && house.houseType === booking.houseType) {
                    // console.log("overlap true, requestedStartDate,requestedEndDate",requestedStartDate, requestedEndDate);
                    // console.log("overlap true, bookingStartDate,bookingEndDate",bookingStartDate, bookingEndDate);
                    // console.log("overlap true, booking.bookingNum",booking.bookingNumber);
                    availableCount -= 1;  
                }
            });
            return {
                houseType: house.houseType,
                pricePerNight: house.pricePerNight,
                images: house.images,
                title: house.title,
                description: house.description,
                guests: house.guests,
                bedrooms: house.bedrooms,
                bathroom: house.bathroom,
                availableCount: availableCount >= 0 ? availableCount : 0,
            };
        });
        // console.log("getAvailableHouses updatedRooms.length",updatedRooms.length)
        //only when there is availble house in the housetype, give them to frontend
        req.result = updatedRooms.filter(room => room.availableCount > 0);
        if (req.result.length === 0) {
            return res.status(404).json({ message: "No available rooms found" });
        }
        next();
    } catch (error) {
        console.log("Error in getAvailableRooms middleware:", error);
        next(error);
    }
};
