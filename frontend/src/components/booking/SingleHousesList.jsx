import { useState, useEffect } from "react";

export const SingleHousesList = ({houses,setNewBooking,newBooking})=>{
    const [selectedHouseNum, setSelectedHouseNum] = useState(newBooking.houseNum); 
    console.log("SingleHousesList,houses",houses)
    const handleSelectChange = (event) => {
        const houseNum = event.target.value;
        setSelectedHouseNum(houseNum);
        setNewBooking(prev => ({
            ...prev,
            houseNum: houseNum
        }));
    };
    return (
    <div>
        <div className="text-gray-500 border-t border-gray-100 my-2 w-full cursor-pointer "></div>
        <div className="flex">
            <select
                value={selectedHouseNum}
                onChange={handleSelectChange}
                className="bg-white text-gray-600 border border-[#116769] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out w-60 p-2 text-gray-600"
            >
            <option value="" >Bitte ein Haus auswählen</option>
            {houses.map((house) => (
                <option key={house.houseNum} value={house.houseNum}>
                    {house.houseNum}
                </option>
            ))}
            </select>
        </div>
    </div>
    );
}
