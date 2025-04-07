import { useState } from "react";
import {SingleBookingTicket} from "../components/admin/SingleBookingTicket"; 

export function AdminBookingTicketPage() {
    const [bookingNumber, setBookingNumber] = useState("");
    const [bookingData, setBookingData] = useState(null);
    const [error, setError] = useState("");
    const [showDetails, setShowDetails] = useState(false);
    const fetchBooking = async () => {
        try {
            if(bookingNumber==="") {
                throw new Error("Bitte füllen Buchungsnummer ein.");
            }
            const url = `${import.meta.env.VITE_SERVER_URL}/booking/byBookingNum/${bookingNumber}`;
            // const url = `http://localhost:3000/booking/byBookingNum/${bookingNumber}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Buchung Number nicht gefunden.");
            const data = await response.json();
            if(data === null){
                throw new Error("Kein Buchungsticket gefunden");
            }
            setBookingData(data);
            setShowDetails(true);
            setError("");
        } catch (err) {
            setError(err.message);
            setBookingData(null);
            setShowDetails(false);
        }
    };
    return (
    <div className="py-4 px-10 ">
        { !showDetails ? (
        <div className="flex flex-col space-y-6 py-2">
            <div className="flex space-x-6">
                <label htmlFor="bookingNumber">Buchung Number:</label>
                <input
                    type="text"
                    id="bookingNumber"
                    value={bookingNumber}
                    onChange={(e) => setBookingNumber(e.target.value)}
                    placeholder="Buchung Number eingeben"
                    className="border border-gray-300 px-2 rounded-sm"
                />
                <button onClick={fetchBooking}
                className="bg-gray-800 text-white px-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]">Suchen</button>
            </div>
            { error && <p>{error}</p> }
        </div>
        ) : (
            <SingleBookingTicket 
                singleBooking={bookingData}
                onClose={() => setShowDetails(false)}
            />
        )}
    </div>
    );
}

