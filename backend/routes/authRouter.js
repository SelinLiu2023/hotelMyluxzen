//Naheeda
import { Router } from "express";
import { registerUser, authUser, logoutUser, getUserProfile, updateUserProfile, 
    getUserBookings, cancelUserBooking,adminCheck, googleAuth, googleCallback, googleAuthSuccess, logoutAndRedirectToGoogle} from "../middlewares/authMW.js";
import {protect} from "../utils/generateToken.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get("/me", protect, getUserProfile);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.get("/my-bookings", protect, getUserBookings);
router.put("/cancel-booking/:bookingNumber", protect, cancelUserBooking);
router.get("/admin-dashboard", adminCheck, (req, res) => {
res.json({ message: "Willkommen im Admin-Dashboard!" });
    })
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback, googleAuthSuccess);
router.get("/logout-and-google", logoutAndRedirectToGoogle);
      
//  Zentrale Fehlerbehandlung
router.use((err, req, res, next) => {
    res.status(err.status || 400).json({ message: err.message });
});

export { router as authRouter };
