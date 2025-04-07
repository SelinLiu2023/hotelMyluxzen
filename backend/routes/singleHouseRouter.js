import express from "express";
import { querySingleHouses, houseCheckIn, houseSetBookInfo, getHousesforCheckinOrReserve, getHouseByNum, houseReservedByAdmin} from "../middlewares/singleHouseMW.js";
import { bookingCheckin } from "../middlewares/bookingMW.js";

const router = express.Router();
router.get("/geHausByNum/:houseNum",[getHouseByNum], (req, res) => {
    res.status(200).json(req.result); 
});
router.post("/checkin-get-houses/:houseType",[houseCheckIn,getHousesforCheckinOrReserve], (req, res) => {
    res.status(200).json(req.result); 
});
router.post("/reserve-get-houses/:houseType",[getHousesforCheckinOrReserve], (req, res) => {
    res.status(200).json(req.result); 
});
router.put("/admin-reserve/:houseNum",[houseReservedByAdmin], (req, res) => {
    res.status(200).json(req.result); 
});
router.get("/query",[querySingleHouses], (req, res) => {
    res.status(200).json(req.result); 
});
router.put("/house-checkin/:houseNum", [houseSetBookInfo,bookingCheckin], (req, res) => {
    res.status(200).json(req.result); 
});
router.use((err, req, res, next)=>{
    res.status(err.status || 400).json({ message: err.message });
});
export { router as singleHouseRouter };
