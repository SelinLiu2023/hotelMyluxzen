// import { useEffect } from "react";
import DatePicker from "react-datepicker";
export function QueryForm({ handleSearch, formData, setFormData }) { 
    // useEffect(()=>{
    //     console.log("query form data", formData)
    // },[formData]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleStartDateChange = (date) => {
        if (date) {
          date.setHours(14, 0, 0, 0);  // Set time to checkout time 14:00:00
        }
        setFormData(prev => ({
            ...prev,
            queryStartDate: date ? date.toISOString() : null
        }));
    };
    const handleEndDateChange = (date) => {
        if (date) {
            date.setHours(11, 0, 0, 0);  // Set time to checckin time 11:00:00
        }
        setFormData(prev => ({
            ...prev,
            queryEndDate: date ? date.toISOString() : null
            }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(formData); 
    };
    return (
    <div className="bg-white pb-1 rounded-3xl shadow-xl md:flex-row gap-8 items-start mb-10">
        <form onSubmit={handleSubmit} 
            className="space-y-4 px-10 py-2 lg:w-3/5 mx-auto my-10 px-10">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    <span className="text-sm text-gray-400">Buchungsnummer:</span>
                </label>
                <input
                    type="text"
                    name="bookingNum"
                    value={formData.bookingNum}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    <span className="text-sm text-gray-400">Email:</span>
                </label>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none "
                />
            </div>
            <div className="flex justify-between space-x-4">
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                        <span className="text-sm text-gray-400">Vorname:</span>
                    </label>
                    <input
                        type="text"
                        name="guestFirstName"
                        value= {formData.guestFirstName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none "
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                        <span className="text-sm text-gray-400">Nachname:</span>
                    </label>
                    <input
                        type="text"
                        name="guestFamilyName"
                        value={formData.guestFamilyName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none "
                    />
                </div>
            </div>

                <div className="flex justify-between space-x-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                            <span className="text-sm text-gray-400">Haustyp:</span>
                        </label>
                        <select
                            name="houseType"
                            value={formData.houseType}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                        >
                            <option value="">{""}</option>
                            <option value="HouseType1">HouseType1</option>
                            <option value="HouseType2">HouseType2</option>
                            <option value="HouseType3">HouseType3</option>
                            <option value="HouseType4">HouseType4</option>
                            <option value="HouseType5">HouseType5</option>
                        </select>
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                            <span className="text-sm text-gray-400">Zustand:</span>
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none "
                        >
                            <option value="">{""}</option>
                            <option value="Active">Active</option>
                            <option value="CheckedIn">CheckedIn</option>
                            <option value="CheckedOut">CheckedOut</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row w-full justify-start lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className={`bg-white p-1 border border-gray-300 rounded-lg shadow px-4 py-1 lg:flex-1`}>
                    <p className="text-sm text-gray-400">Startdatum</p>
                    <DatePicker
                        selected={formData.queryStartDate}
                        onChange={handleStartDateChange}
                        maxDate={formData.queryEndDate} 
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
                    <div className={`bg-white p-1 border border-gray-300 rounded-lg shadow px-4 py-1 lg:flex-1 `}>

                    <p className="text-sm text-gray-400">Enddatum</p>
                    <DatePicker
                        selected={formData.queryEndDate}
                        onChange={handleEndDateChange}
                        selectsEnd
                        startDate={formData.queryStartDate}
                    //   endDate={parseDate(newBooking.endDate)}
                        minDate={formData.queryStartDate}
                        placeholderText="--"
                        className="text-black font-bold text-xl w-full focus:outline-none"
                        calendarClassName="datePickerCalendar"
                        dateFormat="dd.MM.yyyy" 
                    />
                    </div>
                </div>

            <button 
                type="submit" 
                // className="bg-gray-800 text-white px-4 py-1 rounded-sm cursor-pointer hover:text-[#FAE1A8]"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-teal-dark border border-forest-green text-white font-medium rounded-full cursor-pointer shadow-sm hover:bg-forest-green transition text-sm w-full text-center animate-bounce-on-hover"
            >
                Suchen
            </button>
        </form>
    </div>
    );
}
