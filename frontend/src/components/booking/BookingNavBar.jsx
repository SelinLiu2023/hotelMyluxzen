import LogoMini from "../navbarMini/LogoMini"; // Logo
import { useNavigate } from "react-router-dom";
import "../../styles/booking.css";

export const BookingNavBar = ()=>{
    const navigate = useNavigate();
    const gotoHomePage = ()=>{
        navigate("/");
    };
    return (
        <header
            className={`w-full p-0 shadow-md custom-bg-navbar-color opacity-90 cursor-pointer`}
            onClick={gotoHomePage}>
            <nav className="max-w-[100%] sm:max-w-[95%] md:max-w-[80%] mx-auto flex justify-between items-center py-2">
                {/* <Logo /> */}
                <LogoMini></LogoMini>
            </nav>
        </header>
    );
};
