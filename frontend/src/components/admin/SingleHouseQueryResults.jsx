import { useState, useMemo } from "react";
import { formatLocalDateWithYear } from "../../utils/commenBookFunc.js";

export function SingleHouseQueryResults({ results, hasMore, onLoadMore, fetchHouse}) {
    const [sortKey, setSortKey] = useState("houseType"); 
    const sortedResults = useMemo(() => {
        return results.slice().sort((a, b) => {
            if (sortKey === "isAvailable") {
                return (b.isAvailable - a.isAvailable);
            }else if (sortKey === "houseType") {
                return a.houseType.localeCompare(b.houseType);
            }
            return 0;
        });
    }, [results, sortKey]);

    return (
    <div className="lg:w-4/5 mx-auto my-10 px-10 py-6 bg-white rounded-3xl shadow-xl overflow-hidden text-gray-600">
        { results.length === 0 ? (
            <p className="text-[#9C785E]">Keine gefunden</p>
        ) : (
            <ul className="flex flex-col space-y-2">
                { sortedResults.map((result, index) => (
                    <li 
                        key={index} 
                        className= {`border border-gray-300 py-1 px-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-black`}
                        onClick={()=>fetchHouse(result.houseNum)}
                    >
                        <p><span className="text-sm text-gray-400">Haus Nummer: </span>{result.houseNum}</p>
                        <p><span className="text-sm text-gray-400">Haustyp: </span>{result.houseType}</p>
                        {/* <p><span className="text-sm text-gray-500">Verfügbar: </span>{result.isAvailable?"Ja":"Nein"}</p> */}
                        { result.bookingNum && (
                            <p><span className="text-sm text-gray-400">Buchung Nummer: </span>{result.bookingNum}</p>
                        )}
                        { result.guestName.length > 0 &&<p><span className="text-sm text-gray-400">Gast Name: </span>{result.guestName}</p>}
                        { result.bookingNum && (
                        <div>
                            <span className="text-gray-400">Gäste CheckedIn</span>
                            <p> {result.bookingNum}</p>
                            <p><span className="text-gray-400 text-sm">Startdatum:</span> {formatLocalDateWithYear(result.startDate)}</p>
                            <p><span className="text-gray-400 text-sm">Enddatum:</span> {formatLocalDateWithYear(result.endDate)}</p>
                        </div>
                        )}
                        { result.bookingReservePeriods.length > 0 && (
                            <div>
                                <span className="text-gray-400 underline">
                                    Reserviert von Gäste : 
                                </span>
                                <ul>
                                    { result.bookingReservePeriods.map((booking)=>(
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
                        { result.inUsePeriods.length > 0 && (
                            <div>
                                <span className="text-gray-400 underline">
                                    Reserviert von Admin
                                </span>
                                <ul>
                                { result.inUsePeriods.map((inUse,index)=>(
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
                    </li>
                    ))}
            </ul>
        )}
        { hasMore && (
            <button onClick={onLoadMore} className=" mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-teal-dark border border-forest-green text-white font-medium rounded-full cursor-pointer shadow-sm hover:bg-forest-green transition text-sm w-full text-center animate-bounce-on-hover">
                Weiterleitung
            </button>
        )}
    </div>
    );
}

