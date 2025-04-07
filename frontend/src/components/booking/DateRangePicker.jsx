import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/booking.css";
import { RxCrossCircled } from "react-icons/rx";

export function DateRangePicker({ newBooking, setNewBooking, errStartDate, errEndDate, focusedField, setFocusedField }) {
  const parseDate = (date) => {
    return date && date !== "" ? new Date(date) : null;
  };
  const calculateTotalDays = (booking) => {
    if (booking.startDate===null || booking.endDate===null) return 0;
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const msPerDay = 1000 * 3600 * 24;
    const days = Math.round((end - start) / msPerDay); 
    return days; 
  };
  const handleStartDateChange = (date) => {    
    if (date) {
      date.setHours(14, 0, 0, 0);  // Set time to 14:00:00
    }
    setNewBooking(prev => {
      const newBooking = {
        ...prev,
        startDate: date ? date.toISOString() : null
      };
      return {
        ...newBooking,
        totalDays: calculateTotalDays(newBooking) 
      };
    });
  };
  const handleStartDateClear = ()=>{
    setNewBooking(prev => ({
        ...prev,
        startDate: null
      }));
  }
  useEffect(()=>{
    if(!newBooking.startDate || newBooking.startDate > newBooking.endDate){
      setNewBooking(prev => ({
        ...prev,
        endDate: null,
        totalDays : 0
      }));
    }

  },[newBooking.startDate])
  const handleEndDateChange = (date) => {
    if (date) {
      date.setHours(11, 0, 0, 0);  // Set time to 11:00:00
    }
    setNewBooking(prev => {
      const newBooking = {
        ...prev,
        endDate: date ? date.toISOString() : null
      };
      return {
        ...newBooking,
        totalDays: calculateTotalDays(newBooking)
      };
    });
  };
  const handleEndDateClear = ()=>{
    setNewBooking(prev => ({
        ...prev,
        endDate: null,
        totalDays: 0
      }));
  }
  const handleFocus = (name) => {
    setFocusedField(name);
  };

  return (
  <div className="flex flex-col lg:flex-row w-full justify-start lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
    <div 
      onFocus={() => handleFocus("startDate")} 
      className={`bg-white p-1 border rounded-lg shadow px-4 py-1 lg:flex-1 ${focusedField === "startDate"  ? "border-gray-700" : (errStartDate ? "border-[#9C785E] " : "border-gray-300")}`} 
    >
      <p className="text-sm text-gray-500">Check-In</p>
      <div className="flex justify-between gap-2">
        <DatePicker
          selected={parseDate(newBooking.startDate)}
          onChange={handleStartDateChange}
          selectsStart
          startDate={parseDate(newBooking.startDate) || new Date()}
          endDate={parseDate(newBooking.endDate)}
          minDate={new Date()}
          // maxDate={parseDate(newBooking.endDate)}
          placeholderText="--"
          className="text-black font-bold text-xl w-full focus:outline-none"
          calendarClassName="datePickerCalendar"
          dateFormat="dd.MM.yyyy" 
        />
        <button
          type="button"
          onClick={handleStartDateClear}
          className=" text-gray-300 hover:text-gray-500 focus:outline-none cursor-pointer"
        >
            <RxCrossCircled />
        </button>
      </div>
    </div>
    <div 
      onFocus={() => handleFocus("endDate")} 
      className={`bg-white p-1 border rounded-lg shadow px-4 py-1 lg:flex-1 ${focusedField === "endDate"  ? "border-gray-700" : (errEndDate ? "border-[#9C785E] " : "border-gray-300")}`} 
    >
      <p className="text-sm text-gray-500">Check-out</p>
      <div className="flex justify-between gap-2">
        <DatePicker
          selected={parseDate(newBooking.endDate)}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={parseDate(newBooking.startDate)}
          endDate={parseDate(newBooking.endDate)}
          minDate={newBooking.startDate ? new Date(newBooking.startDate) : new Date()}
          placeholderText="--"
          className="text-black font-bold text-xl w-full focus:outline-none"
          calendarClassName="datePickerCalendar"
          dateFormat="dd.MM.yyyy" 
        />
        <button
          type="button"
          onClick={handleEndDateClear}
          className=" text-gray-300 hover:text-gray-500 focus:outline-none cursor-pointer"
        >
            <RxCrossCircled />
        </button>
      </div>
    </div>
  </div>
  );
}
