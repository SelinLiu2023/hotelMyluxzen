import { IoMdInformationCircleOutline } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineEuro } from "react-icons/md";
import { formatLocalDateWithYear } from "../../utils/commenBookFunc.js";

export const Summery = ({ newBooking, completed })=>{
    return (
    <div className="bg-white w-full p-4 border rounded-lg shadow border-gray-300 text-gray-500 max-h-[70vh] overflow-y-auto md:max-h-none md:overflow-visible">
        <div className="text-xl py-2 text-gray-700 font-bold">
            Summary
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        { newBooking.houseType ? (
            <>
            { completed && (
                <div>
                    <div className="text-gray-700 flex flex-col pt-4 flex justify-between">
                    <p>Buchungs-Ticketnummer : </p>
                    <p> {newBooking.bookingNumber}</p>
                    </div>
                    <div className="border-t border-gray-200 my-4"></div>
                </div>
            )}
            <div className="flex justify-between items-center my-2">
                <div>{newBooking.houseTitle}</div>
                { newBooking.houseNum && (
                    <div className="flex space-x-2">
                        <p>Hausnummer: </p>
                        <p>{newBooking.houseNum}</p>
                    </div>
                )}
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="text-gray-700">Datum: </div>
            { (newBooking.startDate && newBooking.endDate ) && (
                <div>
                    <div className="flex justify-between">
                        <div>{formatLocalDateWithYear(newBooking.startDate)} - {formatLocalDateWithYear(newBooking.endDate)}</div>
                    </div>
                    <p>{ newBooking.totalDays} {newBooking.totalDays === 1 ? "Tag" : "Tage" }</p>
                    <p><span className="text-sm">Check in Uhrzeit: </span>14:00</p>
                    <p><span className="text-sm">Check out Uhrzeit: </span>11:00</p>
                </div>
            )}
            <div className="text-gray-700">{newBooking.guestCount} Gast{newBooking.guestCount > 1 ? "e" : ""}</div>
            <div className="border-t border-gray-200 my-4"/>
            <div className="break-words overflow-wrap max-w-100">
                <p className="text-gray-700">Gastinformationen: </p>
                <div className="flex items-center">
                    <p className="pr-2">{newBooking.guestFirstName}</p>
                    <p>{newBooking.guestFamilyName}</p>
                </div>
                <p>{newBooking.email}</p>
                <p>{newBooking.mobileNumber}</p>
                <p>{newBooking.comments}</p>
            </div>
            <div className="border-t border-gray-200 my-4"/>
            <div className="flex justify-between items-center">
                <p>Price: </p>
                <div className="flex items-center"><MdOutlineEuro />{newBooking.price} per Nacht </div>
            </div>
            <div className="text-xl py-2 text-gray-700 font-bold flex justify-between items-center">
                <p>Gesamtpreis: </p>
                <div className="flex items-center"><MdOutlineEuro />{newBooking.totalPrice} </div>
            </div>
            <div> 
                (inklusive Steuern)
            </div>
        </>
        ) : (
        <>
            <div className="text-gray-500">Kein Haus ausgewählt</div>
            <div className="flex items-center p-4 rounded-lg text-gray-500">
                <div className="rounded-lg p-1 bg-gray-200">
                    <CiImageOn size={24}/>
                </div>
                <p className="ml-4">Kein Haus ausgewählt</p>
            </div>
            <div className="border-t border-gray-200 my-4"/>
            <div className="flex items-center p-4 bg-[#E8F3FE] rounded-lg text-gray-500">
                <div className="rounded-full p-2">
                    <IoMdInformationCircleOutline size={24} />
                </div>
                <p className="ml-4">Sie werden die Zusammenfassung sehen, nachdem Sie im Schritt "Häuser" ein Haus ausgewählt haben.</p>
            </div>
        </>
        )}
    </div>
    );
};
