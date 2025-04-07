import { useParams } from "react-router-dom";
import { SuccessBooking } from "../components/booking/SuccessBooking";

export const BookingSummaryPage = ()=>{
    const { bookingNumber } = useParams();
    
    return (<div>
        <SuccessBooking successBookingNumber={bookingNumber}/>
    </div>);
}
