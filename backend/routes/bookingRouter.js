import express from "express";
import { queryBookingTickets,deleteBooking,getAvailableHouses, bookingCheckoutOrCancel } from "../middlewares/bookingMW.js";
import { createBookingMiddleware } from "../middlewares/bookingMW.js";
import { getBookingTicket } from "../middlewares/bookingMW.js";
import { houseReserve ,houseCheckoutOrCancel} from "../middlewares/singleHouseMW.js";
import { sendEmailToClient } from "../utils/emailService.js";
const router = express.Router();

router.get("/bybookingnum/:bookingNumber",[getBookingTicket], (req, res) => {
    console.log("/bybookingnum/:bookingNumber successfully response");
    res.status(200).json(req.result); 
});

router.get("/query",[queryBookingTickets], (req, res) => {
    res.status(200).json(req.result); 
});

router.post("/check-availability", getAvailableHouses, (req, res) => {
    const availableHousetypes = req.result;
    if (!availableHousetypes || availableHousetypes.length === 0) {
        return res.status(404).json({ message: "No available housetypes for the given criteria." });
    }
    console.log("/check-availability successfully response");
    res.status(200).json(availableHousetypes);
});

router.post("/create-booking", [createBookingMiddleware, houseReserve], (req, res) => {
    res.status(201).json({ message: "Booking created successfully", booking: req.result });
    console.log("/create-booking successfully response");

    const toGuestEmail = req.result.email;
    const emailSubject = "Buchung erstellt erfolgreich";
    const bookingLink = `https://myluxzen.onrender.com/booking/${req.result.bookingNumber}`;
    const text = `Sie haben erfolgreich das Haus ${req.result.houseTitle} gebucht, für den Zeitraum von ${req.result.startDate.toLocaleString()} bis ${req.result.endDate.toLocaleString()} Sie werden bei uns angenehme ${req.result.totalDays}  Tage verbringen. \n
    Ihre Buchungsnummer lautet:${req.result.bookingNumber}.\n
    `;
    // console.log("sendEmailToClient, toGuestEmail",toGuestEmail)
    // console.log("sendEmailToClient, emailSubject",emailSubject)
    // console.log("sendEmailToClient, text",text)
    sendEmailToClient({to: toGuestEmail, subject: emailSubject, text:text, bookingLink: bookingLink})
    .then(() => console.log("Email sent successfully for create booking"))
    .catch(err => console.error("Failed to send email for create booking", err));
});

router.delete("/delete/:bookingNumber", deleteBooking, (req, res) => {
    res.status(201).json({ message: "Booking deleted successfully", booking: req.result });
    console.log("/delete/:bookingNumber successfully response");
});

router.put("/cancel-or-checkout/:bookingNum", [bookingCheckoutOrCancel, houseCheckoutOrCancel], (req, res) => {
    res.status(201).json({ message: "Booking canceledorcheckedout successfully", booking: req.result });
    console.log("/cancel-or-checkout/:bookingNum successfully response");
    if(req.result.status === "Canceled"){
        const toGuestEmail = req.result.email;// add email for cancel email 
        const emailSubject = "Buchung storniert erfolgreich";
        const bookingLink = `https://myluxzen.onrender.com/booking/${req.result.bookingNum}`;
        const text = `Sie haben erfolgreich ${req.result.bookingNum} storniert. \n`;
        // console.log("sendEmailToClient, toGuestEmail",toGuestEmail)
        // console.log("sendEmailToClient, emailSubject",emailSubject)
        // console.log("sendEmailToClient, text",text)
        sendEmailToClient({to: toGuestEmail, subject: emailSubject, text:text, bookingLink:bookingLink})
        .then(() => console.log("Email sent successfully for cancel booking"))
        .catch(err => console.error("Failed to send email for cancel booking ", err));
    }
});

router.use((err, req, res, next)=>{
    res.status(err.status || 400).json({ message: err.message });
});

export { router as bookingRouter };
