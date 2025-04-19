import { useState, useEffect } from "react";
import { DateRangePicker } from "./DateRangePicker";
import { GuestPicker } from "./GuestPicker";

export const DateSelect = ({ newBooking, setNewBooking, gotoNextStep, setStepCompleted,setGotoNextStep })=>{
    const [dateErrorMsg, setDateErrorMsg] = useState("");
    const [errStartDate, setErrStartDate] = useState(false);
    const [errEndDate, setEndStartDate] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    useEffect(()=>{
        if(gotoNextStep=== true){
            //varify if important information has been inputed
            if(newBooking.startDate === null || newBooking.endDate===null){
                setDateErrorMsg("Arrival and departure dates are required");
                setErrStartDate(newBooking.startDate===null);
                setEndStartDate(newBooking.endDate===null);
                setStepCompleted(false);
                setGotoNextStep(false);
            }else{
                setDateErrorMsg("");
                setErrStartDate(false);
                setEndStartDate(false);
                setStepCompleted(true);
                setGotoNextStep(false);
                console.log("go to next step")
            }
        }
    },[gotoNextStep]);
    useEffect(()=>{
        console.log("focusedField",focusedField);
    },[focusedField]);
    return (
    <div>
        <div className="text-2xl mb-4 text-gray-700 font-bold">
            Datum
        </div>
        <div className="w-full space-y-4">
            <DateRangePicker 
                newBooking={newBooking} 
                setNewBooking={setNewBooking} 
                errStartDate={errStartDate} 
                errEndDate={errEndDate} 
                focusedField={focusedField} 
                setFocusedField={setFocusedField}
                className="flex-1"
            />
            {
                dateErrorMsg !== "" ? (
                <p className="text-[#9C785E] text-sm">{dateErrorMsg}</p>
                ) : (
                <p className="text-transparent text-sm">Placeholder</p>
            )}
            <GuestPicker 
                newBooking={newBooking} 
                setNewBooking={setNewBooking} 
                focusedField={focusedField} 
                setFocusedField={setFocusedField}
                className="flex-1"
            />
        </div>
    </div>
    );
};
