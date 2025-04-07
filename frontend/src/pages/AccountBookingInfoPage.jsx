
import { useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import AccountDetails from "../components/User/AccountDetails";
import BookingDetails from "../components/User/BookingDetails";
import NavbarMini from "../components/navbarMini/NavbarMini";

const AccountBookingInfoPage = () => {
    const { user, loading} = useContext(AuthContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const view = queryParams.get("view"); // Holt "view=account" oder "view=buchung"
    if (loading) {
        return <p className="text-center text-gray-600">⏳ Lade Benutzerdaten...</p>;
    }
    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
             <NavbarMini />
            {view === "booking" ? <BookingDetails /> : <AccountDetails />}
        </div>
    );
};

export default AccountBookingInfoPage;