import { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import { MdOutlineEuro } from "react-icons/md";
import { Summery } from "./Summery";
export const SummeryBar = ({ newBooking })=>{
    const { houseType, guestFirstName, guestFamilyName, email, guestCount, startDate, endDate, price,mobileNumber, comments } = newBooking;
    const [showCompleteSummery,setShowCompleteSummery] = useState(false);
    const calculateTotalPrice = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const msPerDay = 1000 * 3600 * 24;
        const days = Math.round((end - start) / msPerDay); 
        const totalPrice = days * price;
        return totalPrice.toFixed(2); 
    };
    const handleOnClick = ()=>{
        setShowCompleteSummery(prev=> !prev);
    };
    return (
    <div className="flex flex-col text-base text-gray-700 mb-1">
        <div className={`flex gap-1 ${showCompleteSummery ? "slide-up" : "slide-down"} bg-gray-100 shadow pb-2`}>
            <Summery newBooking={newBooking} completed={false} />
            <div className="relative px-6 flex-1">
                <button 
                    onClick={handleOnClick} 
                    className="absolute top-0 right-0 px-4 text-2xl font-bold cursor-pointer hover:text-[#116769]"
                >
                    <RiArrowDownSLine /> 
                </button>
            </div>
        </div>
        { !showCompleteSummery &&  (      
            <div className={`flex ${showCompleteSummery ? "slide-down" : "slide-up"} justify-between bg-gray-100 shadow py-2`}>
                <div className="flex justify-between flex-10 px-2">
                    <div className="text-lg font-bold">
                        Summary
                    </div>
                    <div className="flex items-center text-lg font-bold">
                        <MdOutlineEuro />
                        {calculateTotalPrice()}
                    </div>
                </div>
                <div className="relative flex-1">
                    <button 
                        onClick={handleOnClick} 
                        className="absolute top-0 px-4 right-0 text-2xl font-bold cursor-pointer hover:text-[#116769]"
                    >
                        <RiArrowUpSLine />
                    </button>
                </div>
            </div>
        )}
    </div>
    );
};
