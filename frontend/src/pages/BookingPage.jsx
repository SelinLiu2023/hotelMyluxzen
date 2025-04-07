import { useState, useEffect, useContext } from "react";
import { DateSelect } from "../components/booking/DateSelect";
import { HouseSelect } from "../components/booking/HouseSelect";
import { Contact } from "../components/booking/Contact";
import { Payment } from "../components/booking/Payment";
import { ProcessBar } from "../components/booking/ProcessBar";
import { ButtonBar } from "../components/booking/ButtonBar";
import { SummeryBar } from "../components/booking/SummaryBar";
import { Summery } from "../components/booking/Summery";
import { SuccessBooking } from "../components/booking/SuccessBooking";
import AuthContext from "../context/AuthContext";
import { BookingNavBar } from "../components/booking/BookingNavBar";
import { v4 as uuidv4 } from 'uuid';

export const BookingPage = ()=>{
    const [gotoNextStep, setGotoNextStep] = useState(false);
    const [isStepCompleted, setStepCompleted] = useState(false);
    const [step, setStep] = useState(1);
    const [newBooking, setNewBooking] = useState({});
    const [successBookingNumber, setSuccessBookingNumber] = useState("");
    const totalSteps = 4;
    const {user} = useContext(AuthContext);
    const [loadingBookingTicket, setLoadingBookingTicket] = useState(false);

    useEffect(()=>{
        if(user !== null){
            const initState = {
                // bookingNumber: `BOOK${Math.floor(1000 + Math.random() * 9000)}`, 
                bookingNumber: `B${uuidv4()}`,
                guestFirstName : user !== null ?user.vorname : "",
                guestFamilyName: user !== null ?user.nachname : "",
                email: user !== null ?user.email : "",
                guestCount: 1,
                startDate: null,
                endDate: null,
                houseType:"",
                price: "",
                mobileNumber: user !== null ?user.telefonnummer : "",
                //xiangyu, telef von AuthContext
                comments:"",
                houseNum: "",
                totalPrice: 0,
                totalDays:0
            };
            setNewBooking(initState);
        }else{
            const initState = {
                // bookingNumber: `BOOK${Math.floor(1000 + Math.random() * 9000)}`, 
                bookingNumber: `B${uuidv4()}`,
                guestFirstName : "",
                guestFamilyName: "",
                email: "",
                guestCount: 1,
                startDate: null,
                endDate: null,
                houseType:"",
                price: "",
                mobileNumber: "",
                comments:"",
                houseNum: "",
                totalPrice: 0,
                totalDays:0,
                houseTitle:""
            };
            setNewBooking(initState);
        }
        // console.log("useContext, user",user);
    },[user]);
    useEffect(()=>{
        if(isStepCompleted===true){
            setStep(prev=>prev + 1);
            setStepCompleted(false);
        }
    },[isStepCompleted]);
    // useEffect(()=>{
    //     console.log("newBooking changed", newBooking);
    // },[newBooking]);
    const setNextStep = async () => {
        if (step < totalSteps) {
            setGotoNextStep(true); 
        } else {//last step, send API and create booking ticket 
            try {
                setLoadingBookingTicket(true);
                const url = `${import.meta.env.VITE_SERVER_URL}/booking/create-booking`;
                // console.log(".env urlTest", url);
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...newBooking,
                        status: "Active",
                    }),
                });
                if (!response.ok) {
                    throw new Error("Failed to create booking");
                }
                const result = await response.json();
                console.log("Booking created successfully:", result);
                setSuccessBookingNumber(result.booking.bookingNumber);
                setLoadingBookingTicket(false);

            } catch (error) {
                console.error("Error creating booking:", error);
            }
        }
    };
    const setPrevStep = ()=>{
        setStepCompleted(false);
        setStep(prev=>prev - 1);
    };
    return (
    <div>
        <BookingNavBar/>
        {(successBookingNumber==="" && !loadingBookingTicket) ? (
            <div>
                <div className="pb-10 lg:px-6">
                    <ProcessBar step={step} setStep={setStep}/>
                    <div  className="py-10 px-12 overflow-auto">
                        <div onClick={e => e.stopPropagation()}
                            className="flex lg:flex-row w-full lg:space-x-10 min-h-screen"
                        >
                            <div className="lg:w-3/5 w-full">
                                { step === 1 && (
                                    <DateSelect 
                                        gotoNextStep={gotoNextStep} 
                                        setStepCompleted={setStepCompleted} 
                                        setGotoNextStep={setGotoNextStep} 
                                        newBooking={newBooking} 
                                        setNewBooking={setNewBooking}
                                    />
                                )}
                                { step === 2 && (
                                    <HouseSelect 
                                        gotoNextStep={gotoNextStep} 
                                        setStepCompleted={setStepCompleted} 
                                        setGotoNextStep={setGotoNextStep} 
                                        newBooking={newBooking} 
                                        setNewBooking={setNewBooking}
                                    />
                                )}
                                { step === 3 && (
                                    <Contact 
                                        gotoNextStep={gotoNextStep} 
                                        setStepCompleted={setStepCompleted} 
                                        setGotoNextStep={setGotoNextStep} 
                                        newBooking={newBooking} 
                                        setNewBooking={setNewBooking}
                                    />
                                )}
                                { step === 4 && (
                                    <Payment 
                                        gotoNextStep={gotoNextStep} 
                                        setStepCompleted={setStepCompleted} 
                                        setGotoNextStep={setGotoNextStep} 
                                        newBooking={newBooking} 
                                        setNewBooking={setNewBooking}
                                    />
                                )}
                            </div>
                            <div className="hidden lg:block w-full lg:w-2/5 ">
                                <Summery newBooking={newBooking} completed={false}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-14 w-full block lg:hidden py-1">
                    <SummeryBar  newBooking={newBooking} />
                </div>
                <div className="fixed bottom-0 w-full bg-gray-100 shadow pb-4 lg:py-4 px-4 space-y-2">
                <ButtonBar 
                    step={step} 
                    setPrevStep={setPrevStep} 
                    setNextStep={setNextStep}
                />
            </div>
        </div>
        ) : ( !loadingBookingTicket ? (
            <SuccessBooking successBookingNumber={successBookingNumber}/>
            ) : (
            <div ><p>Buchungsticket erstellen....</p></div>
            )
        )}
    </div>
    );
};
