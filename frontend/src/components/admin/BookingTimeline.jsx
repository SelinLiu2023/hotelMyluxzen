import { formatLocalDate, normalizeDate, formatLocalDateWithYear } from "../../utils/commenBookFunc";

export const BookingTimeline = ({ orders, startDate, endDate }) => {
    const queryStart = normalizeDate(new Date(startDate)).getTime();
    const queryEnd = normalizeDate(new Date(endDate)).getTime();
    const queryDuration = queryEnd - queryStart;
    // console.log("BookingTimeline,orders", orders);
    return (
    <div className="bg-gray-200 py-6 px-12 rounded w-full mx-auto shadow-xl rounded-md">
        <div className="text-center font-bold mb-2 flex gap-4 justify-between">
            <span>{formatLocalDateWithYear(startDate)}</span>
            <span>bis</span>  
            <span>{formatLocalDateWithYear(endDate)}</span>
        </div>
        <div className="relative bg-gray-300 py-4 rounded flex flex-col gap-4 rounded-md">
            {orders.map((order, index) => {
                const start = normalizeDate(order.startDate).getTime();
                const end = normalizeDate(order.endDate).getTime();

                let offset = ((start - queryStart) / queryDuration) * 100;
                let width = ((end - start) / queryDuration) * 100;
                // Adjust for orders starting before queryStart or ending after queryEnd
                if (start < queryStart) {
                    width -= ((queryStart - start) / queryDuration) * 100; // Decrease width
                    offset = 0; // Start at the beginning
                }
                if (end > queryEnd) {
                    width -= ((end - queryEnd) / queryDuration) * 100; // Decrease width if it extends beyond queryEnd
                }
                // Adjust the offset and width to stay within bounds
                offset = Math.max(0, offset); // Ensure offset is not less than 0
                width = offset + width > 100 ? 100 - offset : width; 
                const bookingNumWidth = 44; //uuid的显示长度
                // console.log("offset", offset)
                let adjustedLeft = offset + bookingNumWidth > 100 ? (100 - bookingNumWidth ) : offset;
                // console.log("adjustedLeft", adjustedLeft)
                
                // Adjust width if 
                // 
                // it extends beyond 100%
                // bg-teal-dark
                return (
                <div key={index} className="relative mb-1 group" style={{ height: "20px" }}>
                                            <span className="absolute opacity-0 group-hover:opacity-100 left-0 top-3 translate-x bg-gray-600 text-xs px-0 text-white rounded-sm whitespace-nowrap"
                        style={{ left: `${adjustedLeft}%`, top: "0", transform: "translateY(-100%) " }}
                        >
                            {order.bookingNumber}
                        </span>
                    <div className="absolute left-0 right-0 h-1 bg-teal-dark h-2 rounded-full" style={{ left: `${offset}%`, width: `${width}%` }}>
                        {/* <span className="absolute left-0 -translate-x-1/2 bg-white text-xs px-1 text-gray-800">
                            {order.bookingNumber}
                        </span> */}
                        <span className="absolute left-3 -top-1 -translate-x-12 bg-white text-xs text-gray-800 rounded-sm">
                            {formatLocalDate(order.startDate)}
                        </span>
                        <span className="absolute right-3 -top-1 translate-x-12 bg-white text-xs text-gray-800 rounded-sm">
                            {formatLocalDate(order.endDate)}
                        </span>
                        {/* <span className="absolute opacity-0 group-hover:opacity-100 left-0 top-3 translate-x bg-gray-600 text-xs px-0 text-white rounded-sm whitespace-nowrap"
                        style={{ left: `${adjustedLeft}%`, top: "0", transform: "translateY(-100%) " }}
                        >
                            {order.bookingNumber}
                        </span> */}
                        { order.houseNum !== "" && (
                            <span className="absolute left-0 top-3 translate-x bg-gray-300 text-xs text-red-500 px-0 ">{order.houseNum}</span>
                        )}
                    </div>
                </div>
                );
            })}
        </div>
    </div>
    );
};
