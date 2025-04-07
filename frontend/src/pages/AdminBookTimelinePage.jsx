import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { BookingTimeline } from "../components/admin/BookingTimeline";

export const AdminBookTimelinePage = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [houseType, setHouseType] = useState("");
    const [orders, setOrders] = useState([]);
    const [searched, setSearched] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    // useEffect(()=>{
    //     console.log("AdminBookTimelinePage , startDate",startDate)
    //     console.log("AdminBookTimelinePage , endDate",endDate)
    //     console.log("AdminBookTimelinePage , houseType",houseType)
    // },[startDate,endDate,houseType]);

    const handleSearch = async() => {
        console.log("handleSearch")
        // setOrders([]);
        if(!startDate || !endDate || !houseType){
            setErrMsg("Bitte alle Parameters einfüllen");
            return;
        }
        const params = new URLSearchParams({
            queryStartDate: startDate,
            queryEndDate: endDate,
            houseType: houseType,
            status: "ActiveOrCheckedIn",
            setLimit: 1000
        });
        const url = `${import.meta.env.VITE_SERVER_URL}/booking/query?${params.toString()}`;
        // const url = `http://localhost:3000/booking/query?${params.toString()}`;
        // console.log("Requesting URL:", url);
        const response = await fetch(url);
        if(!response.ok){
            setOrders([]);
            setSearched(false);
            setErrMsg("Keine gefunden");
            return;
        }
        let data = await response.json();
        if(data.bookingTickets.length === 0){
            setOrders([]);
            setSearched(false);
            setErrMsg("Keine gefunden");
            return;
        }
        // console.log("AdminBookTimelinePage query data",data)
        setOrders(data.bookingTickets);
        setSearched(true);
        setErrMsg("");

    };
    const handleStartDateChange = (date) => {
        //  console.log("datapicker, handleStartDateChange",)
        if (date) {
            date.setHours(11, 0, 0, 0);  // Set time to 11:00:00
        }
        setStartDate(date ? date.toISOString() : null);
    };
    const handleEndDateChange = (date) => {
        if (date) {
            date.setHours(14, 0, 0, 0);  // Set time to 14:00:00
        }
        setEndDate(date ? date.toISOString() : null);
    };
    return (
    <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-3xl shadow-xl flex flex-col  gap-8 items-start mb-10">

            {/* input house type */}
            <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                    <span className="text-sm text-gray-400">Haustyp:</span>
                </label>
                <select
                    name="houseType"
                    value={houseType}
                    onChange={(e) => setHouseType(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">{""}</option>
                    <option value="HouseType1">HouseType1</option>
                    <option value="HouseType2">HouseType2</option>
                    <option value="HouseType3">HouseType3</option>
                    <option value="HouseType4">HouseType4</option>
                    <option value="HouseType5">HouseType5</option>
                </select>
            </div>

            {/* input required period */}
            <div className="flex flex-col lg:flex-row w-full justify-start lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                <div className={`bg-white p-1 border rounded-lg shadow px-4 py-1 lg:flex-1 border-gray-300`}>
                    <p className="text-sm text-gray-400">Startdatum</p>
                    <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        maxDate={endDate} 
                        selectsStart
                    //   startDate={parseDate(newBooking.startDate) || new Date()}
                    //   endDate={parseDate(newBooking.endDate)}
                    //   minDate={new Date()}
                        placeholderText="--"
                        className="text-black font-bold text-xl w-full focus:outline-none"
                        calendarClassName="datePickerCalendar"
                        dateFormat="dd.MM.yyyy"
                    />
                </div>
                <div className={`bg-white p-1 border rounded-lg shadow px-4 py-1 lg:flex-1 border-gray-300`}>
                    <p className="text-sm text-gray-400">Enddatum</p>
                    <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        selectsEnd
                        // startDate={startDate}
                    //   endDate={parseDate(newBooking.endDate)}
                        minDate={startDate}
                        placeholderText="--"
                        className="text-black font-bold text-xl w-full focus:outline-none"
                        calendarClassName="datePickerCalendar"
                        dateFormat="dd.MM.yyyy"
                    />
                </div>
            </div>
            
            <button onClick={handleSearch} 
            // className="bg-gray-800 text-white px-4 py-1 rounded-sm cursor-pointer hover:text-[#FAE1A8] w-20"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-teal-dark border border-forest-green text-white font-medium rounded-full cursor-pointer shadow-sm hover:bg-forest-green transition text-sm w-full text-center animate-bounce-on-hover"
            >
                Suchen
            </button>

            {errMsg !== "" && (
                <div><p className="text-[#9C785E]">{errMsg}</p></div>
            )}
        </div>
        {(searched && errMsg=== "") && (
            <BookingTimeline orders={orders} startDate={startDate} endDate={endDate} />
        )}
    </div>
    );
};

