import { useState } from "react";
import { AdminReserveForm } from "./AdminReserveForm";
import { formatLocalDateWithYear } from "../../utils/commenBookFunc.js";

export function SingleHouseCard({ house, setHouseData, onClose }) {
    // console.log("SingleHouseCard , house",house)
    const [showAdminReserveForm, setShowAdminReserveForm] = useState(false);
    const [inUsePeriods, setInUsePeriods] = useState(house.inUsePeriods);
    const handleAdminReserve = () => {
        setShowAdminReserveForm(true);
    };
    const handleAdminReserveConfirm = async ()=>{
        try {
            const requestBody = {
                inUsePeriods:inUsePeriods
            };
            console.log("handleCheckOut,requestBody", requestBody);
            const url = `${import.meta.env.VITE_SERVER_URL}/singleHouse/admin-reserve/${house.houseNum}`;
            // const url = `http://localhost:3000/singleHouse/admin-reserve/${house.houseNum}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });
            setShowAdminReserveForm(false);
            if (!response.ok) throw new Error("canceled failed");
        } catch (err) {
            // setError("VerFügbar Häuser nicht gefunden.");
            console.log("handleCancel, error", err)
        }
    }
    return (
    <>
        <div className="py-2 px-10 text-gray-600">
            { house ? (
                <div className="border border-gray-300 p-2 rounded-lg">
                    <p><span className="text-gray-400 text-sm">Haus Nummer: </span> {house.houseNum}</p>
                    <p><span className="text-gray-400 text-sm">Haus Type: </span>{house.houseType}</p>
                    { house.bookingNum && (
                        <div>
                            <span className="text-gray-400">Gäste CheckedIn</span>
                            <p> {house.bookingNum}</p>
                            <p><span className="text-gray-400 text-sm">Startdatum:</span> {formatLocalDateWithYear(house.startDate)}</p>
                            <p><span className="text-gray-400 text-sm">Enddatum:</span> {formatLocalDateWithYear(house.endDate)}</p>
                        </div>
                    )}
                    { house.bookingReservePeriods.length > 0 && (
                        <div>
                            <span className="text-gray-400 text-sm underline">Reserviert von Gäste : </span>
                            <ul>
                            { house.bookingReservePeriods.map((booking)=>(
                                    <li key={booking.bookingNum} >
                                        <p><span className="text-gray-400 text-sm">Buchungsnummer: </span>{booking.bookingNum}</p>
                                        <p><span className="text-gray-400 text-sm">Zeitraum: </span>
                                        {formatLocalDateWithYear(booking.startDate)}  
                                        <span className="text-gray-400 text-sm"> bis </span>
                                        {formatLocalDateWithYear(booking.endDate)}</p>
                                    </li>
                                ))
                            }
                            </ul>
                        </div>
                    )}
                    { house.inUsePeriods.length > 0 && (
                        <div>
                            <span className="text-gray-400 text-sm underline">
                                Reserviert von Admin
                            </span>
                            <ul>
                            { house.inUsePeriods.map((inUse,index)=>(
                                    <li key={index} className="">
                                        <p><span className="text-sm, text-gray-400">Grund:</span>{inUse.reason}</p>
                                        <p><span>Zeitraum:</span>{formatLocalDateWithYear(inUse.startDate)} bis  
                                        {formatLocalDateWithYear(inUse.endDate)}</p>
                                    </li>
                                ))
                            }
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <p>Haus nicht gefunden.</p>
            )}

            <div className="mt-10 mb-4 flex space-x-6">
                <button 
                    onClick={handleAdminReserve} 
                    className="bg-teal-dark text-white px-4 rounded-full cursor-pointer hover:text-[#FAE1A8]"
                >
                    Admin Reservieren 
                </button>
                <button 
                    onClick={onClose} 
                    className="bg-teal-dark text-white px-4 rounded-full cursor-pointer hover:text-[#FAE1A8]"
                >
                    Schließen
                </button>
            </div>
        </div> 

        { showAdminReserveForm && (    
            <div>
                <AdminReserveForm 
                    inUsePeriods={inUsePeriods} 
                    setInUsePeriods={setInUsePeriods} 
                    onClose={()=>setShowAdminReserveForm(false)} 
                    handleAdminReserveConfirm={handleAdminReserveConfirm}
                />
            </div>
        )}
    </>
    );
}
