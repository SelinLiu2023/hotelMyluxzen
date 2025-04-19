import express from "express";
import { querySingleHouses, houseCheckIn, houseSetBookInfo, getHousesforCheckin, getHousesforReserve, getHouseByNum, houseReservedByAdmin} from "../middlewares/singleHouseMW.js";
import { bookingCheckin } from "../middlewares/bookingMW.js";

const router = express.Router();
router.get("/geHausByNum/:houseNum",[getHouseByNum], (req, res) => {
    res.status(200).json(req.result); 
});
router.post("/checkin-get-houses/:houseType",[houseCheckIn,getHousesforCheckin], (req, res) => {
    res.status(200).json(req.result); 
});
// modified for reserve and checkin different function
router.post("/reserve-get-houses/:houseType",[getHousesforReserve], (req, res) => {
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
