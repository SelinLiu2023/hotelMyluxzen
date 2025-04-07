import { useState, useEffect } from "react";
import { QueryForm } from "../components/admin/QueryForm";
import { QueryResults } from "../components/admin/QueryResults";
import { SingleBookingTicket } from "../components/admin/SingleBookingTicket";
import { Modal } from "../components/admin/Modal";

export const AdminBookingQueryPage = ()=>{
    const [query, setQuery] = useState(null);
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [bookingData, setBookingData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showQueryResults, setShowQueryResult] = useState(false);
    const [formData, setFormData] = useState({
        bookingNum: "",
        email: "",
        guestFirstName: "",
        guestFamilyName: "",
        houseType:"",
        queryStartDate: "",
        queryEndDate: "",
        status: ""
    });
    // useEffect(()=>{
    //     console.log("AdminBookingQueryPage bookingData", bookingData);
    // },[bookingData]);
    const fetchResults = async (query, page = 1) => {
        const params = new URLSearchParams({
            ...query, 
            page  
        });
        const url = `${import.meta.env.VITE_SERVER_URL}/booking/query?${params.toString()}`;
        // const url = `http://localhost:3000/booking/query?${params.toString()}`;
        const response = await fetch(url);
        if(!response.ok){
            setResults([]);
            return;
        }
        let data = await response.json();
        if(data.length === 0){
            setResults([]);
            return;
        }
        // console.log("fetchResults received query old bookings",data.bookingTickets)
        setResults(prev => page === 1 ? data.bookingTickets : [...prev, ...data.bookingTickets]);
        setHasMore(data.hasMore);
        setPage(page);
    };
    const fetchBooking = async (bookingNumber) => {
        try {
            console.log("fetchBooking, bookingNumber",bookingNumber);
            const url = `${import.meta.env.VITE_SERVER_URL}/booking/bybookingnum/${bookingNumber}`;
            // const url = `http://localhost:3000/booking/bybookingnum/${bookingNumber}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // console.log("fetchBooking, response",response);
            if (!response.ok) throw new Error("Buchung ticket nicht gefunden.");
            const booking = await response.json();
            // console.log("fetchBooking, booking",booking);
            setBookingData(booking);
            setShowDetails(true);
        } catch (err) {
            console.log("fetchBooking, error", err)
            setBookingData(null);
            setShowDetails(false);
        }
    };
    const handleSearch = (formData) => {
        setQuery(formData);
        fetchResults(formData, 1);
        setShowQueryResult(true);
    };
    const handleLoadMore = () => {
        fetchResults(query, page + 1);
    };
    const handleClose = () => setShowDetails(false);
    useEffect(()=>{
        console.log("showDetails",showDetails)
    })
    return (
    <div>
        <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
            Buchungsverhandlung
        </h2>
        <div >
            <QueryForm 
                handleSearch={handleSearch} 
                formData={formData} 
                setFormData={setFormData}
            />
            { showQueryResults && 
                <QueryResults results={results} 
                    hasMore={hasMore} 
                    onLoadMore={handleLoadMore} 
                    fetchBooking={fetchBooking}
                />
            }
            <Modal isOpen={showDetails} 
                onClose={handleClose}>
                <SingleBookingTicket 
                    singleBooking={bookingData} 
                    setBookingData={setBookingData} 
                    onClose={handleClose}
                />
            </Modal>
        </div>
    </div>
    );
}
