import { useState, useEffect } from "react";
import {ContactForm} from "./ContactForm";

export const Contact = ({ newBooking, setNewBooking, gotoNextStep, setStepCompleted,setGotoNextStep })=>{
    const [errEmail, setErrorEmail] = useState(false);
    const [errFirstName, setErrorFirstName] = useState(false);
    const [errLastName, setLastName] = useState(false);
    useEffect(()=>{
        if(gotoNextStep=== true){
            //varify if important information has been inputed
            if(newBooking.email === "" || newBooking.guestFirstName ==="" || newBooking.guestFamilyName ==="" ){
                setErrorEmail(newBooking.email === "");
                setErrorFirstName(newBooking.guestFirstName ==="");
                setLastName(newBooking.guestFamilyName ==="");
                setStepCompleted(false);
                setGotoNextStep(false);
            }else{
                setStepCompleted(true);
                setGotoNextStep(false);
            }
        }
    },[gotoNextStep]);
    return (
    <div >
        <div className="text-2xl mb-4 text-gray-700 font-bold">
            Ihre Kontaktdaten
        </div>
        <ContactForm 
            newBooking={newBooking} 
            setNewBooking={setNewBooking}
            errEmail={errEmail} 
            errFirstName={errFirstName} 
            errLastName={errLastName}>
        </ContactForm>
    </div>
    );
};
